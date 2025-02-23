
// import { Bookmark, Grid, Heart, MoreVertical } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("posts");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Backend se user fetch karo
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axiosInstance.get("/users/profile");
//         console.log(response);
//         setUser(response.data); // Backend se aaya user data set ho raha hai
//       } catch (error) {
//         console.error("User fetch failed:", error);
//         navigate("/login"); // Agar user ka data fetch nahi hua toh login page pe bhej do
//       }
//     };
  

//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axiosInstance.get(`/users/logout`);
//       localStorage.removeItem("accessToken");
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error.response?.data?.message || error.message);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       if (!user?._id) return;
//       await axiosInstance.delete(`/users/delete-account/${user._id}`);
//       navigate("/login");
//     } catch (error) {
//       console.error("Error deleting account:", error);
//     }
//   };
//   console.log(user);

//   if (!user) {
//     return <div className="text-center mt-10 text-xl font-semibold">Loading...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-6 relative">
//         <img
//           src={user.profilePic || "https://via.placeholder.com/150"}
//           alt="Profile"
//           className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
//         />
//         <div className="flex flex-col flex-grow">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold">{user.username}</h2>

//             <div className="relative">
//               <button
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="p-2 rounded-full hover:bg-gray-200"
//               >
//                 <MoreVertical className="w-6 h-6 text-gray-600" />
//               </button>

//               {menuOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-10">
//                   <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm">
//                     Edit Profile
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
//                   >
//                     Logout
//                   </button>
//                   <button
//                     onClick={handleDeleteAccount}
//                     className="w-full px-4 py-2 text-left hover:bg-red-100 text-red-600 text-sm"
//                   >
//                     Delete Account
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex gap-6 mt-2 text-gray-500">
//             <span><strong>{user.posts?.length || 0}</strong> posts</span>
//             <span><strong>{user.followers?.length || 0}</strong> followers</span>
//             <span><strong>{user.following?.length || 0}</strong> following</span>
//           </div>
//           <p className="text-sm mt-2 text-gray-600">{user.bio || "No bio available."}</p>
//           <p className="text-xs text-gray-400">Joined on: {user.createdAt?.split("T")[0]}</p>
//         </div>
//       </div>

//       <div className="mt-6 flex justify-center space-x-6 border-b pb-2">
//         {[
//           { name: "Posts", value: "posts", icon: <Grid className="w-5 h-5" /> },
//           { name: "Liked", value: "likedPosts", icon: <Heart className="w-5 h-5" /> },
//           { name: "Saved", value: "saved", icon: <Bookmark className="w-5 h-5" /> },
//         ].map((tab) => (
//           <button
//             key={tab.value}
//             onClick={() => setActiveTab(tab.value)}
//             className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
//               activeTab === tab.value ? "bg-gray-200 text-gray-900" : "text-gray-500"
//             }`}
//           >
//             {tab.icon} {tab.name}
//           </button>
//         ))}
//       </div>

//       <div className="mt-4 grid grid-cols-3 gap-3">
//         {activeTab === "posts" && user.posts?.length > 0 ? (
//           user.posts.map((post, i) => (
//             <div key={i} className="relative group">
//               <img
//                 src={post?.image ? `data:image/jpeg;base64,${post.image}` : "https://via.placeholder.com/400"}
//                 alt={`Post ${i + 1}`}
//                 className="w-full h-[200px] object-cover rounded-md cursor-pointer"
//               />
//               {post?.caption && (
//                 <div className="absolute inset-0 bg-black bg-opacity-40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//                   <p className="text-sm text-center px-2">{post.caption}</p>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="col-span-3 text-center text-gray-500">
//             No {activeTab} available.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



import { Bookmark, Grid, Heart, MoreVertical } from "lucide-react";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/users/profile");
        setUser(response.data);
      } catch (error) {
        console.error("User fetch failed:", error);
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div className="text-center mt-10 text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center relative">
        <img
          src={user.profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
        />
        <h2 className="text-lg font-bold mt-2">{user.username}</h2>
        <p className="text-sm text-gray-600">{user.bio || "No bio available."}</p>
        <div className="flex justify-between w-full mt-3 px-4 text-center">
          <span><strong>{user.posts?.length || 0}</strong> Posts</span>
          <span><strong>{user.followers?.length || 0}</strong> Followers</span>
          <span><strong>{user.following?.length || 0}</strong> Following</span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-3 right-4 p-2 rounded-full hover:bg-gray-200"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
        {menuOpen && (
          <div className="absolute top-10 right-4 bg-white shadow-md rounded-md py-2 text-sm">
            <button className="block px-4 py-2 hover:bg-gray-100">Edit Profile</button>
            <button className="block px-4 py-2 hover:bg-gray-100">Logout</button>
            <button className="block px-4 py-2 text-red-500 hover:bg-red-100">Delete Account</button>
          </div>
        )}
      </div>

      <div className="flex justify-around border-b bg-white/10 backdrop-blur-xl pb-2 mt-4">
        {[{ name: "Posts", value: "posts", icon: <Grid /> },
          { name: "Liked", value: "likedPosts", icon: <Heart /> },
          { name: "Saved", value: "saved", icon: <Bookmark /> }
        ].map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-1 px-3 py-1 text-sm font-medium ${
              activeTab === tab.value ? "border-b-2 border-gray-800 text-gray-900" : "text-gray-500"
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3  gap-2 mt-4">
        {activeTab === "posts" && user.posts?.length > 0 ? (
          user.posts.map((post, i) => (
            <img
              key={i}
              src={post?.image ? `data:image/jpeg;base64,${post.image}` : "https://via.placeholder.com/400"}
              alt={`Post ${i + 1}`}
              className="w-full h-24 object-cover rounded-md"
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No {activeTab} available.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
