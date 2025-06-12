
import {Link} from "react-router-dom"
import React from "react";
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">🎵 Moodify</h2>
      <ul className="login">
      <li><Link to="/login">Login</Link></li>
<li><Link to="/signup">Sign Up</Link></li>

      </ul>
      <ul className="nav-links">
           <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
