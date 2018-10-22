import React from "react";
import { Link } from "react-router-dom";
import { auth } from '../../firebase';
import SignOutButton from './Logout';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => {

  const signOut = () => {
    auth.doSignOut;
  }
  return(
  <div className="text-center">
    <h1>
      <a href="/#/">Nunua Point of Sale</a>
    </h1>

    <ul className="nav-menu">
      <li className="lead">
        <Link to="/">Inventory</Link>
      </li>
{/*
      <li className="lead">
        <Link to="/pos">POS</Link>
      </li>
*/}
      <li className="lead">
        <Link to="/transactions">Transactions</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
  )
}

export default Header;
