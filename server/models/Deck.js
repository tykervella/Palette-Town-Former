const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const cardSchema = new Schema({
  cardId: {
      type: String,
      required: true,
      trim: true,
  },
  cardName: {
      type: String,
      required: true,
      trim: true,
  },
  cardImage: {
      type: String,
      required: true,
  },
  cardType: {
      type: String,
      required: true,
  },
  quantity: {
    type: Number,
    default:1,
    required: true,
  },
});

const commentSchema = new Schema ({

  commentText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  commentAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

})

const deckSchema = new Schema({
  deckName: {
    type: String,
    required: 'You need to name your deck!',
    minlength: 1,
    maxlength: 20,
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
  published: {
    type: Boolean,
    default: false, // Set to be a draft unless otherwise specified 
  },
  cards: [cardSchema],
  comments: [commentSchema],
});

// Virtual for card count
deckSchema.virtual('cardCount').get(function () {
  return this.cards.length;
});

// Virtual for comment count
deckSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

const Deck = model('Deck', deckSchema);

module.exports = Deck;
