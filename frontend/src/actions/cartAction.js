import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstants";

export const addItemsToCart = (id,quantity) => async(dispatch,getstate) => {
    id="64d47673b02252b801d6d98f"

    const {data} = await axios.get(`/api/v1/orders/${id}`)
    console.log(data)

    //here we are sanding the complete product as a payload in the cartReducer

    dispatch({type:ADD_TO_CART ,
        payload:{ product:data.order._id,
                 name:data.order.name,
                 price:data.order.price,
                 stock:data.order.Stock,
                 quantity
        }})

        //here we are store the cart of the product in the localstorage becaouse if we not save it in localstorage then after reload product will gone

        localStorage.setItem("cartItems",JSON.stringify(getstate().cart.cartItems))
}