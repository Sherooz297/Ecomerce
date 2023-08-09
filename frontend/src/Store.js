import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailReducer, productReducer } from "./reducers/productReducer";
import { forgotPasswordRuducer, profileRuducer, userRuducer } from "./reducers/userReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails : productDetailReducer,
  user:userRuducer,
  profile:profileRuducer,
  forgotPassword:forgotPasswordRuducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // Spread the middleware array
);

export default store;
