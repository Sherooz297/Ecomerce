const mongoose = require('mongoose')
const validator =  require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

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


//comapre the password

userSchema.methods.comparePassword = async function(enterdpassword){
        return await bcrypt.compare(enterdpassword,this.password)
}

// generating password reset token 

userSchema.methods.getResentPassToken= function () {
    
    //Genetrate Token... randomBytes generate buffer values toString and hex keyword make 
    //rendom key ("sha356") is a algoritham...
    const resetToken = crypto.randomBytes(20).toString("hex");
    //HASHING AND ADDING RESETpASS tOKEN TO USERSCEMA...

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15*60*1000;     

    return resetToken;
    
};




module.exports = mongoose.model("User",userSchema)