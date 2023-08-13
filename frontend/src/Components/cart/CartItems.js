import React from 'react'
import "./cartitem.css"
import { Link } from 'react-router-dom'


const CartItems = ({item,deleteCartItem}) => {
  return (
    <>
        <div className="CartItemCard">
            <img src={item.image} alt="image" />
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price:Rs${item.price}`}</span>
                <p onClick={()=> deleteCartItem(item.product)}>Remove</p>
            </div>
        </div>
    </>
  )
}

export default CartItems