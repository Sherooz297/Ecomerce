const mongoose = require('mongoose')
const validator =  require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,"length can not be exceed 30 characters"],
        minLength:[4,"minimum character should b 4"],
         
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"please enter a valid Email"]

    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minLength:[8,"password should have minimum 8 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
           },
           url:{
            type:String,
            required:true
           }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

module.exports = mongoose.model("User",userSchema)