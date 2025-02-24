// import React, { useState } from "react";
// import { Heart, Eye, X } from "lucide-react";
// import axiosInstance from "../../utils/axios";
// import { useOutletContext } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// const HomeFeed = () => {
//   const { posts, user } = useOutletContext();
//   const userData = user.map((u) => u);

//   const [likes, setLikes] = useState({});
//   const [likeList, setLikeList] = useState([]);
//   const [likePanelOpen, setLikePanelOpen] = useState(false);
//   const [selectedPostId, setSelectedPostId] = useState(null); // ✅ Fix: Track selected post

//   const handleLike = async (postId) => {
//     if (!userData.length) {
//       console.error("User ID is undefined! Make sure user is logged in.");
//       return;
//     }
//     try {
//       const response = await axiosInstance.post(`/posts/like/${postId}`, {
//         userId: userData[0]._id,
//       });
//       setLikes((prev) => ({
//         ...prev,
//         [postId]: response.data.likes || (prev[postId] || 0) + 1,
//       }));
//     } catch (error) {
//       console.error("Failed to like the post", error);
//     }
//   };

//   const fetchAndShowLikes = async (postId) => {
//     try {
//       const response = await axiosInstance.get(`/posts/allLikes/${postId}`);

//       setLikeList(response.data.likedBy);
//       setLikes((prev) => ({
//         ...prev,
//         [postId]: response.data.likesCount,
//       }));

//       setSelectedPostId(postId); // ✅ Fix: Store which post's likes are being viewed
//       setLikePanelOpen(true);
//     } catch (error) {
//       console.error("Failed to fetch likes", error);
//     }
//   };

//   return (
//     <div className="relative max-h-[700px] w-full shadow-xl overflow-y-auto flex flex-col gap-6 p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg scrollbar-hide">
//       {posts?.map((post) => (
//         <div key={post._id} className="bg-white rounded-xl shadow-lg p-5 w-full md:w-[80%] mx-auto relative">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <img src={post.user?.profilePic || "https://via.placeholder.com/150"} alt="Profile" className="w-10 h-10 rounded-full" />
//               <div>
//                 <p className="font-bold text-lg">{post.user?.username}</p>
//                 <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
//               </div>
//             </div>
//           </div>
//           {post.image && <img src={`data:image/jpeg;base64,${post.image}`} alt="Uploaded" className="w-full h-96 rounded-lg mb-3" />}
//           {post.caption && <p className="mb-3 text-gray-700">{post.caption}</p>}
//           <div className="flex items-center gap-6">
//             <button className="hover:text-red-500 flex items-center gap-1" onClick={() => handleLike(post._id)}>
//               ❤️ Like ({likes[post._id] || 0})
//             </button>
//             <button className="hover:text-blue-500 flex items-center gap-1" onClick={() => fetchAndShowLikes(post._id)}>
//               <Eye className="w-5 h-5" /> See Likes
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* Animated Likes Panel */}
//       <AnimatePresence>
//         {likePanelOpen && (
//           <motion.div
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="fixed bottom-0 left-0 w-full h-[300px] bg-white shadow-2xl p-5 rounded-t-lg flex flex-col gap-4"
//           >
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-bold">People who liked</h2>
//               <button onClick={() => setLikePanelOpen(false)} className="text-gray-500 hover:text-gray-700">
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="overflow-y-auto flex-1 scrollbar-hide">
//               {likeList.length > 0 ? (
//                 likeList.map((like) => (
//                   <div key={like._id} className="flex items-center gap-3 p-2 border-b">
//                     <img src={like.profilePic || "https://via.placeholder.com/150"} alt="Profile" className="w-8 h-8 rounded-full" />
//                     <p className="text-gray-700">{like.username}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 text-center">No likes yet</p>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default HomeFeed;
import React, { useState, useEffect, useRef } from "react";
import { Buffer } from "buffer";

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
const bufferToBase64 = (buffer) => {
  if (!buffer || !buffer.data) {
    console.error("Buffer is missing or invalid:", buffer);
    return ""; // Agar buffer undefined hai toh empty return kar do
  }

  // Uint8Array se binary string banao
  let binary = "";
  const bytes = new Uint8Array(buffer.data);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  // Base64 encode karo
  return `data:image/png;base64,${btoa(binary)}`;
};




const HomeFeed = () => {
  const { posts, user } = useOutletContext();
  const menuRef = useRef(null);

  const [likes, setLikes] = useState({});
  const [likeList, setLikeList] = useState([]);
  const [likePanelOpen, setLikePanelOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

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
    if (!user?._id) {
      console.error("User ID is undefined! Make sure user is logged in.");
      return;
    }
    try {
      const response = await axiosInstance.post(`/posts/like/${postId}`, {
        userId: user._id,
      });
      setLikes((prev) => ({
        ...prev,
        [postId]: response.data.likes || (prev[postId] || 0) + 1,
      }));
    } catch (error) {
      console.error("Failed to like the post", error);
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
      {posts?.map(
        (post) => (
          console.log("ProfilePic Buffer:", post.user.profilePic),
          (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-lg p-5 w-full md:w-[80%] mx-auto relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {post.user?.profilePic ? (
                    <img
                      src={bufferToBase64(post.user.profilePic)}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Default"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-bold text-lg">{post.user?.username}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </div>

                {/* 3 Dot Menu */}
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Post Image */}
              {post.image && (
                <img
                  src={bufferToBase64(post.image)}
                  alt="Uploaded"
                  className="w-full h-96 rounded-lg mb-3"
                />
              )}
              {post.caption && (
                <p className="mb-3 text-gray-700">{post.caption}</p>
              )}

              <div className="flex items-center gap-6">
                <button
                  className="hover:text-red-500 flex items-center gap-1"
                  onClick={() => handleLike(post._id)}
                >
                  ❤️ Like ({likes[post._id] || 0})
                </button>
                <button
                  className="hover:text-blue-500 flex items-center gap-1"
                  onClick={() => fetchAndShowLikes(post._id)}
                >
                  <Eye className="w-5 h-5" /> See Likes
                </button>
              </div>
            </div>
          )
        )
      )}

      {/* Animated Likes Panel */}
      <AnimatePresence>
        {likePanelOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-0 left-0 w-full h-[300px] bg-white shadow-2xl p-5 rounded-t-lg flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">People who liked</h2>
              <button
                onClick={() => setLikePanelOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 scrollbar-hide">
              {likeList.length > 0 ? (
                likeList.map((like) => (
                  <div
                    key={like._id}
                    className="flex items-center gap-3 p-2 border-b"
                  >
                    <img
                      src={
                        like.profilePic
                          ? bufferToBase64(like.profilePic)
                          : "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-gray-700">{like.username}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No likes yet</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeFeed;
