import { useEffect } from "react";
import "./App.css";
import Navbar from "./Components/layout/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import Footer from "./Components/layout/Footer/Footer";
import Home from "./Components/Home/Home";
import ProductCard from "./Components/Product/ProductCard.js";

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
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
