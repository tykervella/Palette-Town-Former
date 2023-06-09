const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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

const paletteSchema = new Schema ({

    colorOne: {
        type: String,
        trim: true,
    },
    colorTwo: {
        type: String,
        trim: true,
    },
    colorThree: {
        type: String,
        trim: true,
    },
    colorFour: {
        type: String,
        trim: true,
    },
    colorFive: {
        type: String,
        trim: true,
    }
})


const postSchema = new Schema({
    deckOwner: {
        type: String,
        required: true,
        trim: true,
    },
    deckName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    postText: {
        type: String,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    comments: [commentSchema],
    colors: [paletteSchema]
});

// Virtual for comment count
postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
  });

const Post = model('Post', postSchema);

module.exports = Post;