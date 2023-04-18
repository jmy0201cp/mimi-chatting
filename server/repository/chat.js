import jwt from "jsonwebtoken";

const secret = "flkdjseir12453ljdfaojdfnDFEns";
let list = [
  {
    name: "Ellizabeth",
    text: "나는 소중한 사람",
    createdAt: new Date().toString(),
  },
];

export async function getAllList() {
  return list;
}
export async function addChatList(data) {
  list = [...list, { ...data, createdAt: new Date().toString() }];
}
