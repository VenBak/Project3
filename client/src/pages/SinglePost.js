import React from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../utils/mutations";
import { QUERY_SINGLE_POST } from "../utils/queries";
import CommentForm from "../components/CommentForm";


import Auth from "../utils/auth";

const SinglePost = () => {

  const { postId } = useParams();
  console.log(postId)

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // Pass the `thoughtId` URL parameter into query to retrieve this thought's data
    variables: { postId: postId },
  });

  const post = data?.post || {};

  function hasComments() {
    if (post.comments?.length) {
      return (
        <div>
          {<CommentForm postId={post._id} />}
          {post.comments.map((comment) => (
            <div key={comment._id}>
              <p>{comment.commentText}</p>
              <p>{comment.commentAuthor}</p>
              <p>{comment.createdAt}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>No comments yet!</div>;
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="singlePostPageContainer">
      <div className="stockContainer">
        <div className="stockDetails">
          <h2>Stock Details TBD</h2>
        </div>


      </div>
      <div className="postContainer">
        <div className="postDetails">
          <h2>{post.postTitle}</h2>
          <p>{post.postText}</p>
          <p>{post.postAuthor}</p>
          <p>{post.createdAt}</p>
        </div>
        <div className="commentDetails">
          <h2>Comments</h2>
          <div>
            {hasComments()}
          </div>
        </div>
      </div>
    </div>)
}

export default SinglePost;






