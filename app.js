import express from "express";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";

import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import cors from "cors";
import { v2 as cloudin } from "cloudinary";
import { corsOptions } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";

dotenv.config({
  path: "./.env",
});
connectDB(process.env.MONGO_URI);
cloudin.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 9999;
const envMode = process.env.NODE_ENV || "PRODUCTION";

console.log("hel_________________________________________");

const app = express();
app.use(cookieParser());

const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

// app.set("io", io);

export const adminSecretKey = process.env.ADMIN_SECRET_KEY;
 
const userSocketIDs = new Map();
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);
app.get("/", (req, res) => {
  res.send("Hello World");
});

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});

io.on("connection", (socket) => {

  const user = socket.user;
  userSocketIDs.set(user._id.toString(), socket.id);


  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    // console.log("New message", message, chatId, members);
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        username: user.username,
      },
      chat: chatId,

      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    // console.log("Emititng " ,members)
    for(let i = 0; i  <userSocketIDs.length; i++){
      console.log("User socket id", userSocketIDs[i]);
    }
    const memberSocket = getSockets(members);
    console.log("Member socket______________________________________________", memberSocket);
    io.to(memberSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });

    io.to(memberSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log("Error in sending message", error);
    }
  });
  socket.on("disconnect", () => {
    // console.log("user disconnected -> ", socket.id);
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${envMode} mode`);
});

export { envMode, PORT, userSocketIDs };
