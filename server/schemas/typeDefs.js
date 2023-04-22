const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }
   type Post {
    _id: ID
    postTitle: String
    postText: String
    authorUsername: String
    createdAt: String
    comments: [Comment]
  }
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(id: ID!, username: String!, email: String!): Auth
    deleteUser(userId: ID!): User
    createPost(postText: String!, postTitle: String!, postAuthor: String!): Post

  }
`;

module.exports = typeDefs;
