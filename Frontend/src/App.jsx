import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotesApp from "./components/NotesApp";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  // ✅ Manage auth state
  const [isAuth, setIsAuth] = useState(false);

  // ✅ Check login status from localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuth");
    if (loggedIn === "true") {
      setIsAuth(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} />}
        />
        {/* ✅ Protected Route */}
        <Route
          path="/notes"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <NotesApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
