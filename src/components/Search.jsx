// import React, { useState } from "react";
// import { Search as SearchIcon } from "lucide-react";

// const SearchComponent = () => {
//   const [query, setQuery] = useState("");

//   // Dummy Users with Profile Pics
//   const dummyUsers = [
//     { name: "John Doe", profilePic: "https://i.pravatar.cc/40?img=1" },
//     { name: "Jane Smith", profilePic: "https://i.pravatar.cc/40?img=2" },
//     { name: "Aman Gupta", profilePic: "https://i.pravatar.cc/40?img=3" },
//     { name: "Priya Sharma", profilePic: "https://i.pravatar.cc/40?img=4" },
//     { name: "Rahul Verma", profilePic: "https://i.pravatar.cc/40?img=5" },
//     { name: "Simran Kaur", profilePic: "https://i.pravatar.cc/40?img=6" },
//     { name: "Dev Patel", profilePic: "https://i.pravatar.cc/40?img=7" },
//   ];

//   // Dummy Topics
//   const dummyResults = [
//     "React JS Tutorials",
//     "Next.js Guide",
//     "Frontend Development",
//     "ShadCN UI Components",
//     "Tailwind CSS Tricks",
//     "JavaScript Best Practices",
//   ];

//   // Filtered Users & Topics
//   const filteredUsers = dummyUsers.filter((user) =>
//     user.name.toLowerCase().includes(query.toLowerCase())
//   );
//   const filteredTopics = dummyResults.filter((topic) =>
//     topic.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="max-w-lg mx-auto p-4">
//       {/* Search Bar */}
//       <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 bg-white">
//         <SearchIcon className="w-5 h-5 text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search users or topics..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="w-full outline-none bg-transparent"
//         />
//       </div>

//       {/* Search Results */}
//       {query && (
//         <div className="bg-white mt-2 p-3 rounded-lg shadow-md">
//           {/* Users List */}
//           {filteredUsers.length > 0 && (
//             <div>
//               <h3 className="text-sm text-gray-500 mb-1">Users</h3>
//               {filteredUsers.map((user, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
//                 >
//                   <img
//                     src={user.profilePic}
//                     alt={user.name}
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <span>{user.name}</span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Topics List */}
//           {filteredTopics.length > 0 && (
//             <div className="mt-3">
//               <h3 className="text-sm text-gray-500 mb-1">Topics</h3>
//               {filteredTopics.map((topic, index) => (
//                 <div
//                   key={index}
//                   className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
//                 >
//                   {topic}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* No Results */}
//           {filteredUsers.length === 0 && filteredTopics.length === 0 && (
//             <p className="text-gray-500 text-center">No results found</p>
//           )}
//         </div>
//       )}

//       {/* Popular Searches (When No Query) */}
//       {!query && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold mb-2">Popular Searches</h3>
//           <div className="bg-white p-3 rounded-lg shadow-md">
//             {dummyResults.map((result, index) => (
//               <div
//                 key={index}
//                 className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
//               >
//                 {result}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchComponent;



import React, { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import axiosInstance from "../../utils/axios";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    const getData = async () => {
      try {
        const userResponse = await axiosInstance.get("/users/allUsers");
        console.log(userResponse.data);
        setUsers(userResponse.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
console.log(users);
    getData();
  }, []);

  // Filter users based on query
  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(query.toLowerCase())
  );
  console.log("Filtered user:",filteredUsers);

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 bg-white">
        <SearchIcon className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none bg-transparent"
        />
      </div>

      {/* Search Results */}
      {query && (
        <div className="bg-white mt-2 p-3 rounded-lg shadow-md">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <img
                  src={user.profilePic || "https://via.placeholder.com/40"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.username}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
