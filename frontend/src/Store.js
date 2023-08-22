import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createProductReducer, deleteProductReducer, productDetailReducer, productReducer } from "./reducers/productReducer";
import { forgotPasswordRuducer, profileRuducer, userRuducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { OrderReducer, allOrdersReducer, myOrderReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails : productDetailReducer,
  user:userRuducer,
  profile:profileRuducer,
  forgotPassword:forgotPasswordRuducer,
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrder:myOrderReducer,
  createProduct: createProductReducer,
  deleteProduct:deleteProductReducer,
  allOrders:allOrdersReducer,
  order:OrderReducer,
  orderDetails:orderDetailsReducer

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
