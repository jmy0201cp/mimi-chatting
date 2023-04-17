import express from "express";
import jwt from "jsontokens";
import bcrypt from "bcrypt";

const router = express.Router();

let users = [
  {
    id: "123",
    username: "camilla",
    password: "aaa123",
  },
];

router.post("/login", (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "success login" });
});

router.post("/signup", (req, res) => {
  res.status(201).send("success signup");
});

export default router;
