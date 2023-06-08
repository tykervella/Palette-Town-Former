const { AuthenticationError } = require('apollo-server-express');
const { User, Deck, Listing, Post } = require('../models');
const { signToken } = require('../utils/auth');

// Helper function to find a deck by ID
async function findDeckById(deckId) {
  try {
    const deck = await Deck.findById(deckId);
    return deck;
  } catch (error) {
    throw new Error('Error finding deck');
  }
}

const resolvers = {
  Post: {
    commentCount: (parent) => parent.comments.length,
  },

  Query: {
    users: async () => {
      return User.find().populate('decks');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('decks');
    },
    decks: async (parent, { username }) => {
      const params = username ? { deckOwner: username } : {};
      return Deck.find(params).sort({ createdAt: -1 });
    },
    deck: async (parent, { deckId }) => {
      return Deck.findOne({ _id: deckId });
    },
    listings: async (parent, { username }) => {
      const params = username ? { seller: username } : {};
      return Listing.find(params).sort({ createdAt: -1 });
    },
    listing: async (_, { searchQuery, selectedTypes, selectedColors, sortOption }) => {
      let filteredListings = await getFilteredListings(
        _,
        { searchQuery, selectedTypes, selectedColors }
      );

      if (sortOption) {
        return getSortedListings(_, { sortOption });
      }

      return filteredListings;
    },
    allListings: async () => {
      return Listing.find();
    },
    posts: async (parent, { username }) => {
      const params = username ? { deckOwner: username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
    // getFilteredListings: async (_, { searchQuery, selectedTypes, selectedColors }) => {
    //   let filteredListings = await Listing.find();

    //   if (searchQuery) {
    //     const searchRegex = new RegExp(searchQuery, 'i');
    //     filteredListings = filteredListings.filter((listing) =>
    //       listing.cardName.match(searchRegex)
    //     );
    //   }

    //   if (selectedTypes.length > 0) {
    //     filteredListings = filteredListings.filter((listing) =>
    //       selectedTypes.includes(listing.cardType)
    //     );
    //   }

    //   if (selectedColors.length > 0) {
    //     filteredListings = filteredListings.filter((listing) =>
    //       selectedColors.includes(listing.cardColor)
    //     );
    //   }

    //   return filteredListings;
    // },
    // getSortedListings: async (_, { sortOption }) => {
    //   let sortedListings = await Listing.find();

    //   if (sortOption === 'nameAsc') {
    //     sortedListings.sort((a, b) => a.cardName.localeCompare(b.cardName));
    //   } else if (sortOption === 'nameDesc') {
    //     sortedListings.sort((a, b) => b.cardName.localeCompare(a.cardName));
    //   } else if (sortOption === 'priceAsc') {
    //     sortedListings.sort((a, b) => a.price - b.price);
    //   } else if (sortOption === 'priceDesc') {
    //     sortedListings.sort((a, b) => b.price - a.price);
    //   }

    //   return sortedListings;
    // }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addDeck: async (parent, { deckOwner }) => {
      const deck = await Deck.create({ deckOwner });

      await User.findOneAndUpdate(
        { username: deckOwner },
        { $addToSet: { decks: deck._id } }
      );

      return deck;
    },
    addListing: async (parent, { cardId, cardName, cardImage, cardType, superType, price, seller }) => {
      const newListing = await Listing.create({
        cardId: cardId,
        cardName: cardName,
        cardImage: cardImage,
        cardType: cardType,
        superType: superType,
        price: price,
        seller: seller,
        // ... other card fields
      });

      await User.findOneAndUpdate(
        { username: seller },
        { $addToSet: { listings: newListing._id } }
      );

      return newListing;
    },
    addPost: async (parent, { deckOwner, deckName, postText }) => {
      const newPost = await Post.create({
        deckOwner: deckOwner,
        deckName: deckName,
        postText: postText
      });

      await User.findOneAndUpdate(
        { username: deckOwner },
        { $addToSet: { posts: newPost._id } }
      );

      return newPost;
    },
    addComment: async (parent, { deckId, commentInput }) => {
      const comment = {
        commentText: commentInput.commentText,
        commentAuthor: commentInput.commentAuthor,
      };

      const updatedDeck = await Deck.findOneAndUpdate(
        { _id: deckId },
        { $push: { comments: comment } },
        { new: true }
      );

      return updatedDeck;
    },
    removeDeck: async (parent, { deckId }) => {
      return Deck.findOneAndDelete({ _id: deckId });
    },
    removeComment: async (parent, { deckId, commentId }) => {
      return Deck.findOneAndUpdate(
        { _id: deckId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
    addCardToDeckList: async (_, { deckId, cardId, cardName, cardImage, cardType, superType }) => {
      // Find the deck by deckId and add the card
      const deck = await findDeckById(deckId);
      if (!deck) {
        throw new Error('Deck not found');
      }

      const newCard = {
        cardId: cardId,
        cardName: cardName,
        cardImage: cardImage,
        cardType: cardType,
        superType: superType,
        // ... other card fields
      };

      deck.cards.push(newCard);

      // Save the updated deck to the database or any storage
      await deck.save();

      return deck;
    },

    removeCard: async (parent, { deckId, cardId }) => {
      const updatedDeck = await Deck.findOneAndUpdate(
        { _id: deckId },
        { $pull: { cards: {cardId: cardId } } },
        { new: true }
      );

      return updatedDeck;
    },
    updateCardQuantity: async (parent, { deckId, cardId, quantity }) => {
      const deck = await findDeckById(deckId);
      if (!deck) {
        throw new Error('Deck not found');
      }

      const card = deck.cards.find((card) => card.cardId.toString() === cardId);
      if (!card) {
        throw new Error('Card not found in the deck');
      }

      card.quantity = quantity;
      await deck.save();

      return deck;
    },
  },
};

module.exports = resolvers;
