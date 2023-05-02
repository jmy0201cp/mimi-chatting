import * as chatRepository from "../repository/chat.js";

export async function defaultChatList(req, res) {
  const list = await chatRepository.getAllList();
  res.status(201).json(list);
}

export async function room(req, res) {
  const list = await chatRepository.getChatUserList();
  res.status(201).json(list);
}
