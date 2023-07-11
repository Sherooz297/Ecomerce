const Product = require('../Models/productModal')
const ErrorHandling = require('../utils/ErrorHandler')
const ErrorHandler = require('../utils/ErrorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require("../utils/apifeatures")

//Creating the New product ---Admin Only--- 

exports.createproduct = catchAsyncError(async(req,res,next)=>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
});
 
//   Getting   all  product  

exports.getallproduct= catchAsyncError(async(req,res,next)=>{
  const apifeatures = new ApiFeatures(Product.find(),req.query).search()
   const product = await apifeatures.query;
   if(!product){
        return next(new ErrorHandler("Product Not found",404))
   }
   res.status(201).json({
    success:true,
    product
   })
});

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