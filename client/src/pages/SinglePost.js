import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_POST } from "../utils/queries";
import CommentForm from "../components/CommentForm";
import CommentList from '../components/CommentList';
import ChartFactory from "../components/ChartFactory";

const SinglePost = () => {

  const apiKey = `${process.env.REACT_APP_API_KEY}`

  const { postId } = useParams();
  console.log(postId)

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="singlePostPageContainer">
      <div className="stockContainer">
        <div className="stockDetails">
          <h2><b>{post.chartSymbol}</b></h2>
          <p>{post.chartDuration}</p>
        </div>
        <div className="stockChart">
          <canvas id="myChart" width="400" height="400"></canvas>
          <ChartFactory symbol={post.chartSymbol} duration={post.chartDuration} />
        </div>
      </div>
      <div className="postContainer">
        <div className="postDetails">
          <h2><b>{post.postTitle}</b></h2>
          <p>{post.createdAt} by {post.postAuthor}</p>
          <p>{post.postText}</p>
        </div>
        <div className="commentDetails">
          <h2><b>Comments</b></h2>
          <div>
            <CommentForm postId={post._id} />
          </div>
          <div>
            <CommentList comments={post.comments} />
          </div>
        </div>
      </div>
    </div >)
}

export default SinglePost;






