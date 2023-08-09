import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

// Modify the action creator to use Redux Thunk correctly

export const getProducts = (keyword="",currentPage=1,price=[0 , 25000],catogory,ratings=0) => async (dispatch) => {      //function name should be camel case to implement thunk
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    let link = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratings}`

    if(catogory){
     link = `/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${catogory}&rating[gte]=${ratings}`
    }

    const { data } = await axios.get(link);
  
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};



export const getProductDetails = (id) => async (dispatch) => {      //function name should be camel case to implement thunk
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/getsingleproduct/${id}`);
    console.log(data)

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


  //clear the all error

  export const clearErrors = async(dispatch) =>{
        dispatch({
            type:CLEAR_ERRORS
        })
  }