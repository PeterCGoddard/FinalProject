import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";
export default function App()
{
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
