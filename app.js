import express from "express";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js"

import {connectDB }from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createUser } from "./seeders/user.js";
dotenv.config({
  path: "./.env"
});
connectDB(process.env.MONGO_URI); 
const port= process.env.PORT || 3000;

// createUser(10);


const app = express(); 


app.use(cookieParser());
app.use(express.json()); 
app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin",adminRoute);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Server is running on port 3000");
}); 
