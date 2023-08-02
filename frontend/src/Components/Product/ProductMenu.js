import React, { Fragment, useEffect,useState } from 'react';
import { getProducts, clearErrors } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../layout/Loader/Loading';
import Product from '../Home/Product';
import Pagination from './Pagination';



const ProductMenu = () => {
  const dispatch = useDispatch();
  const [currentPage , setCurrentPage] = useState(1)
  const { products, error, loading,resultPerPage,productCount } = useSelector((state) => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
}

  useEffect(() => {
    dispatch(getProducts(keyword,currentPage));
  }, [dispatch, keyword,currentPage]); // Include "keyword" in the dependency array

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

         <Pagination
             activePage={currentPage}
             itemsCountPerPage={resultPerPage}
             totalItemsCount={productCount}
             onChange={setCurrentPageNo}
         />

        </Fragment>
      )}
    </>
  );
};

export default ProductMenu;