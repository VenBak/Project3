const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/Post');
const Post = require('../models/Post');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    //  // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    // me: async (parent, args, context) => {
    //   if (context.user) {
    //     return User.findOne({ _id: context.user._id });
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, { id, username, email }) => {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { username, email },
        { new: true }
      );
      const token = signToken(user);
      return { token, user };
    },

    deleteUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    createPost: async (parent, { postTitle, postText, postAuthor, context }) => {
      // const user = await User.findOne({ _id: context.user._id });
      // if (!user) {
      //   throw new AuthenticationError('You need to be logged in!');
      // }
      // postAuthor = user.username;

      const post = await Post.create({ postTitle, postText, postAuthor });

      await User.findOneAndUpdate(
        // { _id: context.user._id }, //put back when login is working
        { $push: { posts: post._id } }
      );

      return post;  
    },




  },
};




module.exports = resolvers;
