import React, { Fragment, useEffect } from 'react';
import { getProducts, clearErrors } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../layout/Loader/Loading';
import Product from '../Home/Product';

const ProductMenu = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  const { keyword } = useParams();

  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]); // Include "keyword" in the dependency array

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h3 className='text-gray-700 text-4xl font-semibold text-center p-[1vmax] m-auto mt-[2vmax] border-b-2  w-[20vmax] mb-[4vmax]'>
            PRODUCTS
          </h3>

          <div className='container'>
            {products &&
              products.map((product) => <Product key={product._id} product={product} />)}
          </div>
        </Fragment>
      )}
    </>
  );
};

export default ProductMenu;
