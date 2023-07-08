const Product = require('../Models/productModal')

//Creating the New product ---Admin Only--- 

exports.createproduct = async(req,res,next)=>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })

}
 
//   Getting   all  product  

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

 //   Updating the  product  ---admin  only---
  
 exports.updateproduct = async (req,res)=>{

    let product = await Product.findById(req.params.id);
    if(!product){
        res.status(400).json({
            success:false,
            message:"product not found"
        })
    }
      product=await Product.findByIdAndUpdate(req.params.id,req.body)
      res.status(200).json({
        success:true,
        message:"product updated"
      })
 }

  //   Delete the  product  ---admin  only---

  exports.deleteproduct = async(req,res) =>{

    const product =await Product.findByIdAndDelete(req.params.id)
    if(!product){
        res.status(400).json({
            success:false,
            message:"product not found"
        })
    }
     
      res.status(200).json({
        success:true,
        message:"product deleted"
      })
  }


   //   getting single product  

   exports.getsingleproduct = async(req,res,next) =>{
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(400).json({
            success:false,
            message:"product not found"
        })
    }

    res.status(200).json({
        success:true,
        product
    })

   }