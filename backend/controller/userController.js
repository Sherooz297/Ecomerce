const User =  require('../Models/userModal')
const ErrorHandling = require('../utils/ErrorHandler')
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwttoken,');
const sendEmail = require('../utils/sendEmail.js')

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


//creating the logout route

exports.logout = catchAsyncError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:" user logout"
    })
})


exports.forgetPassword = catchAsyncError(async(req,res,next)=>{
        const user = await User.findOne({email:req.body.email});

        if(!user){
            return next(new ErrorHandling("User not Found",404))
        }

        //get reset password token

        const resetToken = user.getRestPasswordToken()

        await user.save({validateBeforeSave:false});

        const resetPassswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/rest/${resetToken}`

        const message = `your password reset token is :- \n\n ${resetPassswordUrl} \n\n if you have not requested to it please ignore it`

        try {

            await sendEmail({

                email:user.email,
                subject:`ecommerce password recovery`,
                message,

            });
            res.status(200).json({
                success:true,
                message:`Email send to ${user.email} successfully`
            })
            
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({validateBeforeSave:false})
            return next(new ErrorHandling(error.message,500));

        }
})


// reste password 


exports.resetPassword = catchAsyncError(async(req,res,next)=>{
    //creating token hash

    const restPaswordToken =crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        restPaswordToken,
        resetPasswordExpire:{
            $gt:Date.now()
        }
    });
    if(!user){
        return next(new ErrorHandling("reset password token is invalid has been expire",400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandling("password does not match",400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save()

    sendToken(user,200,res)
})