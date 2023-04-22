const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }
})

const Comment = model('Comment', commentSchema)

module.exports = Comment