import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../../constants/productConstants";

// Modify the action creator to use Redux Thunk correctly

export const getProducts = () => async (dispatch) => {      //function name should be camel case to implement thunk
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const { data } = await axios.get("http://localhost:4000/api/v1/product");
    console.log(data)

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

    const { data } = await axios.get(`http://localhost:4000/api/v1/getsingleproduct/${id}`);
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