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

function App() {
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid sans"],
      },
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
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
