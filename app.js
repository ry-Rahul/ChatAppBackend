import express from "express";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js"

import {connectDB }from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from 'http';
import { NEW_MESSAGE } from "./constants/events.js";


dotenv.config({
  path: "./.env"
}); 
connectDB(process.env.MONGO_URI);  
const PORT= process.env.PORT || 3001;
const envMode = process.env.NODE_ENV || "PRODUCTION";
console.log('hel_________________________________________')
console.log(process.env.NODE_ENV==='DEVELOPMENT')

// createUser(10);
const app = express(); 
const server = createServer(app);
const io = new Server(server, {});
export const adminSecretKey = process.env.ADMIN_SECRET_KEY


app.use(cookieParser());
app.use(express.json()); 
app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin",adminRoute);
app.get("/", (req, res) => {
  res.send("Hello World");
});


io.on('connection', (socket) => {
  console.log('a user connected -> ',socket.id);

  socket.on(NEW_MESSAGE, (data) => {
    console.log('new message -> ',data);

  });
  socket.on('disconnect', () => {
    console.log('user disconnected -> ',socket.id);
  } );
})

app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${envMode} mode`);
}); 


export {envMode,PORT}