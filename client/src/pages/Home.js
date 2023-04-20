import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import StockPhoto from '../images/StockPhoto.png';


export default function Home() {
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
    
    ]
      return (
        <div>
          <h1>Stock Forum</h1>
          <div style={{display:"flex", justifyContent:"center"}}> {
            stocks.map(stock => {
                return (
                    <Card key={stocks.id} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={stock.image} />
                    <Card.Body>
                      <Card.Title>{stock.title}</Card.Title>
                      <Card.Text>
                        View and compare new Stocks that match your interest
                      </Card.Text>
                      <Button href = {stock.website}variant="primary">Read More</Button>
                    </Card.Body>
                  </Card>
                )
            })
            } </div>
         
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