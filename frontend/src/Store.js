import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailReducer, productReducer } from "./reducers/productReducer";
import { forgotPasswordRuducer, profileRuducer, userRuducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails : productDetailReducer,
  user:userRuducer,
  profile:profileRuducer,
  forgotPassword:forgotPasswordRuducer,
  cart:cartReducer
});

//here we are getting the items from the localstorage if the product is exixts
let initialState = {
  cart:{
    cartItems : localStorage.getItem("cartItems")?
    JSON.parse(localStorage.getItem("cartItems")):[]
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // Spread the middleware array
);

export default store;
