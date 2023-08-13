import React from 'react'
import "./cart.css"
import CartItems from "./CartItems.js"
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Typography } from '@mui/material';
import {useDispatch,useSelector} from "react-redux"
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction'
import { Link } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch()
    const {cartItems}= useSelector(state => state.cart)

    const increaseQuantity = (id,quantity,stock) => {
        const newQty = quantity+1;
        if(stock <= quantity){
            return
        }
        dispatch(addItemsToCart(id,newQty))
    }

    const decreaseQuantity = (id,quantity) => {
        const newQty = quantity-1;
        if(1 >= quantity){
            return
        }
        dispatch(addItemsToCart(id,newQty))
    }

    const deleteCartItem = (id) => {
        dispatch(removeItemsFromCart(id))
    }
   
  return (
    <>
       {cartItems.length === 0 ? 
        <div className="emptyCart">

            <RemoveShoppingCartIcon/>
            <Typography>No product in your Cart</Typography>
            <Link to="/ProductMenu">View Products</Link>
            
            
        </div>
        : 
       <div className='cartPage'>
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>

            {cartItems && cartItems.map((item)=>(
                <div className="cartContainer" key={item.product}>
                <CartItems item={item} deleteCartItem={deleteCartItem}/>
                <div className="cartInput">
                    <button onClick={()=> decreaseQuantity(item.product,item.quantity)}>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={()=> increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                </div>
                <p className='cartSubtotal'>{`Rs${item.price*item.quantity}`}</p>
            </div>
            ))}

            
            <div className="cartGrossProfit">
                <div> </div>
                <div className="cartGrossProfitBox">
                    <p>Gross Profit</p>
                    <p>{`Rs ${cartItems.reduce((acc,item)=> acc +item.quantity*item.price,0)}`}</p>
                </div>
                <div></div>
                <div className='checkOutBtn'>
                    <button>Check Out</button>
                </div>

            </div>
        </div>
       }
    </>
  )
}

export default Cart