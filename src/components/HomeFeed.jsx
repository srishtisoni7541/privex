import React, { useState, useEffect, useRef } from "react";
import { Heart, Eye, X, MoreVertical } from "lucide-react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom"; // Using useNavigate for redirection
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import CommentSection from "./Commentsection";

// Format date function
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Retrieve logged-in user from localStorage
const loggedInUser = JSON.parse(localStorage.getItem("loggedIn-user")) || {};



// Helper function to convert buffer to Base64 safely
const bufferToBase64 = (buffer) => {
  if (!buffer || !buffer.data) return "";
  const binary = new Uint8Array(buffer.data).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  return `data:image/png;base64,${btoa(binary)}`;
};

// Helper function to get profile picture URL
const getProfilePic = (user) => {
  return user?.profilePic?.data
    ? bufferToBase64(user.profilePic)
    : "https://via.placeholder.com/150";
};

const HomeFeed = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [likeList, setLikeList] = useState([]);
  const [likePanelOpen, setLikePanelOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef(null);
  const [showComments, setShowComments] = useState(false);

  // Fetch fresh posts from backend on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/posts/Allposts");
        console.log("Fetched posts:", response.data);
        // If response.data is an array, use it directly. Otherwise, check for a posts property.
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else if (Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
        } else {
          setPosts([]); // Fallback to an empty array if data is not in expected format
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLike = async (postId) => {
    if (!postId) {
      console.error("postId is missing!");
      return;
    }

    // ✅ Pehle frontend par likes count badhao
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, likesCount: (post.likesCount || 0) + 1 }
          : post
      )
    );

    try {
      const response = await axiosInstance.post(`/posts/like/${postId}`);
      console.log("✅ Like success:", response.data);

      if (response.data?.likesCount !== undefined) {
        // ✅ Server ka response se update karo
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? { ...post, likesCount: response.data.likesCount }
              : post
          )
        );
      }
    } catch (error) {
      console.error(
        "❌ Failed to like the post",
        error.response?.data || error
      );

      // ❌ Agar error aaye toh undo frontend increment
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likesCount: Math.max((post.likesCount || 1) - 1, 0) }
            : post
        )
      );
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      console.log("Deleting post with ID:", postId);
      const response = await axiosInstance.delete(`/posts/delete/${postId}`);
      console.log(response);
      setPosts((prev) => prev.filter((post) => post._id !== postId));

      toast.success("Post successfully deleted!", {
        position: "top-right",
        autoClose: 2000,
      });

      // Redirect to home after deletion
      setTimeout(() => {
        navigate("/dashboard/home");
      }, 2000);
    } catch (error) {
      console.error(
        "Error deleting post:",
        error.response?.data || error.message
      );
      toast.error("Failed to delete post!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const fetchAndShowLikes = async (postId) => {
    try {
      const response = await axiosInstance.get(`/posts/allLikes/${postId}`);
      setLikeList(response.data.likedBy);
      setLikes((prev) => ({
        ...prev,
        [postId]: response.data.likesCount,
      }));
      setSelectedPostId(postId);
      setLikePanelOpen(true);
    } catch (error) {
      console.error("Failed to fetch likes", error);
    }
  };
  const SavedPostHandler = async (postId) => {
    console.log("Sending request to save post:", postId);

    if (!postId) {
      console.error("Post ID is missing!");
      return;
    }

    try {
      const response = await axiosInstance.post(`/posts/save/${postId}`);
      console.log("✅ Post saved successfully:", response.data);

      toast.success("Post saved!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("❌ Failed to save post", error.response?.data || error);

      toast.error("Failed to save post!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="relative max-h-[700px] w-full shadow-xl overflow-y-auto flex flex-col gap-6 p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg scrollbar-hide">
      {posts?.map((post) => {
        const profilePic = getProfilePic(post.user);
        return (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow-lg p-5 w-full md:w-[80%] mx-auto relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                  <p className="font-bold text-lg">{post.user?.username}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() =>
                    setMenuOpen(menuOpen === post._id ? null : post._id)
                  }
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <MoreVertical className="w-6 h-6 text-gray-600" />
                </button>
                <AnimatePresence>
                  {menuOpen === post._id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -5 }}
                      className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-10"
                    >
                      <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                        📤 Share
                      </button>
                      <button
                        onClick={() => SavedPostHandler(post._id)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        💾 Save
                      </button>

                      {loggedInUser?.user?._id === post.user?._id && (
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          🗑 Delete
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {post.image && (
              <img
                src={post.image}
                alt="Uploaded"
                className="w-full h-96 rounded-lg mb-3 object-cover"
              />
            )}
            {post.caption && (
              <p className="mb-3 text-gray-700">{post.caption}</p>
            )}

            <div className="flex items-center gap-6">
              <button
                onClick={() => handleLike(post._id)}
                className="flex items-center gap-1"
              >
                <Heart className="w-5 h-5 text-red-500" />
                {post.likesCount || 0}
              </button>
              <button
                className="hover:text-blue-500 flex items-center gap-1"
                onClick={() => fetchAndShowLikes(post._id)}
              >
                <Eye className="w-5 h-5" /> See Likes
              </button>
              <button
                onClick={() =>
                  setShowComments((prev) =>
                    prev === post._id ? null : post._id
                  )
                }
              >
                Comment
              </button>

              <AnimatePresence>
                {showComments === post._id && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CommentSection postId={post._id} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
      <AnimatePresence>
        {likePanelOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-0 left-0 w-full h-[300px] bg-white shadow-2xl p-5 rounded-t-lg flex flex-col gap-4 overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-bold">People who liked</h2>
              <button
                onClick={() => setLikePanelOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {likeList.length > 0 ? (
              likeList.map((user, index) => (
                <div
                  key={user._id || index}
                  className="flex items-center gap-3 p-2 border-b"
                >
                  <img
                    src={
                      user.profilePic
                        ? bufferToBase64(user.profilePic)
                        : "https://via.placeholder.com/50"
                    }
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="font-medium">{user.username}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-5">No likes yet</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeFeed;
