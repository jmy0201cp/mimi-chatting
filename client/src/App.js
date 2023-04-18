import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import ChatRoom from "./component/ChatRoom";

export default function App() {
  // const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/chat/room" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}
