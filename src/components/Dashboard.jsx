
// import React, { useState, useEffect } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { Home, Search, PlusSquare, User } from "lucide-react";
// import axiosInstance from "../../utils/axios";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [posts, setPosts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const userResponse = await axiosInstance.get("/users/allUsers");
//         const postsResponse = await axiosInstance.get("/posts/allposts", {
//           responseType: "arraybuffer",
//         });

//         const decoder = new TextDecoder("utf-8");
//         const jsonString = decoder.decode(new Uint8Array(postsResponse.data));
//         const parsedData = JSON.parse(jsonString);

//         console.log("Parsed Posts:", parsedData);
//         setPosts(parsedData.posts);
//         setUsers(userResponse.data);
//       } catch (err) {
//         setError("Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (location.pathname === "/dashboard") {
//       navigate("/dashboard/home");
//     }
//   }, [location.pathname, navigate]);

//   if (loading)
//     return <div className="text-center mt-10 text-xl">Loading...</div>;
//   if (error)
//     return <div className="text-center mt-10 text-red-500">{error}</div>;

//   const tabs = [
//     { name: "Home", path: "/dashboard/home", icon: Home },
//     { name: "Search", path: "/dashboard/search", icon: Search },
//     { name: "Create", path: "/dashboard/create", icon: PlusSquare },
//     { name: "Profile", path: "/dashboard/profile", icon: User },
//   ];

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-[url(https://images.unsplash.com/photo-1589264110781-1ebfa05f901e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxpZ2h0JTIwYmx1ZSUyMGJhY2tncm91bmQlMjBpbWd8ZW58MHx8MHx8fDA%3D)] bg-cover bg-gray-100">
//       {/* Sidebar for Desktop */}
//       <div className="hidden md:flex flex-col w-64 p-5 bg-white shadow-lg min-h-screen">
//         {tabs.map((tab) => (
//           <button
//             key={tab.path}
//             onClick={() => navigate(tab.path)}
//             className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition ${
//               location.pathname === tab.path
//                 ? "bg-blue-500 text-white"
//                 : "text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             <tab.icon className="w-6 h-6" />
//             {tab.name}
//           </button>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow p-4 md:max-w-3xl mx-auto w-full">
//         <Outlet context={{ posts, users }} />
//       </div>

//       {/* ✅ Bottom Navbar for Mobile */}
//       <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around py-3 border-t border-gray-300">
//         {tabs.map((tab) => (
//           <button
//             key={tab.path}
//             onClick={() => navigate(tab.path)}
//             className={`flex flex-col items-center text-sm transition ${
//               location.pathname === tab.path ? "text-blue-500" : "text-gray-700"
//             }`}
//           >
//             <tab.icon className="w-6 h-6" />
//             <span>{tab.name}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, Search, PlusSquare, User } from "lucide-react";
import axiosInstance from "../../utils/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state update if unmounted

    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Implement basic retry logic for rate limit error (optional)
        const userResponse = await axiosInstance.get("/users/allUsers");
        const postsResponse = await axiosInstance.get("/posts/allposts", {
          responseType: "arraybuffer",
        });

        const decoder = new TextDecoder("utf-8");
        const jsonString = decoder.decode(new Uint8Array(postsResponse.data));
        const parsedData = JSON.parse(jsonString);

        console.log("Parsed Posts:", parsedData);

        if (isMounted) {
          setPosts(parsedData.posts);
          setUsers(userResponse.data?.users || []);
        }
      } catch (err) {
        console.error("Fetching error:", err);
        if (err.response?.status === 429) {
          setError("Too many requests. Please try again later.");
        } else {
          setError("Error fetching data.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to avoid memory leaks
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/home");
    }
  }, [location.pathname, navigate]);

  if (loading)
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  const tabs = [
    { name: "Home", path: "/dashboard/home", icon: Home },
    { name: "Search", path: "/dashboard/search", icon: Search },
    { name: "Create", path: "/dashboard/create", icon: PlusSquare },
    { name: "Profile", path: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 bg-[url(https://images.unsplash.com/photo-1589264110781-1ebfa05f901e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxpZ2h0JTIwYmx1ZSUyMGJhY2tncm91bmQlMjBpbWd8ZW58MHx8MHx8fDA%3D)] bg-cover">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col w-64 p-5 bg-white shadow-lg min-h-screen">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition ${
              location.pathname === tab.path
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <tab.icon className="w-6 h-6" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 md:max-w-3xl mx-auto w-full">
        <Outlet context={{ posts, users }} />
      </div>

      {/* ✅ Bottom Navbar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around py-3 border-t border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center text-sm transition ${
              location.pathname === tab.path ? "text-blue-500" : "text-gray-700"
            }`}
          >
            <tab.icon className="w-6 h-6" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

