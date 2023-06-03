const { AuthenticationError } = require('apollo-server-express');
const { User, Deck } = require('../models');
const { signToken } = require('../utils/auth');

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
    addCard: async (parent, { deckId, cardInput }) => {
      const card = {
        cardId: cardInput.cardId,
        cardName: cardInput.cardName,
        cardImage: cardInput.cardImage,
        cardType: cardInput.cardType,
        quantity: cardInput.quantity,
      };

      const updatedDeck = await Deck.findOneAndUpdate(
        { _id: deckId },
        { $push: { cards: card } },
        { new: true }
      );

      return updatedDeck;
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
