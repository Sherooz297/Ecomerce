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
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData';

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Camera",
  "computers",
  "SmartPhone"
]



const ProductMenu = () => {
  const dispatch = useDispatch();

  const alert = useAlert()

  const [currentPage , setCurrentPage] = useState(1)
  const [price , setPrice] = useState([0,25000])
  const [catogory,setCategory] = useState("")
  const [ratings,setRatings] = useState(0)



  

  const { products, error, loading,resultperPage,productCount } = useSelector((state) => state.products);


  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
}

const priceHandler = (e,newPrice) =>{
setPrice(newPrice)
}

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProducts(keyword,currentPage,price,catogory,ratings));
  }, [dispatch, keyword,currentPage,price,catogory,ratings,alert,error]); // 

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
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
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              min={0}
              max={25000}
            />  
            <Typography>Categories</Typography>
            <ul className='categoryBox'>
              {categories.map((cat)=>(

                <li className='category-link' key={cat} onClick={()=> setCategory(cat)}>
                    {cat}
                </li>


              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Rating Above</Typography>
              <Slider
              value={ratings}
              onChange={(e,newRating)=>{
                setRatings(newRating)
              }}
              valueLabelDisplay="auto"
              min={0}
              max={5}
              >

              </Slider>
            </fieldset>

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
