const Product = require('../Models/productModal')


exports.createproduct = async(req,res,next)=>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })

}


exports.getallproduct=async(req,res)=>{
   const product = await Product.find()
   if(!product){
    res.status(400).json({
        success:false,
        message:"products not found"
    })
   }
   res.status(201).json({
    success:true,
    product
   })
}