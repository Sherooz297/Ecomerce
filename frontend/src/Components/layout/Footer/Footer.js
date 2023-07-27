import React from 'react'
import palystore from "../../../images/playstore.png"
import appstore from "../../../images/Appstore.png";
import './Footer.css'
const Footer = () => {
  return (
    <>
        <footer id='footer'>

        <div className='left-footer'>
            <h4>Download our Apps</h4>
            <p>Download apps for Andriod or IOS phones</p>
            <img src={palystore} alt="playstore" />
            <img src={appstore} alt="appstore" />

        </div>

        <div className='mid-footer'>
            <h1>Ecommerce</h1>
            <p>Hight Quility is our First preority</p>
            <p>Copyright 2023 &copy; Aimal Sherooz</p>
        </div>

        <div className='right-footer'>
            <h4>Follow Us</h4>
            <a href="">Instagram</a>
            <a href="">Youtube</a>
            <a href="">Facebook</a>
        </div>

        </footer>
    </>
  )
}

export default Footer