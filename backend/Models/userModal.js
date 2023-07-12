const mongoose = require('mongoose')
const validator =  require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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




userSchema.pre('save', async function(next){    // This is a event that always run before the user schema will save 
       
    if(!this.isModified("password")){
        next()
    }
    
    this.password = await  bcrypt.hash(this.password,10)
})


//JWT Token : creating the token and save it in cookies than pata lag jay ga k ya useer hy or wo login kar sahkta hy

userSchema.methods.getjwttoken = function() {
    return jwt.sign({ id: this._id},process.env.JWT_SECRET,{
          expiresIn:process.env.JWT_EXPIRE
    })
}
module.exports = mongoose.model("User",userSchema)