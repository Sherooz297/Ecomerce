const  mongoose = require("mongoose")

const connectDB = async() =>{
    try {
    mongoose.connect(process.env.DB_URI)
        console.log("connect to db")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB

