import React, { Fragment, useEffect,useState } from 'react';
import { getProducts, clearErrors } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import "./pagination.css"
import { useParams } from 'react-router-dom';
import Loading from '../layout/Loader/Loading';
import Product from '../Home/Product';
import Pagination from './Pagination';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';



const ProductMenu = () => {
  const dispatch = useDispatch();
  const [currentPage , setCurrentPage] = useState(1)
  const [price , setPrice] = useState([0,25000])
  

  const { products, error, loading,resultperPage,productCount } = useSelector((state) => state.products);
  console.log(productCount)
  console.log(resultperPage)

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
}

const priceHandler = (e,newPrice) =>{
setPrice(newPrice)
}

  useEffect(() => {
    dispatch(getProducts(keyword,currentPage,price));
  }, [dispatch, keyword,currentPage,price]); // Include "keyword" in the dependency array

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

          <div className='filterBox'>
          <Typography>price</Typography>
          <Slider
              getAriaLabel={() => 'Temperature range'}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              min={0}
              max={25000}
            />  
          </div>

          {resultperPage < productCount && (

            <Pagination
             activePage={currentPage}
             itemsCountPerPage={resultperPage}
             totalItemsCount={productCount}
             onChange={setCurrentPageNo}
         />

          )}

       

        </Fragment>
      )}
    </>
  );
};

export default ProductMenu;
