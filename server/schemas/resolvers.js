const { AuthenticationError } = require('apollo-server-express');
const { User, Deck } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('decks');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    decks: async (parent, { username }) => {
      const params = username ? { username } : {};
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
    addDeck: async (parent, { deckName, deckList, deckOwner }) => {
      const deck = await Deck.create({ deckName, deckList, deckOwner });

      await User.findOneAndUpdate(
        { username: deckOwner },
        { $addToSet: { decks: deck._id } }
      );

      return deck;
    },
    addComment: async (parent, { deckId, commentText, commentAuthor }) => {
      return Deck.findOneAndUpdate(
        { _id: deckId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
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
  },
};

module.exports = resolvers;
