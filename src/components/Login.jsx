import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../utils/axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log({email, password});

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const userData = response.data; // Assuming user data is returned
      console.log("data:", userData);


      // Save tokens to localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("loggedIn-user", JSON.stringify(userData)); 

      // Success Toast
      toast.success(response.data.message || "Login Successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      // Redirect to dashboard or home page
      setTimeout(() => navigate("/verify-otp"), 4000);
    } catch (error) {
      console.log("Error Response:", error.response?.data);

      // Error Toast
      toast.error(error.response?.data?.message || "Login Failed! Try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-10 p-3 h-screen bg-[url(https://images.unsplash.com/photo-1589264110781-1ebfa05f901e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxpZ2h0JTIwYmx1ZSUyMGJhY2tncm91bmQlMjBpbWd8ZW58MHx8MHx8fDA%3D)] bg-cover bg-gray-100">
                <h1 className="text-7xl md:text-9xl text-white font-bold">ₚᵣᵢᵥₑₓ</h1>
      <div className="p-8 rounded-lg shadow-2xl w-84 bg-white/10 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 text-white border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 text-white border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-gray-300 text-center mt-4">
          Don't have an account? <a href="/" className="text-blue-400 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
