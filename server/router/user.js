import express from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const router = express.Router();

const secret = "flkdjseir12453ljdfaojdfnDFEns";
//abc123: $2b$12$AcAcn3skiYOS6CC8jOw7Ke93ufxbdczAW9b3HFY4qlg193WHTO2Za
let users = [
  {
    id: "123",
    username: "camilla",
    password: "$2b$12$AcAcn3skiYOS6CC8jOw7Ke93ufxbdczAW9b3HFY4qlg193WHTO2Za",
  },
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
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
  const user = {
    id: uuidv4(),
    username,
    password: bcrypt.hashSync(password, 10),
  };

  const token = createJwtToken(user.id);
  res.status(201).json({ username, token });
});

export default router;

function createJwtToken(id) {
  return jwt.sign({ id }, secret, { expiresIn: "2d" });
}
