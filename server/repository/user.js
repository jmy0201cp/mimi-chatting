import express from "express";
import { v4 as uuidv4 } from "uuid";

const secret = "flkdjseir12453ljdfaojdfnDFEns";
//abc123: $2b$12$AcAcn3skiYOS6CC8jOw7Ke93ufxbdczAW9b3HFY4qlg193WHTO2Za
let users = [
  {
    id: "123",
    username: "camilla",
    password: "$2b$12$AcAcn3skiYOS6CC8jOw7Ke93ufxbdczAW9b3HFY4qlg193WHTO2Za",
  },
];

export async function findUserByName(username) {
  return users.find((user) => user.username === username);
}

export async function signup(user) {
  const created = { ...user, id: uuidv4() };
  users = [...users, created];
  return created.id;
}
