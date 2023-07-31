import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from '../actions/productActions'
import ReviewCard from "./ReviewCard.js"
import ReactStar from "react-rating-stars-component"
import Loading from '../layout/Loader/Loading';
import { useAlert } from 'react-alert';

const ProductCard = () => {

  

    const dispatch = useDispatch()
    const { product, loading, error } = useSelector((state) => state.productDetails)
    const alert = useAlert()
    const { id } = useParams();
    const [activeImg, setActiveImage] = useState('');
    const [amount, setAmount] = useState(1);

    const options = {
        value: product.rating,
        readOnly: true,
        precision: 0.5,
      };

    useEffect(() => {
        if(error){
                alert.error(error)
                dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
    }, [dispatch,error,alert, id])

    useEffect(() => {
        if (product.images && product.images.length > 0) {
            setActiveImage(product.images[0].url);
        }
    }, [product])

    const handleImageClick = (url) => {
        setActiveImage(url);
    }

    return (
     <>
            {loading ? <Loading/> : <Fragment>

            <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
            <div className='flex flex-col gap-6 lg:w-2/4'>
                <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl' />
                <div className='flex flex-row justify-between h-24'>
                    {product.images && product.images.map((item, i) => (
                        <img
                            src={item.url}
                            key={item._id}
                            alt={`${i} slide`}
                            className='w-24 h-24 rounded-md cursor-pointer'
                            onClick={() => handleImageClick(item.url)}
                        />
                    ))}
                </div>
            </div>
            {/* ABOUT */}
            <div className='flex flex-col gap-4  lg:w-2/4'>
                <div>
                    <span className=' text-violet-600 text-6xl font-semibold'>{product.name}</span>
                    <h1 className='text-3xl mt-10 font-bold'>{product.category}</h1>
                </div>
                <p className='text-gray-700 mt-5 text-xl'>
                    {product.description}
                </p>
                <h6 className='text-2xl font-semibold'>{`Rs ${product.price}`}</h6>
                <div>
                 <ReactStar {...options}/><span className='text-xl'>{`${product.numberOfReviews} Rieviews`}</span>
                 </div>
                
                <p className='text-2xl'>
                  Status:
                  <b className={product.Stock < 1 ? "text-red-600" : "text-green-500" }>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center '>
                        <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                        <span className='py-4 px-6 rounded-lg'>{amount}</span>
                        <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                    </div>
                    <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full'>Add to Cart</button>
                </div>
            </div>
        </div>
        
        <h3 className='text-black text-4xl font-semibold text-center p-[1vmax] m-auto border-b-2  w-[20vmax] mb-[4vmax]'>REVIEWS</h3>

        {product.reviews && product.reviews[0] ? (
            <div className='flex overflow-auto'>
            {product.reviews && 
                product.reviews.map((rev)=> <ReviewCard rev={rev} />)}

            </div>
        ): (
            <p className='text-4xl text-center font-semibold'>No Reviews Yet</p>
        )}
            </Fragment>}
   
     </>
    )
}

export default ProductCard
