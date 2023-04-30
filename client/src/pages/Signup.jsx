import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setPasswordCheck(value);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("아이디와 비밀번호 모두 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 맞지 않습니다. 다시 확인해주세요.");
      setPassword("");
      setPasswordCheck("");
      return;
    }

    const data = await fetch(`${process.env.REACT_APP_BASE_HOST}/auth/signup`, {
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
            <h2>회원가입</h2>
          </div>
        </nav>
      </header>
      <form onSubmit={handleSignup}>
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
                <input
                  type="password"
                  className={styles.passwordCheck}
                  name="passwordCheck"
                  value={passwordCheck}
                  placeholder="비밀번호를 재입력해주세요."
                  onChange={handleChange}
                />
                <div>
                  <button className={styles.loginBtn}>가입</button>
                  <Link to="/auth/login" className={styles.cancelBtn}>
                    취소
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
