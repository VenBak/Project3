import React from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../utils/mutations";
import { QUERY_SINGLE_POST } from "../utils/queries";
import CommentForm from "../components/CommentForm";
import CommentList from '../components/CommentList';

import { findStockSymbol } from "../utils/stocksymbol";

import Auth from "../utils/auth";

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
          <h2>Stock Details TBD</h2>
          <label htmlFor="company">Enter the name of a company to find its stock symbol:</label> 
          <input
              className="form-input d-block my-2"
              type="text"
              id="companyName"
              name="company"
              required
          />
          <label htmlFor="duration d-block my-2">Select period:</label>
          <br />
          <select id="duration" name="duration" class="form-select w-auto my-2" aria-label="Default select example">
              <option value="1min">1 min</option>
              <option value="1day">1 day</option>
              <option value="1week">1 week</option>
              <option value="1month">1 month</option>
          </select>
          <br />
          <button type="button" class="btn btn-primary" onClick={() => findStockSymbol(apiKey)}>
              Search
          </button>
          <br />
              <div id="results"></div>
              <div id="stockSymbols"></div>
              <canvas id="myChart"></canvas>
          <br/>
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






