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
    color1: {
        type: String,
        trim: true,
        required: true,
    },
    color2: {
        type: String,
        trim: true,
        required: true,
    },
    color3: {
        type: String,
        trim: true,
        required: true,
    },
    color4: {
        type: String,
        trim: true,
        required: true,
    },
    color5: {
        type: String,
        trim: true,
        required: true,
    }
});

// Virtual for comment count
postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
  });

const Post = model('Post', postSchema);

module.exports = Post;