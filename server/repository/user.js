import express from "express";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
});

const User = mongoose.model("User", userSchema);

export async function findUserByName(username) {
  return User.findOne({ username });
}

export async function signup(user) {
  return new User(user).save();
}
