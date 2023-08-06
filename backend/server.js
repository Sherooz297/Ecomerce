const app =require('./app')
const connectDB = require("./config/database")
const dotenv = require('dotenv')
const cloudinary = require("cloudinary")


//handling uncaught expception  -- this will handle the error if we using variale that is not define

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("shuting down the server due to uncaught expception" );
    process.exit(1)
})


//envdot path
dotenv.config({path:"backend/config/config.env"});



connectDB();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})


const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost/${process.env.PORT}`)
})




// unhandled promise rejection  -- this will handle the error if we using the wrong string of mongo

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("shuting down the server due to unHandle promise")
    server.close(()=>{
        process.exit(1);
    })
})



