const User = require("../Models/userModal");
const ErrorHandling = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')

exports.isAuthenticationUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandling("please login to access this resourses",401))
    }

    const decodeData = jwt.verify(token,process.env.JWT_SECRET)

   req.user =  await User.findById(decodeData.id)

   next()

})

exports.autherizedRole = (...role) =>{
    return (req,res,next) => {
        if(!role.includes(req.user.role)){
          return next(new ErrorHandling(`Role: ${req.user.role} is not allow to access the resource`,403))
        }
        next()
    }

    
}