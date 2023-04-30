import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <form onSubmit={handleLogin}>
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
        <button>로그인</button>
      </form>
      <Link to="/auth/signup">회원가입</Link>
    </>
  );
}
