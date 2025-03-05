
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import VerifyOtp from "./components/VerifyOtp";
import { ToastContainer } from "react-toastify";
import UserProfile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import EditProfile from "./components/EditProfile";
import HomeFeed from "./components/HomeFeed";
import CreatePost from "./components/CreatePost";
import Searchbar from './components/Search';
import UserDetailPage from "./components/userDetailPage";

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Profile */}
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/update-profile" element={<EditProfile />} />
        <Route path="/user/:id" element={<UserDetailPage />} />

        {/* Dashboard with Nested Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home"  element={<HomeFeed />} />
          <Route path="search" element={<Searchbar />} />
        
          <Route path="create" element={<CreatePost />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
