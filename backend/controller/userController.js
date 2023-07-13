const User =  require('../Models/userModal')
const ErrorHandling = require('../utils/ErrorHandler')
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwttoken,');

//user regeistration

exports.registeruser = catchAsyncError(async(req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample",
            url:"url of pic"
        }
    })

  sendToken(user,201,res)
})


//Creating the login route


exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body

    //checking if user enter email and password
    if(!email || !password){
        return next(new ErrorHandling("Please Enter Email and Password",400))
    }

    const user =await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandling("invalid email or password",401))
    }

    const isPasswordMatch = user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandling("Invalid email or password",401))
    }

    sendToken(user,200,res)
})