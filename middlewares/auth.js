import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";


const isAuthenticated = (req, res, next) => {
  try {
    // console.log(req.cookies)
    const token = req.cookies["chattApp"];
    if (!token)
      return next(new ErrorHandler("Please login to access this route", 401));
      // console.log(token)
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedData._id;

    next();
  } catch (error) {
    next(new ErrorHandler("Please login to access this route", 401));
  }
};

const adminOnly = (req, res, next) => {
  const token = req.cookies["chatt-admin-token"];

  if (!token)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  next();
};

export { isAuthenticated, adminOnly };
