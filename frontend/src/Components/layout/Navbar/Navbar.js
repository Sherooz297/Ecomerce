import React, { useState } from "react";
import "./navbar.css";

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
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
              <NavLink to="/about">about</NavLink>
            </li>
            <li>
              <NavLink to="/service">services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">contact</NavLink>
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          <ul className="social-media-desktop">
            <li>

           <SearchIcon style={iconStyle}/>

            </li>
            <li>
             <ProductionQuantityLimitsIcon style={iconStyle}/>
            </li>
            <li>
            <AccountBoxIcon style={iconStyle}/>
            </li>
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