import { Server } from "socket.io";
import * as chatRepository from "../repository/chat.js";

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("msg", async (data) => {
      await chatRepository.addChatList(data);
      const list = await chatRepository.getAllList();
      io.emit("msg", list);
      /* 만약 socket.emit으로 하면 1:1만 가능 서버-클라이언트 
			io.emit은 모두에게 */
    });
    socket.on("newUser", (user) => {
      socket.name = user;
      const msg = `${socket.name}님이 입장했습니다.`;
      console.log(msg);
      socket.broadcast.emit("userMsg", { type: "connect", message: msg });
    });

    // socket.on("disconnect", (user) => {
    //   const msg = `${user}님이 퇴장했습니다.`;
    //   console.log(msg);
    //   socket.broadcast.emit("userMsg", { type: "disconnect", message: msg });
    // });
  });
}

function verifyJwt(token) {
  return jwt.verify(token, secret, (error, decode) => {
    console.log(error);
    console.log(decode);
  });
}
