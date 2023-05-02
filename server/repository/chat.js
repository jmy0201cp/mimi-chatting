import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    username: { type: String },
    text: { type: String },
  },
  { timestamps: true }
);

const roomSchema = new Schema(
  {
    username: { type: String },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
const Room = mongoose.model("Room", roomSchema);

//채팅 메세지 추가
export async function addChatList(data) {
  return new Chat(data).save();
}

//채팅
export async function getAllList() {
  return Chat.find();
}

//채팅방에 이사람이 들어가있나? 확인
export async function isExistUserInChatRoom(username) {
  return Room.findOne({ username });
}

//채팅방에 입장하는 사람 추가
export async function addUserList(username) {
  return new Room({ username }).save();
}

//채팅방에서 퇴장하는 사람 추가
export async function removeUserList(user) {
  const id = isExistUserInChatRoom(user).id;
  return Room.deleteOne({ id });
}

//채팅방에 있는 사람들 가져오기
export async function getChatUserList() {
  return Room.find();
}

export async function removeAllChatText() {
  getAllList().then((list) => {
    list.map(async (user) => {
      return await Chat.findByIdAndDelete(user.id);
    });
  });
}
