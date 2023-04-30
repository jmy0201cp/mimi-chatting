import express from "express";
import bcrypt from "bcrypt";
import * as userRepository from "../repository/user.js";
import * as chatRepository from "../repository/chat.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userRepository.findUserByName(username);
  if (!user) {
    return res.status(403).json({ message: "Invalid username or password." });
  }

  if (user) {
    const isCorrect = bcrypt.compareSync(password, user.password);
    if (!isCorrect) {
      return res.status(403).json({ message: "Invalid username or password." });
    }
  }

  const isExist = await chatRepository.isExistUserInChatRoom(username);
  if (isExist) {
    return res.status(409).json({ message: `이미 접속 중인 유저입니다.` });
  }

  await chatRepository.addUserList(username);
  res.status(201).json({ username });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const isExist = await userRepository.findUserByName(username);

  if (isExist) {
    return res.status(403).json({ message: `이미 사용 중인 닉네임입니다.` });
  }

  const user = await userRepository.signup({
    username,
    password: bcrypt.hashSync(password, 10),
  });
  await chatRepository.addUserList(username);
  res.status(201).json({ username });
});

export default router;
