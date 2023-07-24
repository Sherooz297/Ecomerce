const Order = require("../Models/orderModel")
const Product = require('../Models/productModal')
const ErrorHandling = require('../utils/ErrorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')



//creating the order

exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body

    const order = await Order.create({
        shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    });

    res.status(201).json({
        success:true,
        order,
    })
})

// get single order


exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{

    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!order){
        return next(new ErrorHandling("order not found with this id",404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

//get login user order


exports.getLoginUserOrder = catchAsyncError(async(req,res,next)=>{

    console.log('User ID:', req.user);

    const orders = await Order.find({user: req.user._id})
   

    if(!orders){
        return next(new ErrorHandling("order not found with this id",404))
    }

    res.status(200).json({
        success:true,
        orders,
    })
})

//get all orders admin only


exports.getallordets= catchAsyncError(async(req,res,next)=>{

    

    const orders = await Order.find()
   
    let totalamount = 0;
    orders.forEach((order)=>{
        totalamount += order.totalPrice;
    })

    if(!orders){
        return next(new ErrorHandling("order not found",404))
    }

    res.status(200).json({
        success:true,
        totalamount,
        orders,
    })
})


//update orders admin only


exports.updateOrder= catchAsyncError(async(req,res,next)=>{

    

    const order = await Order.findById(req.params.id)
  
    if (!order) {
        return next(new ErrorHandling("order not found",404));
    };
   

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandling("tou have already deliverd this order",404))
    }

    order.orderItems.forEach(async(order) =>{
       await updateStock(order.product,order.quantity)
    })

    order.orderStatus = req.body.status;

    if(order.orderStatus === "Delivered"){
        order.deliverdAt = Date.now();
    }

    order.deliverdAt = Date.now();

    await order.save()

    res.status(200).json({
        success:true,
       
    })
})



//delete the order admin only


exports.deleteOrder= catchAsyncError(async(req,res,next)=>{

    

    const order = await Order.findOneAndRemove(req.params.id)
   
        if(!order){
            return next(new ErrorHandling("Order not found",404))
        }

    res.status(200).json({
        success:true,
      message:"order deleted"
    })
})




async function updateStock(id,quantity){
        const product = await Product.findById(id)

        product.Stock -= quantity
        await product.save()
}



