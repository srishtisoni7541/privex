
import { Bookmark, Grid, Heart, MoreVertical, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import EditProfile from "./EditProfile"; // ✅ Import EditProfile component

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [menuOpen, setMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const navigate = useNavigate();


  const getImageSrc = (base64String) => {
    if (!base64String) return "https://via.placeholder.com/150"; // Default image
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/users/logout");
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  
  const handleDeleteAccount = async () => {
    if (!user || !user._id) {
      console.error("User ID is missing!");
      alert("Error: User ID not found.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const response = await axiosInstance.delete(`/users/delete-account/${user._id}`);
      console.log("Deletion record:", response.data);
      alert("Your account has been deleted.");
      navigate("/");
    } catch (error) {
      console.error("Account deletion failed:", error);
      alert("Failed to delete account. Please try again.");
    }
  };



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/users/profile");
        console.log("Response from backend:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("User fetch failed:", error);
        navigate("/login");
      }
    };
    fetchUser();
}, []); 


  if (!user) {

      return (
        <div className="flex items-center absolute justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ); 
    
  }

  return (
    <div className="max-w-3xl mx-auto p-2 sm:p-4 min-h-screen relative">
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center relative">
        <img
          src={getImageSrc(user.profilePic)}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
        />
        <h2 className="text-lg font-bold mt-2">{user.username}</h2>
        <p className="text-sm text-gray-600">{user.bio || "No bio available."}</p>
        <div className="flex justify-between w-full mt-3 px-4 text-center">
          <span>
            <strong>{user.posts?.length || 0}</strong> Posts
          </span>
          <span>
            <strong>{user.stats?.followers|| 0}</strong> Followers
          </span>
          <span>
            <strong>{user.stats?.following || 0}</strong> Following
          </span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-3 right-4 p-2 rounded-full hover:bg-gray-200"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
        {menuOpen && (
          <div className="absolute top-10 right-4 bg-white shadow-md rounded-md py-2 text-sm">
            <button
              onClick={() => setEditProfileOpen(true)}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Edit Profile
            </button>
            <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100">
              Logout
            </button>
            <button onClick={handleDeleteAccount} className="block px-4 py-2 text-red-500 hover:bg-red-100">
              Delete Account
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-around border-b pb-2 mt-4">
        {[
          { name: "Posts", value: "posts", icon: <Grid /> },
          { name: "Liked", value: "likedPosts", icon: <Heart /> },
          { name: "Saved", value: "saved", icon: <Bookmark /> },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-1 px-3 py-1 text-sm font-medium ${
              activeTab === tab.value ? "border-b-2 border-gray-300 text-white" : "text-gray-500"
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>
<div className="grid grid-cols-3 gap-2 mt-4">
  {activeTab === "posts" && user.posts?.length > 0 ? (
    user.posts.map((post, i) => (
      <img
        key={i}
        src={post.image}
        alt={`Post ${i + 1}`}
        className="w-full h-36 object-cover bg-white rounded-md"
      />
    ))
  ) : activeTab === "likedPosts" && user.likedPosts?.length > 0 ? (
    user.likedPosts.map((post, i) => (
      <img
        key={i}
        src={post.image}
        alt={`Liked Post ${i + 1}`}
        className="w-full h-36 object-cover bg-white rounded-md"
      />
    ))
  ) : (
    <p className="col-span-3 text-center text-gray-500">No {activeTab} available.</p>
  )}
</div>


      <AnimatePresence>
        {editProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <div className="w-full sm:w-[500px] lg:w-[600px] bg-white shadow-2xl p-5 rounded-lg h-[90vh] sm:h-auto sm:max-h-[80vh] flex flex-col gap-4 overflow-y-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Edit Profile</h2>
                <button onClick={() => setEditProfileOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <EditProfile user={user} onClose={() => setEditProfileOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;