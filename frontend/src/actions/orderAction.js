import { CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,CLEAR_ERRORS, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL } from "../constants/orderConstants";

import axios from "axios";

//Create Order 

export const createOrder = (order) => async(dispatch) => {
    try {

        dispatch({type:CREATE_ORDER_REQUEST})

        const config = {
            header:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.post("/api/v1/order/new",order,config);
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message,
        })
    }
}

//Get User Orders 

export const myOrder = () => async(dispatch) => {
    try {

        dispatch({type:MY_ORDER_REQUEST})

     
        const {data} = await axios.get("/api/v1/orders/me");
        dispatch({type:MY_ORDER_SUCCESS,payload:data.orders})
        
    } catch (error) {
        dispatch({
            type:MY_ORDER_FAIL,
            payload:error.response.data.message,
        })
    }
}


  //clear the all error

  export const clearErrors = async(dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS
    })
}



