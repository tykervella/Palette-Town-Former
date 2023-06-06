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
  superType: {
    type: String,
    required: true,
},
  quantity: {
    type: Number,
    default:1,
    required: true,
  },
});

const deckSchema = new Schema({
  deckName: {
    type: String,
    minlength: 1,
    maxlength: 20,
    trim: true,
    unique: true, 
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
  cards: [cardSchema]
});




const Deck = model('Deck', deckSchema);

module.exports = Deck;
