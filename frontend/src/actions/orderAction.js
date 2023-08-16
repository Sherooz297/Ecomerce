import { CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,CLEAR_ERRORS } from "../constants/orderConstants";

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
        
    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
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