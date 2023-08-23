import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createProductReducer, deleteProductReducer, productDetailReducer, productReducer, productReviewsReducer, reviewReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordRuducer, profileReducer, userDetailsReducer, userRuducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { OrderReducer, allOrdersReducer, myOrderReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails : productDetailReducer,
  user:userRuducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordRuducer,
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrder:myOrderReducer,
  createProduct: createProductReducer,
  deleteProduct:deleteProductReducer,
  allOrders:allOrdersReducer,
  order:OrderReducer,
  orderDetails:orderDetailsReducer,
  allUsers:allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,





});

//here we are getting the items from the localstorage if the product is exixts
let initialState = {
  cart:{
    //getting the cart data from the local storage if it has
    cartItems : localStorage.getItem("cartItems")?
    JSON.parse(localStorage.getItem("cartItems")):[],

//getting the shipping info data from the local storage if it has
    shippingInfo:localStorage.getItem("shippingInfo")?
    JSON.parse(localStorage.getItem("shippingInfo")):{}
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // Spread the middleware array
);

export default store;
