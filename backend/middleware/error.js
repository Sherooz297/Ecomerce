const ErrorHandling = require('../utils/ErrorHandler')

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internel server error";

    //wrong mongoID error -- this will handle error if we use wrong ID for example if we increase the length of ID
    
    if(err.name ==="CastError"){
        const message = `Resourse not found,Invalid: ${err.path}`
        err = new ErrorHandling(message,400)
    }

    //mongoose duplication key error

    if(err.code === 11000){
        const message = `Dupplication ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandling(message,400)
    }


    //wrong JWT token

    if(err.name === "jsonnwebTokenError"){
        const message = `json web token is invalid, try again`
        err = new ErrorHandling(message,400)

    }

    //JWT Expire error

    if(err.name === "TokenExpiredError"){
        const message = `json web token is Ecpired, try again`
        err = new ErrorHandling(message,400)

    }

    res.status(err.statusCode).json({
        success:false,
        message : err.message
    });
};