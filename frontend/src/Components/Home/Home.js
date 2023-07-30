import React, { Fragment, useEffect } from "react";
import Product from "./Product.js";
import "./Home.css";
import MetaData from "../layout/MetaData.js";
import { getProducts } from "../actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../layout/Loader/Loading.js";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const { products, productCount, error, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if(error){
      return alert.error(error)
    }
    dispatch(getProducts());
  }, [dispatch,error]);
  return (
    <>
        {loading ? <Loading/> : <Fragment>
        <MetaData title="Ecommerce" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>Find Amazing Product Below</h1>
        <a href="#home">
          <button>Scroll</button>
        </a>
      </div>

      <h2 className="homeheading" id="home">
        Feature Products
      </h2>

      <div className="container">
        {products && products.map((product) => <Product product={product} />)}
      </div>
        </Fragment>}
    </>
  );
};

export default Home;
