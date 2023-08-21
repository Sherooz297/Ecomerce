import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
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


//get all products for admin

export const getAdminProducts = () => async(dispatch) => {
  try {
    dispatch({
      type:ADMIN_PRODUCT_REQUEST
    })


    const {data} = await axios.get("/api/v1/admin/products")

    dispatch({
      type:ADMIN_PRODUCT_SUCCESS,
      payload:data.products
    })
    
  } catch (error) {

    dispatch({
      type:ADMIN_PRODUCT_FAIL,
      payload:error.response.data.message
    })
    
  }
}


//creatuing the new product

export const createProduct = (productData) => async(dispatch) => {
    try {
      dispatch({type:NEW_PRODUCT_REQUEST})

      const config = {

        Headers:{"Content-type":"application/json"}
      }

      const {data} = await axios.post(`/api/v1/admin/createproduct`,productData,config)

      dispatch({
        type:NEW_PRODUCT_SUCCESS,
        payload:data
      })
      
    } catch (error) {
      dispatch({
        type:NEW_PRODUCT_FAIL,
        payload:error.response.data.message
      })
    }
}

// deleteing the product 

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/deleteproduct/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Updating the prodoct

export const updateProduct = (id,productData) => async(dispatch) => {
  try {
    dispatch({type:UPDATE_PRODUCT_REQUEST})

    const config = {

      headers:{"Content-Type":"application/json"}
    }

    const {data} = await axios.put(`/api/v1/admin/updateproduct/${id}`,productData,config)

    dispatch({
      type:UPDATE_PRODUCT_SUCCESS,
      payload:data.success
    })
    
  } catch (error) {
    dispatch({
      type:UPDATE_PRODUCT_FAIL,
      payload:error.response.data.message
    })
  }
}


//getting the product details
export const getProductDetails = (id) => async (dispatch) => {      //function name should be camel case to implement thunk
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/getsingleproduct/${id}`);
    console.log(data)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
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