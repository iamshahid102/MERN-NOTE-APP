import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotesApp from "./components/NotesApp";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* ✅ Protected Route */}
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
