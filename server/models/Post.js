const { Schema, Types, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat.js')

const PostSchema = new Schema({
    postText: {
        type: String,
        required: true,
        minlength: 1
    },
    postTitle: {
        type: String,
        required: true,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ]
})

PostSchema.virtual('commentCount').get(function () {
    return this.comments.length
})

const Post = model('Post', PostSchema)

module.exports = Post