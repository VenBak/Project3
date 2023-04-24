import React from 'react';
import { Link } from 'react-router-dom';

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs (){
  return (
    <ul className="nav justify-content-center Tabs">
      <li className="nav-item">
         <Link className="text-light" to="/home">
         <h1 className="m-0">Home</h1>
       </Link>
      </li>
      <li className="nav-item">
      <Link className="text-light" to="/about">
          <h1 className="m-0">About</h1>
        </Link>
      </li>
      <li className="nav-item">
      <Link className="text-light" to="/profile">
          <h1 className="m-0">Profile</h1>
        </Link>
      </li>
    </ul>
  );
}

        
export default NavTabs;
