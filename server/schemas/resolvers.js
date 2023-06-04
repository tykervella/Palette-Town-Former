const { AuthenticationError } = require('apollo-server-express');
const { User, Deck } = require('../models');
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
  Deck: {
    cardCount: (parent) => parent.cards.length,
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
    addDeck: async (parent, { deckName, deckOwner }) => {
      const deck = await Deck.create({ deckName, deckOwner });

      await User.findOneAndUpdate(
        { username: deckOwner },
        { $addToSet: { decks: deck._id } }
      );

      return deck;
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
    addCardToDeckList: async (_, { deckId, cardId, cardName, cardImage, cardType }) => {
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
        // ... other card fields
      };

      deck.cards.push(newCard);
      deck.cardCount += 1;

      // Save the updated deck to the database or any storage
      await deck.save();

      return deck;
    },

    removeCard: async (parent, { deckId, cardId }) => {
      const updatedDeck = await Deck.findOneAndUpdate(
        { _id: deckId },
        { $pull: { cards: { _id: cardId } } },
        { new: true }
      );

      return updatedDeck;
    },
  },
};

module.exports = resolvers;
