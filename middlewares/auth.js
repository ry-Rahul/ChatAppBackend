import jwt from "jsonwebtoken";
import { adminSecretKey } from "../app.js";
import { ErrorHandler } from "../utils/utility.js";

const isAuthenticated = async (req, res, next) => {

    try {
        const token = req.cookies["chattApp"];
        if(!token) return next(new ErrorHandler("Please login to access this route",401));
        // console.log(req.cookies["chatApp"]);
        const decodedDate = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedDate);
        req.user = decodedDate._id
        next();
    } catch (error) {
        
        next(error);
    }
} 

const adminOnly = (req, res, next) => {
    const token = req.cookies["chatapp-admin-token"];
  
    if (!token)
      return next(new ErrorHandler("Only Admin can access this route", 401));
  
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);
  
    const isMatched = secretKey === adminSecretKey;
  
    if (!isMatched)
      return next(new ErrorHandler("Only Admin can access this route", 401));
  
    next();
  };
  

export { isAuthenticated , adminOnly};