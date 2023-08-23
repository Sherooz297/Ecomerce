import React, { useState } from "react";
import "./navbar.css";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";





const Navbar = () => {

  const iconStyle = {
    fontSize: 25,
    cursor: 'pointer', // This adds the pointer cursor to the component
  };
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <span>E</span>commerce
            
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/ProductMenu">Products</NavLink>
            </li>
            <li>
              <NavLink to="/Contect">Contect</NavLink>
            </li>
            <li>
              <NavLink to="/About">About</NavLink>
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
            <NavLink to="/Search">
           <SearchIcon style={iconStyle}/>
           </NavLink>
            </li>
            <NavLink to="/cart">
            <li>
             <ShoppingCartIcon style={iconStyle}/>
            </li>
            </NavLink>
            <NavLink to="/login">
            <li>
            <AccountBoxIcon  style={iconStyle}/>
            </li>
            </NavLink>
          </ul>

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a  onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
    </>
  );
};

export default Navbar;