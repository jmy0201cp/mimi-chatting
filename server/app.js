import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./router/user.js";
import chatRouter from "./router/chat.js";
import initSocket from "./connection/socket.js";
import dotenv from "dotenv";
import connectDB from "./db/database.js";

dotenv.config();

const app = express();
app.use(express.json()); //이거 안써주면 아무리 통신을 해도 값이 undefined으로 나옴
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

app.use("/auth", userRouter);
app.use("/chat", chatRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    console.log("몽구스 연결 성공");
    const server = app.listen(8080);
    initSocket(server);
  })
  .catch(console.error);
