import "./App.css";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const token = localStorage.getItem("token");

  return <>{!token && <LoginPage />}</>;
}
