import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/layout/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import Footer from "./Components/layout/Footer/Footer";
import Home from "./Components/Home/Home";
import ProductCard from "./Components/Product/ProductCard.js";
import ProductMenu from "./Components/Product/ProductMenu.js"
import Search from "./Components/Product/Search.js"
import LoginSignup from "./Components/User/LoginSignup";
import UserOptions from "./Components/layout/Navbar/UserOptions";
import Profile from "./Components/User/Profile.js"
import store from "./Store"
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import UpdateProfile from "./Components/User/UpdateProfile"
import UpdatePassword from "./Components/User/UpdatePassword"
import ForgotPassword from "./Components/User/ForgotPassword"
import ResetPassword from "./Components/User/ResetPassword.js"
import Cart from "./Components/cart/Cart.js"
import Shipping from "./Components/cart/Shipping.js"
import ConfirmOrder from "./Components/cart/ConfirmOrder.js"
import Payment from "./Components/cart/Payment.js"
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./Components/cart/OrderSuccess.js"
import MyOrders from "./Components/order/MyOrders.js"
import Dashboard from "./Components/Admin/Dashboard.js"
import ProductList from "./Components/Admin/ProductList.js"
import NewProduct from "./Components/Admin/NewProduct";
import UpdateProduct from "./Components/Admin/UpdateProduct.js"
import OrderList from "./Components/Admin/OrderList.js"
import UpdateOrder from "./Components/Admin/UpdateOrder.js"
import UserList from "./Components/Admin/UserList.js"
import UpdateUser from "./Components/Admin/UpdateUser.js"
import ProductReviews from "./Components/Admin/ProductReviews.js"

import Contact from "./Components/layout/Contect/Contect.js"
import About from "./Components/layout/About/About.js"
import NotFound from "./Components/layout/Not Found/NotFound.js"


function App() {

const {isAuthenticated,user} = useSelector(state => state.user)

const [stripeApiKey,setStripeApiKey] = useState("")

async function getStripeApiKey(){
  const {data} = await axios.get("/api/v1/stripeapikey")
  setStripeApiKey(data.stripeApiKey)
}

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid sans"],
      },
    });

    store.dispatch(loadUser())

    getStripeApiKey();

  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />

        {isAuthenticated && <UserOptions user={user} /> }
       
        <Routes>

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/account" element={<Profile />} />
                <Route path="/me/update" element={<UpdateProfile/>}/>
                <Route path="/password/update" element={<UpdatePassword/>}/> 
                <Route path="/login/shipping" element={<Shipping/>}/>
                <Route path="/order/confirm" element={<ConfirmOrder/>}/>

                <Route
                  path="/process/payment"
                  element={
                    stripeApiKey && (
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                      </Elements>
                    )
                  }
                />

                <Route path="/success" element={<OrderSuccess/>}/>
                <Route path="/orders" element={<MyOrders/>}/>


                <Route isAdmin={true} path="/admin/dashboard" element={<Dashboard/>}/>
                <Route isAdmin={true} path="/admin/products" element={<ProductList/>}/>
                <Route isAdmin={true} path="/admin/product" element={<NewProduct/>}/>
                <Route isAdmin={true} path="/admin/product/:id" element={<UpdateProduct/>}/>

                <Route isAdmin={true} path="/admin/orders" element={<OrderList/>}/>
                <Route isAdmin={true} path="/admin/order/:id" element={<UpdateOrder/>}/>
                <Route isAdmin={true} path="/admin/users" element={<UserList/>}/>
                <Route isAdmin={true} path="/admin/user/:id" element={<UpdateUser/>}/>
                <Route isAdmin={true} path="/admin/reviews" element={<ProductReviews/>}/>

              </Route>

          <Route path="/password/forgot" element={<ForgotPassword/>}/>
          <Route path="/password/reset/:token" element={<ResetPassword/>}/>

          <Route path="/cart" element={<Cart/>}/>



          <Route path="/" element={<Home />}></Route>
          <Route path="/getsingleproduct/:id" element={<ProductCard/>}></Route>
          <Route path="/ProductMenu" element={<ProductMenu/>}></Route>
          <Route path="/ProductMenu/:keyword" element={<ProductMenu/>}></Route>
          <Route path="/Search" element={<Search/>}></Route>
          <Route path="/Contect" element={<Contact/>}></Route>
          <Route path="/About" element={<About/>}></Route>
          <Route path="/login" element={<LoginSignup/>}></Route>

        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
