const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        minlength: 1
    },
    commentAuthor: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
})


const Comment = model('Comment', commentSchema)

module.exports = Comment