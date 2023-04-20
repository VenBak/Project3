const { Schema, Types, model } = require('mongoose');


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    watchlist: [
        {
            type: Array,
            ref: 'Stocks'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Posts'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ]
});

const User = model('User', UserSchema);

module.exports = User;