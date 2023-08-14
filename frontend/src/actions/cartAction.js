import axios from "axios";
import { ADD_TO_CART, REMOVE_TO_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const addItemsToCart = (id,quantity) => async(dispatch,getstate) => {
    
    const {data} = await axios.get(`/api/v1/getsingleproduct/${id}`)
    console.log(data)

    //here we are sanding the complete product as a payload in the cartReducer

    dispatch({type:ADD_TO_CART ,
        payload:{
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        }})

        //here we are store the cart of the product in the localstorage becaouse if we not save it in localstorage then after reload product will gone

        localStorage.setItem("cartItems",JSON.stringify(getstate().cart.cartItems))
}

//remove item  from the cart

export const removeItemsFromCart = (id) => async(dispatch,getstate) => {

    dispatch({
        type:REMOVE_TO_CART,
        payload:id
    })

    localStorage.setItem("cartItems",JSON.stringify(getstate().cart.cartItems))

}


//SAVVE the Shiping Info 

export const saveShippingInfo = (data) => async(dispatch) => {
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,
    });

    localStorage.setItem("shippingInfo",JSON.stringify(data))
}