import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../utils/axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // ✅ Email state add kiya
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("").trim();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Please enter your email.");
      return;
    }

    if (enteredOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("auth/verify-otp", {
        email: trimmedEmail, // ✅ Email send kar rahe hain
        otp: enteredOtp, // ✅ OTP bhi send kar rahe hain
      });

      console.log(response);
      toast.success(response.data.message || "OTP Verified Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Success ke baad redirect
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response?.data?.message || "Invalid OTP! Try Again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center  justify-center h-screen bg-gray-100 bg-[url(https://images.unsplash.com/photo-1589264110781-1ebfa05f901e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxpZ2h0JTIwYmx1ZSUyMGJhY2tncm91bmQlMjBpbWd8ZW58MHx8MHx8fDA%3D)] bg-cover p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">Verify OTP</h2>
      <p className="text-gray-100 mb-6">Enter the 6-digit OTP sent to your email</p>

      {/* ✅ Email Input */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 text-white w-72 p-2 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* OTP Inputs */}
      <div className="flex space-x-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-12 h-12 text-center text-white text-lg border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
};

export default VerifyOtp;
