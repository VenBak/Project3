import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import StockPhoto from '../images/StockPhoto.png';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import CreateComment from './createComment';
import { Link } from 'react-router-dom';
export default function Home() {

  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  const stocks = [
    {
      id: 1, title: "Post One",
      image: StockPhoto,
      website: ""
    },
    {
      id: 2, title: "Post two",
      image: StockPhoto,
      website: ""
    },
    {
      id: 3, title: "Post three",
      image: StockPhoto,
      website: ""
    },
    {
      id: 4, title: "Post four",
      image: StockPhoto,
      website: "",
    },

    // function openSinglePostHandler(postId) {
    //   return () => {
    //     window.location.assign(`/posts/${postId}`);
    //   };
    // }


  ]
  return (
    <div>
      <h1>Stock Forum</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}> {
          posts.map(post => {
            return (
              <Card key={post.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={stocks[1].image} />
                <Card.Body>
                  <Card.Title>{post.postTitle}</Card.Title>
                  <Card.Text>
                    {post.postText}
                    {post.postAuthor}
                  </Card.Text>
                  <Link
                    className="btn btn-primary btn-block btn-squared"
                    to={`/post/${post._id}`}
                  >
                    Join the discussion on this post.
                  </Link>

                </Card.Body>
              </Card>
            )
          })
        } </div>
      )}
    </div>
  );
}

//     import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// function BasicExample() {
//   return (
//     <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src="holder.js/100px180" />
//       <Card.Body>
//         <Card.Title>Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default BasicExample;