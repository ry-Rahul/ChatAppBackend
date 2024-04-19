import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions ={
    maxAge: 15*24*60*60*1000,
    sameSite: false,
    httpOnly: true,
    secure: true
}

const connectDB =  (uri) => {
    
    mongoose.connect(uri,{dbName:"ChatApp"})
    .then((data)=>{
        console.log(`Connected to the database ${data.connection.host}`);
    })
    .catch((err)=>{
        console.log("Error connecting to the database",err);
        throw err;
    })
};


const sendTokens=(res,user,code,message)=>
{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

    return res.status(code).cookie("chattApp",token,cookieOptions).json({
        success: true,
        message
    })

}

const emitEvent =(req,event,users,data)=>{
    console.log("Emitting event",event);
}

const deletFilesFromCloudinary = async (public_ids) => {

}
export {connectDB,sendTokens,cookieOptions,emitEvent,deletFilesFromCloudinary};
