import express from "express";
import * as chatController from "../controller/chat.js";

const router = express.Router();

router.get("/", chatController.defaultChatList);

router.get("/room", chatController.room);

export default router;
