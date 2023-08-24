import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./productCard.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productActions'
import ReviewCard from "./ReviewCard.js"
import Loading from '../layout/Loader/Loading';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import { Dialog,DialogActions,DialogContent,DialogTitle,Button,Rating } from '@mui/material'
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductCard = () => {

  

    const dispatch = useDispatch()
    const { product, loading, error } = useSelector((state) => state.productDetails)
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
      );
    const alert = useAlert()
    const { id } = useParams();
    const [activeImg, setActiveImage] = useState('');
    const [amount, setAmount] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const options = {
        value: product.rating,
        readOnly: true,
        precision: 0.5,
      };

    const addToCartHandler = () =>{
        dispatch(addItemsToCart(id,amount))
        alert.success("item Added to Cart")
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };

      const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };

    useEffect(() => {
        if(error){
                alert.error(error)
                dispatch(clearErrors())
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
          }
      
          if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
          }
        dispatch(getProductDetails(id))
    }, [dispatch,error,alert, id,success,reviewError])

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

            <MetaData title={`${product.name} -- ECOMMERCE`} />

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
                 <Rating {...options}/><span className='text-xl'>{`${product.numberOfReviews} Rieviews`}</span>
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
                    <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full' onClick={addToCartHandler}>Add to Cart</button>
                </div>

                <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full' onClick={submitReviewToggle}>Write a Review</button>

            </div>
        </div>
        
        <h3 className='text-gray-700 text-4xl font-semibold text-center p-[1vmax] m-auto border-b-2  w-[20vmax] mb-[4vmax]'>REVIEWS</h3>

        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

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
