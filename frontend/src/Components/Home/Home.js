import React from 'react'
import {CgMouse} from 'react-icons/cg'
import Product from './Product.js'
import './Home.css'

const product = {
  name:"blue T-shirts",
  images:[{url:"https://f450c.org/wp-content/uploads/2019/04/7-Benefits-of-T-Shirt-Design-Software-For-e-commerce-business.jpg"}],
  price:"1200Rs",
  _id:"aimal"

}

const Home = () => {
  return (
    <>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>Find Amazing Product Below</h1>
            <a href="#home">
                <button>Scroll</button>
            </a>
        </div>

        <h2 className="homeheading" id='home'>Feature Products</h2>

        <div className="container">
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
        </div>
    </>
  )
}

export default Home