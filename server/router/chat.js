import express from "express";
import * as chatRepository from "../repository/chat.js";

const router = express.Router();

router.get("/room", async (req, res) => {
  const list = await chatRepository.getAllList();
  res.status(201).json(list);
});

export default router;
