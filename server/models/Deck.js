const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const deckSchema = new Schema({
  deckName: {
    type: String,
    required: 'You need to name your deck!',
    minlength: 1,
    maxlength: 20,
    trim: true,
  },
  deckList: {
    type: String,
    required: 'You must include cards in this deck!',
    trim: true,
  },
  deckOwner: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Deck = model('Deck', deckSchema);

module.exports = Deck;
