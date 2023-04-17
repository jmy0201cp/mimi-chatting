import express from "express";
import cors from "cors";
import userRouter from "./router/user.js";
import chatRouter from "./router/user.js";
import initSocket from "./connection/socket.js";

const app = express();
app.use(express.json()); //이거 안써주면 아무리 통신을 해도 값이 undefined으로 나옴
app.use(cors());

app.use("/auth", userRouter);
app.use("/chat", chatRouter);

// const server = app.listen(8080);
// initSocket(server);
app.listen(8080);
