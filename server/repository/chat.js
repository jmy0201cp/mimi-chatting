import mongoose, { Schema } from "mongoose";

let room = [];

const chatSchema = new Schema(
  {
    username: { type: String },
    text: { type: String },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

//채팅 메세지 추가
export async function addChatList(data) {
  return new Chat(data).save();
}

//채팅
export async function getAllList() {
  return Chat.find();
}

//채팅방에 이사람이 들어가있나? 확인
export async function isExistUserInChatRoom(name) {
  return room.find((username) => username === name);
}

//채팅방에 입장하는 사람 추가
export async function addUserList(user) {
  return (room = [...room, user]);
}

//채팅방에서 퇴장하는 사람 추가
export async function removeUserList(user) {
  room = room.filter((username) => username != user);
  return room;
}

//채팅방에 있는 사람들 가져오기
export async function getChatUserList() {
  return room;
}
