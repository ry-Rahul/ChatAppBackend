import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  renameValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/new", newGroupValidator(), validateHandler, newGroupChat);
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
router.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
router.put("/removemember", renameValidator(), validateHandler, removeMember);
router.delete("/leave/:id", leaveGroup);
router.post(
  "/message",
  attachmentsMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);
router.get("/message/:id", chatIdValidator(), validateHandler, getMessages);
router
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

export default router;
