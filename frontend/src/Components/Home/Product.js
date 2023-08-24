import React from 'react'
import {Link} from "react-router-dom"

import { Rating } from '@mui/material';


const Product = ({product}) => {
    const options = {
        value: product.rating,
        readOnly: true,
        precision: 0.5,
      };
  return (
    <Link className='productCard'  id='productCard' to={`/getsingleproduct/${product._id}`}>
    <img src={product.images[0].url} alt="product" />
    <p>{product.name}</p>
    <div>
    <Rating {...options}/><span>{`${product.numberOfReviews} Rieviews`}</span>
    </div>
    <span>{`₨ ${product.price}`}</span>
    

    </Link>
  )
}

export default Product