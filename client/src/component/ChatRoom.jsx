import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styles from "./ChatRoom.module.css";

export default function ChatRoom() {
  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);
  const [person, setPerson] = useState(localStorage.getItem("token"));
  const [greeting, setGreeting] = useState({ type: "", message: "" });
  const position = useRef();
  let socket = io.connect("http://localhost:8080/");

  const navigate = useNavigate();

  useEffect(() => {
    position.current.scrollTop = position.current.scrollHeight;
  }, [chat]);

  useEffect(() => {
    if (!person) {
      navigate("/auth/login");
    }

    fetch("http://localhost:8080/chat/room/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(setChat);

    socket.on("msg", (data) => {
      setChat(data);
    });
    socket.emit("newUser", person);
    socket.on("userMsg", (data) => {
      setGreeting(data);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setGreeting("");
    }, 7000);
  }, [greeting]);

  const handleExit = () => {
    alert("채팅방에서 퇴장합니다.");
    // socket.emit("disconnect", person);
    navigate("/auth/login");
    localStorage.clear();
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text == null || text === "") {
      alert("대화를 입력해주세요.");
      return;
    }
    //보내기
    socket.emit("msg", {
      name: person,
      text,
    });
    setText("");
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.exitButtonWrap}>
        <span className={styles.chatUsersCnt}>
          방 인원: <span>2</span>
        </span>
        <button className={styles.exitButton} onClick={handleExit}>
          방 나가기
        </button>
      </div>
      <div>
        <ul ref={position} className={styles.chatList}>
          {chat &&
            chat.map((list, index) => (
              <li className={styles.chatEach} key={list.id || index}>
                {person !== list.name && (
                  <span className={styles.chatUsername}>{list.name}</span>
                )}
                <div
                  className={`${styles.chatContent} ${
                    person === list.name ? styles.me : ""
                  }`}
                >
                  {list.text}
                </div>
              </li>
            ))}
        </ul>
        <p className={styles.chatLang}>{greeting.message}</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.chatForm}>
        <input
          type="text"
          id="inputChat"
          className={styles.chatInput}
          placeholder="대화를 입력해주세요"
          onChange={handleChange}
          value={text}
        />
        <button className={styles.chatSubmitButton}>전송</button>
      </form>
    </div>
  );
}
