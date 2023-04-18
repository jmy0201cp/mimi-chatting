import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

    if (password !== passwordCheck) {
      alert("비밀번호가 맞지 않습니다. 다시 확인해주세요.");
      setPassword("");
      setPasswordCheck("");
      return;
    }

    const data = await fetch(`http://localhost:8080/auth/signup`, {
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
    console.log(response);
    if (!token) {
      alert(`${response.message}`);
      return;
    }

    if (token) {
      localStorage.setItem("token", token);
      console.log("토큰있음");
      navigate("/chat/room");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={handleChange}
      />
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <input
        type="password"
        id="passwordCheck"
        name="passwordCheck"
        value={passwordCheck}
        onChange={handleChange}
      />
      <button>가입</button>
      <Link to="/auth/login">취소</Link>
    </form>
  );
}
