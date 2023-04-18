import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../repository/user.js";

const router = express.Router();

const secret = "flkdjseir12453ljdfaojdfnDFEns";
//abc123: $2b$12$AcAcn3skiYOS6CC8jOw7Ke93ufxbdczAW9b3HFY4qlg193WHTO2Za

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
  const token = createJwtToken(user.id);
  res.status(201).json({ username, token });
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

  const token = createJwtToken(user.id);
  res.status(201).json({ username, token });
});

export default router;

function createJwtToken(id) {
  return jwt.sign({ id }, secret, { expiresIn: "2d" });
}
