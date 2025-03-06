import React, { useState, useEffect, useRef, useMemo } from "react";
import { Heart, Eye, X, MoreVertical } from "lucide-react";
import axiosInstance from "../../utils/axios";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// ✅ Fix: Convert Buffer to Base64 Safely
const bufferToBase64 = (buffer) => {
  if (!buffer || !buffer.data) return "";
  const binary = new Uint8Array(buffer.data).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  return `data:image/png;base64,${btoa(binary)}`;
};

const HomeFeed = () => {
  const { posts: initialPosts } = useOutletContext();

  const [posts, setPosts] = useState(initialPosts || []);
  const [likes, setLikes] = useState({});
  const [likeList, setLikeList] = useState([]);
  const [likePanelOpen, setLikePanelOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

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
    console.error("❌ postId is missing!");
    return;
  }

  console.log("👍 Sending like request for postId:", postId);

  try {
    const response = await axiosInstance.post(`/posts/like/${postId}`);

    console.log("✅ Like success:", response.data);

    if (response.data?.likesCount !== undefined) {
      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post._id === postId) {
            console.log("Updating likes for post:", postId, "New Count:", response.data.likesCount);
            return { ...post, likesCount: response.data.likesCount };
          }
          return post;
        });
      });
    }
  } catch (error) {
    console.error("❌ Failed to like the post", error.response?.data || error);
  }
};


  const handleDeletePost = async (postId) => {
    try {
      console.log("Deleting post with ID:", postId); // ✅ Check if ID is correct
      await axiosInstance.delete(`/posts/delete/${postId}`);
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error(
        "Error deleting post:",
        error.response?.data || error.message
      );
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

  return (
    <div className="relative max-h-[700px] w-full shadow-xl overflow-y-auto flex flex-col gap-6 p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg scrollbar-hide">
      {posts?.map((post) => {
        // ✅ Fix: Ensure Safe UseMemo Dependency
        const profilePic = useMemo(() => {
          return post.user?.profilePic?.data
            ? bufferToBase64(post.user.profilePic)
            : "https://via.placeholder.com/150";
        }, [post.user?.profilePic?.data]);

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
                      <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                        💾 Save
                      </button>
                      <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                        delete
                      </button>
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
                { post.likesCount || 0}
              </button>
              <button
                className="hover:text-blue-500 flex items-center gap-1"
                onClick={() => fetchAndShowLikes(post._id)}
              >
                <Eye className="w-5 h-5" /> See Likes
              </button>
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
                  key={user._id || index} // Agar _id na mile toh index use karo
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
