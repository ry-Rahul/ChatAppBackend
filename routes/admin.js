import express from "express";
import {
    adminLogin,
  adminLogout,
  allChats,
  allMessages,
  allusers,
  getAdminData,
  getDashboard,
} from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();
router.post("/verify",adminLoginValidator(),validateHandler,adminLogin);
router.get("/logout",adminLogout);


router.use(adminOnly);

router.get("/", getAdminData);
router.get("/users", allusers);
router.get("/chats", allChats);
router.get("/messages", allMessages); 
router.get("/stats", getDashboard);
// app.post("/verify")

export default router;
