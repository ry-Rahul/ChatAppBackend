import jwt from "jsonwebtoken";

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

export { isAuthenticated };