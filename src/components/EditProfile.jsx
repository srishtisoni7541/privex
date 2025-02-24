

import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/users/profile"); // ✅ API call
        if (response.status === 200) {
          setUsername(response.data.username || "");
          setBio(response.data.bio || "");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    if (profileImg) {
      formData.append("profileImg", profileImg);
    }

    try {
      const response = await axiosInstance.post("/users/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Profile updated successfully!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-cover bg-[url(https://images.unsplash.com/photo-1589264110781-1ebfa05f901e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxpZ2h0JTIwYmx1ZSUyMGJhY2tncm91bmQlMjBpbWd8ZW58MHx8MHx8fDA%3D)]">
      <div className="p-8 text-white rounded-xl w-[90%] sm:w-[500px] lg:w-[700px] bg-white/10 backdrop-blur-md shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-lg font-medium">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 text-white rounded-lg border border-gray-300 bg-transparent"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium">Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-4 text-white rounded-lg border border-gray-300 bg-transparent"
              rows="5"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium">Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 text-white border border-gray-300 rounded-lg bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
