const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
    cardId: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    cardName: {
        type: String,
        required: true,
        unique: true,
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
    deck: {
        type: Schema.Types.ObjectId,
        ref: 'Deck',
        required: true,
    },
});

const Card = model('Card', cardSchema);

module.exports = Card;