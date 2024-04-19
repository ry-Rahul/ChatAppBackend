import express from "express";
import {
    adminLogin,
  allChats,
  allMessages,
  allusers,
  getDashboard,
} from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admin route");
});
router.post("/verify",adminLoginValidator(),validateHandler,adminLogin);
router.get("/logout");
router.get("/users", allusers);
router.get("/chats", allChats);
router.get("/messages", allMessages);
router.get("/stats", getDashboard);
// app.post("/verify")

export default router;
