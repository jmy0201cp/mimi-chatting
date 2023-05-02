import { Server } from "socket.io";
import * as chatRepository from "../repository/chat.js";

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.BASE_HOST,
    },
  });

  io.on("connection", async (socket) => {
    socket.on("msg", async (data) => {
      await chatRepository.addChatList(data);
      const list = await chatRepository.getAllList();
      io.emit("msg", list);
      /* 만약 socket.emit으로 하면 1:1만 가능 서버-클라이언트 
			io.emit은 모두에게 */
    });
    socket.on("newUser", async (user) => {
      socket.name = user;
      console.log("입장");
      console.log(socket.name);

      const msg = `${socket.name}님이 입장했습니다.`;
      console.log(msg);
      socket.broadcast.emit("userMsg", { type: "connect", message: msg });
    });

    const users = await chatRepository.getChatUserList();
    io.emit("chatUserCnt", users.length);
    // 브라우저 닫아서 나가기
    socket.on("disconnect", async () => {
      if (socket.name) {
        const msg = `${socket.name}님이 퇴장했습니다.`;
        console.log("브라우저 닫기");
        console.log(msg);
        socket.broadcast.emit("userMsg", { type: "disconnect", message: msg });
        return;
      }
    });
    //방나가기 눌러서 퇴장했을때
    socket.on("leave", async (user) => {
      console.log("퇴장");
      const msg = `${user}님이 퇴장했습니다.`;
      const users = await chatRepository.getChatUserList();
      console.log("요청");
      console.log(users.length);

      if (users.length === 1) {
        await chatRepository.removeAllChatText();
      }
      await chatRepository.removeUserList(user);

      socket.broadcast.emit("userMsg", { type: "disconnect", message: msg });
      socket.disconnect();
    });
  });
}
