const User =  require('../Models/userModal')
const ErrorHandling = require('../utils/ErrorHandler')
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwttoken,');
const sendEmail = require('../utils/sendEmail.js')
const crypto = require("crypto")
const cloudinary = require('cloudinary')

//user regeistration

exports.registeruser = catchAsyncError(async(req,res,next)=>{

    const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
        quality: 80,
    })

    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url
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

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandling("Invalid email or password",401))
    }

    sendToken(user,200,res)
})


//creating the logout route

exports.logout = catchAsyncError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
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

        const resetToken = user.getResentPassToken()

        await user.save({validateBeforeSave:false});

        const resetPassswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

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

    const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{
            $gt:Date.now()
        }
    });
    if(!user){
        return next(new ErrorHandling("reset password token is invalid ",400))
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




//  <<--------------Creating User Routes------------------------>>



// get user detail 

exports.getUserDetail = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    })   
})

//update user password

exports.updatePassword = catchAsyncError(async(req,res,next)=>{
    let user = await User.findById(req.user.id).select("+password")

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword)
    if(!isPasswordMatch){
        return next(new ErrorHandling("old password is incorrect",400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandling("password does not matched",400))
    }

    user.password = req.body.newPassword;
    await user.save()

    res.status(200).json({
        success : true,
        message:"password change successfully"
    })

})

//update user profile

exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }

   if(req.body.avatar !== ""){
    const user = await User.findById(req.user.id)
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    })

        newUserData.avatar={
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        }

   }


    const user = await User.findByIdAndUpdate(req.user.id,newUserData)

    res.status(200).json({
        success:true
    })
})



//get all user  (admin only)

exports.getAllUser = catchAsyncError(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    })
})


//get single user  (admin only)

exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandling("User does not exixt with this is",400))
    }
    res.status(200).json({
        success:true,
        user
    })
})

// change the user role  --admin

exports.updateRole = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id,newUserData)

    res.status(200).json({
        success:true
    })
})


//delete any user ---admin---


exports.deleteUser = catchAsyncError(async(req,res,next)=>{

    const user = await User.findByIdAndRemove(req.params.id)

    if(!user){
        return next(new ErrorHandling("User does not exixt with this is",400))
    }

 

    res.status(200).json({
        success:true,
        message:"user have been deleted"
    })

})



