import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Home() {

  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  const post_in_a_page = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / post_in_a_page);

  function getCurrentPageItems() {
    const startIndex = (currentPage - 1) * post_in_a_page;
    const endIndex = startIndex + post_in_a_page;
    return posts.slice(startIndex, endIndex);
  }

  function handleNextPage() {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  function handlePrevPage() {
    setCurrentPage((currentPage) => currentPage - 1);
  }

  function handlePageClick(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className='home'>
      <h1 style={{ textAlign: "center" }}>Stock Forum</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (getCurrentPageItems().map((post) => (
            <Card key={post.id}>
              <Card.Body>
            <Card.Title>{post.postTitle} <span style={{ fontSize: 11 }}>By {post.postAuthor} On { post.createdAt}</span></Card.Title>
                <Card.Text>{post.postText}</Card.Text>
                {/* <Card.Text>{ post.createdAt} by {post.postAuthor}</Card.Text> */}
                <Link
                  className="btn btn-primary btn-block"
                  to={Auth.loggedIn() ? (`/post/${post._id}`) : (`/login`)}
                >
                  Join the discussion on this post.
                </Link>
              </Card.Body>
            </Card>
          )))}
      <div className='pages'>
        <button class="btn"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button class="btn"
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </button>
        ))}
        <button class="btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
