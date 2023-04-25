import React from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../utils/mutations";
import { QUERY_SINGLE_POST } from "../utils/queries";


import Auth from "../utils/auth";

const SinglePost = () => {

  const { postId } = useParams();
  console.log(postId)

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // Pass the `thoughtId` URL parameter into query to retrieve this thought's data
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (true)
}

export default SinglePost;






