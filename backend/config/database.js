const  mongoose = require("mongoose")

const connectDB = async() =>{
    
    mongoose.connect(process.env.DB_URI)
        console.log("connect to db")
   
}

module.exports = connectDB

