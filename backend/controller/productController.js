const Product = require('../Models/productModal')
const ErrorHandling = require('../utils/ErrorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require("../utils/apifeatures")
const cloudinary = require("cloudinary")

//Creating the New product ---Admin Only--- 

exports.createproduct = catchAsyncError(async(req,res,next)=>{

  let images=[];

  //agar image 1 he hy to wo string hoge os ko images array ma push kar dyna hy
  if( typeof req.body.images === "string"){
      images.push(req.body.images)

      //agar zayada hoge to wo khud array hoge to osy images ka baradabar rahk adyna hay
  }else{
      images= req.body.images 
  }

  const imagesLinks = [];

  for(let i = 0; i<images.length; i++){
    const result = await cloudinary.v2.uploader.upload(images[i],{
      folder:"products"
    })

    imagesLinks.push({
      public_id:result.public_id,
      url:result.secure_url
    })
  }
  
  req.body.images = imagesLinks;

  req.body.user = req.user.id;
  
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
});
 
//   Getting   all  product  

exports.getallproduct= catchAsyncError(async(req,res,next)=>{

  const resultperPage = 8;
  const productCount = await Product.countDocuments()

  const apifeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultperPage)
   const product = await apifeatures.query;
   if(!product){
        return next(new ErrorHandling("Product Not found",404))
   }
   res.status(201).json({
    success:true,
    product,
    productCount,
    resultperPage
   })
});

//getting all products (admin)

exports.getAdminProducts = catchAsyncError(async(req,res,next)=>{
  const products = await Product.find()

  res.status(200).json({
    success:true,
    products
  })

})

 //   Updating the  product  ---admin  only---
  
 exports.updateproduct = catchAsyncError(async (req,res,next)=>{

    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandling("Product Not found",404))
   }
      product=await Product.findByIdAndUpdate(req.params.id,req.body)
      res.status(200).json({
        success:true,
        message:"product updated"
      })
 });

  //   Delete the  product  ---admin  only---

  exports.deleteproduct =catchAsyncError(async(req,res,next) =>{

    const product =await Product.findByIdAndDelete(req.params.id)
    if(!product){
        return next(new ErrorHandling("Product Not found",404))
   }
     
      res.status(200).json({
        success:true,
        message:"product deleted"
      })
  })


   //   getting single product  

   exports.getsingleproduct = catchAsyncError(async(req,res,next) =>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandling("Product Not found",404))
   }

    res.status(200).json({
        success:true,
        product
    })

   })

   // create new review or update the rieview


   exports.crateProductReview = catchAsyncError(async(req,res,next)=>{

    const {rating,comment,productId} = req.body;

    const review = {
      user:req.user._id,
      name:req.user.name,
      rating : Number(rating),
      comment,

    }

    const product = await Product.findById(productId)

    if (!product) {
      return next(new ErrorHandling("Product not found",404))
    }

    const isReviewd=product.reviews.find(rev=> rev.user.toString()===req.user._id.toString());
    if (isReviewd) {
        product.reviews.forEach(rev=>{
            if(rev.user.toString()===req.user._id.toString())
            rev.rating=rating,
            rev.comment=comment
        });
    }
    else{

      product.reviews.push(review)
      product.numberOfReviews = product.reviews.length

    }

    let avg = 0;
    product.rating = product.reviews.forEach((rev)=>{
      avg += rev.rating
    })

    product.rating= avg/product.reviews.length;

    await product.save()

    res.status(200).json({
      success:true
    })
   })


   //get all products

   exports.getAllReveiws = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
      return next(new ErrorHandling("product not found",404))
    }

    res.status(200).json({
      success:true,
      reviews:product.reviews
    })
   })

   //Delete Reviews

   exports.deleteReview = catchAsyncError(async(req,res,next)=>{

     const product = await Product.findById(req.query.productId);
     
    if (!product) {
      return next(new ErrorHandling("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  // Agr hm ratting 0 ni krty to 0/0 NAN ay ga
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numberOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numberOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });

   })