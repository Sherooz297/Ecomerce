import React from 'react'
import {Link} from "react-router-dom"
import ReactStar from "react-rating-stars-component"


const Product = ({product}) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };
  return (
    <Link className='productCard'  id='productCard' to={product._id}>
    <img src={product.images[0].url} alt="product" />
    <p>{product.name}</p>
    <div>
    <ReactStar {...options}/><span>(256 Rieviews)</span>
    </div>
    <span>{product.price}</span>
    

    </Link>
  )
}

export default Product