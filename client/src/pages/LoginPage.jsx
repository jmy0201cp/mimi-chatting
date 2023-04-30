import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/chat/room");
    }
  });

  const handleChange = (e) => {
    const name = e.target.name;
    name === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      alert("아이디와 비밀번호 모두 입력해주세요.");
      return;
    }

    const data = await fetch(`${process.env.REACT_APP_BASE_HOST}/auth/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const response = await data.json();
    const token = response.username;

    if (!token) {
      alert(`${response.message}`);
      return;
    }

    if (token) {
      localStorage.setItem("token", token);
      navigate("/chat/room");
    }
  };

  return (
    <>
      <header className={styles.topbar}>
        <nav>
          <div className={styles.container}>
            <h2>로그인</h2>
          </div>
        </nav>
      </header>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.bodyWrapper}>
          <div className={styles.selectionContainer}>
            <div className={styles.email}>
              <div className={styles.selection}>
                <input
                  type="text"
                  className={styles.username}
                  name="username"
                  value={username}
                  placeholder="아이디"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  className={styles.password}
                  name="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={handleChange}
                />
                <button className={styles.loginBtn}>로그인</button>
                <Link to="/auth/signup" className={styles.signupBtn}>
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
