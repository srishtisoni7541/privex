import React, { useState } from "react";
import { Image, MapPin, Send } from "lucide-react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify ka CSS import karna mat bhoolna!

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || !caption) {
      toast.error("Caption aur Image required hai! ❌");
      return;
    }
  
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", imageFile);
  
    try {
      // Access token aur refresh token ko localStorage se lene
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        toast.error("Tokens missing, please log in again! ❌");
        return;
      }
  
      // Access token ko use karke API request bhejna
      const response = await axiosInstance.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      toast.success("Post Created Successfully! ✅");
  
      // Thoda delay do taaki toast dikhe aur fir redirect ho
      setTimeout(() => {
        navigate("/dashboard/home");
      }, 2000);
  
      // Form Reset
      setImage(null);
      setImageFile(null);
      setCaption("");
      setLocation("");
    } catch (error) {
      console.error("Error creating post:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to create post! ❌");
  
      // Agar unauthorized error aata hai toh user ko login karna padega
      if (error.response?.status === 401) {
        toast.error("Session expired, please log in again! ❌");
        // Redirect to login page for re-authentication
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-5 rounded-xl mt-26 shadow-2xl">
      <h2 className="text-xl  text-white font-bold mb-4">Create a Post</h2>

      {/* Image Upload */}
      <label className="flex items-center gap-2 text-white cursor-pointer">
        <Image className="w-5 h-5" />
        <span>Upload Image</span>
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </label>

      {/* Image Preview */}
      {image && <img src={image} alt="Preview" className="w-full h-48 object-cover mt-3 rounded-lg" />}

      {/* Caption Input */}
      <textarea
        className="w-full p-2 mt-3 border text-white rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      ></textarea>

      {/* Location Input */}
      <div className="flex items-center gap-2 mt-3 border text-white rounded-lg p-2">
        <MapPin className="w-5 h-5 text-white" />
        <input
          type="text"
          placeholder="Add location"
          className="w-full text-white focus:outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Post Button */}
      <button
        className="w-full bg-blue-500 text-white p-2 mt-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600"
        onClick={handleSubmit}
      >
        <Send className="w-5 h-5" />
        Post
      </button>
    </div>
  );
};

export default CreatePost;
