import axios from "axios";
import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Controlled inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ States for feedback
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // ✅ Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    axios
      .post(`${API_URL}/api/auth/login`, {
        email: email.trim(),
        password: password.trim(),
      })
      .then((response) => {
        console.log(response.data);
        setSuccess("✅ Login successful!");
        Cookies.set("token", response.data.token);
        <Navigate to="/notes" replace />;
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setError("❌ Invalid email or password.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-indigo-500 to-blue-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] sm:w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login to Your Account
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center mb-3">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm text-center mb-3">{success}</p>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-sm text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
