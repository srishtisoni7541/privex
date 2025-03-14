





import React, { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axiosInstance from "../../utils/axios";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const bufferToBase64 = (buffer) => {
    if (!buffer || !buffer.data) return "";
    const uint8Array = new Uint8Array(buffer.data);
    const binaryString = uint8Array.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return `data:image/png;base64,${btoa(binaryString)}`;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const userResponse = await axiosInstance.get("/users/allUsers");
        setUsers(userResponse.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    getData();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(query.toLowerCase())
  );

  // // Function to navigate to user detail page
  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`); // Navigate to the user details page
  };


 

  return (
    <div className="max-w-lg mx-auto p-4">
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

      {query && (
        <div className="bg-white mt-2 p-3 rounded-lg shadow-md">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user._id}>
                <div
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => handleUserClick(user._id)} // Navigate on click
                >
                  <img
                    src={bufferToBase64(user.profilePic) || "https://via.placeholder.com/40"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user.username}</span>
                </div>
                <h6 className="text-sm ml-14 mt-[-12px]">{user.bio}</h6>
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
