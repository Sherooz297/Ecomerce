import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productReducer = (state = { products:[] },action) => {
    switch (action.type) {
      case ALL_PRODUCT_REQUEST:
      case ADMIN_PRODUCT_REQUEST:
        return {
          loading: true,
          products: [],
        };
      case ALL_PRODUCT_SUCCESS:
        return {
          loading: false,
          products: action.payload.product,
          productCount: action.payload.productCount,
          resultperPage: action.payload.resultperPage
        };
      case ADMIN_PRODUCT_SUCCESS:
        return {
          loading:false,
          products:action.payload
        }
      case ALL_PRODUCT_FAIL:
      case ADMIN_PRODUCT_FAIL:
        return {
          loading: true,
          error: action.payload,
        };

        case CLEAR_ERRORS:
            return {
              ...state,
              error:null,
            };

      default:
        return state;
    }
  };


  export const productDetailReducer = (state = { product:{} },action) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload
         
        };
      case PRODUCT_DETAILS_FAIL:
        return {
          loading: true,
          error: action.payload,
        };

        case CLEAR_ERRORS:
            return {
              ...state,
              error:null,
            };

      default:
        return state;
    }
  };
