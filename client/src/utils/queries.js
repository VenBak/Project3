import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      email
      password
      username
    }
  }
`;

export const QUERY_POST = gql`
  query Post($postTitle: String!) {
  post(postTitle: $postTitle) {
    _id
    postTitle
    postText
    authorUsername
    createdAt
      comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  } 
  }
  `;


// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       name
//     }
//   }
// `;



