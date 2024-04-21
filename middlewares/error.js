import { envMode } from "../app.js";

const errorMiddleware = (err, req, res, next) => {
 
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.code = 11000){
        const error = Object.keys(err.keyPattern).join("")
        err.message = `Duplicate ${error} entered`
        err.statusCode = 400;
    }

    if(err.name=="CastError"){
        const errorpath = err.path;
        err.message = `Invalid ${errorpath} entered`;
        err.statusCode = 400;
    }

    return res.status(err.statusCode).json({
        success: false,
        message: envMode?err:err.message
    });

}

export { errorMiddleware}