import { useEffect } from "react";
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


function App() {

const {isAuthenticated,user} = useSelector(state => state.user)

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid sans"],
      },
    });

    store.dispatch(loadUser())

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
              </Route>

          <Route path="/password/forgot" element={<ForgotPassword/>}/>
          <Route path="/password/reset/:token" element={<ResetPassword/>}/>

          <Route path="/cart" element={<Cart/>}/>



          <Route path="/" element={<Home />}></Route>
          <Route path="/getsingleproduct/:id" element={<ProductCard/>}></Route>
          <Route path="/ProductMenu" element={<ProductMenu/>}></Route>
          <Route path="/ProductMenu/:keyword" element={<ProductMenu/>}></Route>
          <Route path="/Search" element={<Search/>}></Route>


 
          <Route path="/login" element={<LoginSignup/>}></Route>

        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
