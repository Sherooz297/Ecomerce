const ErrorHandling = require('../utils/ErrorHandler')

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internel server error";

    //wrong mongoID error -- this will handle error if we use wrong ID for example if we increase the length of ID
    
    if(err.name ==="CastError"){
        const message = `Resourse not found,Invalid: ${err.path}`
        err = new ErrorHandling(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message : err.message
    });
};