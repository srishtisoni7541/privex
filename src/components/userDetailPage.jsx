import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { Buffer } from "buffer";
import { ArrowLeft } from "lucide-react";
import UserPosts from "./userPosts";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const loggedInUserId = localStorage.getItem("userId"); 

  const getImageSrc = (profilePic) => {
    if (!profilePic || !profilePic.data) return "https://via.placeholder.com/150";
    const base64String = Buffer.from(profilePic.data).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    if (!id) {
      console.error("UserID is undefined!");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="w-full min-h-screen mx-auto p-4 text-white bg-[url(https://images.unsplash.com/photo-1589264110781-1ebfa05f901e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxpZ2h0JTIwYmx1ZSUyMGJhY2tncm91bmQlMjBpbWd8ZW58MHx8MHx8fDA%3D)] bg-cover overflow-auto flex flex-col items-center">
      
      <button 
        className="absolute top-4 left-4 flex items-center gap-2 bg-gray-800 p-2 rounded-full md:p-3"
        onClick={() => navigate("/dashboard/search")}
      >
        <ArrowLeft size={20} className="text-white" />
      </button>

      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:gap-6 mt-6 w-full max-w-md md:max-w-2xl">
        <img
          src={getImageSrc(user.profilePic)}
          alt={user.username}
          className="w-20 h-20 rounded-full object-cover border border-gray-500 md:w-32 md:h-32"
        />
        <div className="text-center md:text-left w-full">
          <h2 className="text-lg font-bold md:text-xl">{user.username}</h2>
          <p className="text-sm text-gray-400 md:text-base">{user.bio || "No bio available"}</p>
          <div className="flex gap-4 mt-2 justify-center md:justify-start">
            <span>{user?.posts?.length || 0} posts</span>
            <span>{user?.followers?.length || 0} followers</span>
            <span>{user?.following?.length || 0} following</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4 w-full max-w-md md:max-w-2xl md:flex-row md:justify-start">
        {id === loggedInUserId ? (
          <>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-full md:w-auto">Edit Profile</button>
            <button className="border border-gray-500 px-4 py-2 rounded-lg w-full md:w-auto">Share Profile</button>
          </>
        ) : (
          <>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full md:w-auto">Follow</button>
            <button className="border border-gray-500 px-4 py-2 rounded-lg w-full md:w-auto">Message</button>
          </>
        )}
      </div>

      <div className="w-full max-w-md md:max-w-2xl">
        <UserPosts user={user} />
      </div>
    </div>
  );
};

export default UserDetailPage;
