
// import React, { useState, useEffect } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { Home, Search, PlusSquare, User } from "lucide-react";
// import axiosInstance from "../../utils/axios";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [posts, setPosts] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const userResponse = await axiosInstance.get("/users/allUsers");
//         const postsResponse = await axiosInstance.get("/posts/allposts");
//         console.log(postsResponse);

//         setUser(userResponse.data);
//         setPosts(postsResponse.data.posts);
//       } catch (err) {
//         setError("Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ Default Home par navigate karne ke liye
//   useEffect(() => {
//     if (location.pathname === "/dashboard") {
//       navigate("/dashboard/home"); // Home page par redirect
//     }
//   }, [location.pathname, navigate]);

//   if (loading)
//     return <div className="text-center mt-10 text-xl">Loading...</div>;
//   if (error)
//     return <div className="text-center mt-10 text-red-500">{error}</div>;

//   return (
//     <div className="flex min-h-screen bg-[url(https://images.unsplash.com/photo-1589264110781-1ebfa05f901e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxpZ2h0JTIwYmx1ZSUyMGJhY2tncm91bmQlMjBpbWd8ZW58MHx8MHx8fDA%3D)] bg-cover">
//       {/* Sidebar */}
//       <div className="hidden md:flex flex-col w-64 p-4 bg-white shadow-md min-h-screen">
//         {[
//           {
//             name: "Home",
//             path: "/dashboard/home",
//             icon: <Home className="w-6 h-6" />,
//           },
//           {
//             name: "Search",
//             path: "/dashboard/search",
//             icon: <Search className="w-6 h-6" />,
//           },
//           {
//             name: "Create",
//             path: "/dashboard/create",
//             icon: <PlusSquare className="w-6 h-6" />,
//           },
//           {
//             name: "Profile",
//             path: "/dashboard/profile",
//             icon: <User className="w-6 h-6" />,
//           },
//         ].map((tab) => (
//           <button
//             key={tab.path}
//             onClick={() => navigate(tab.path)}
//             className="flex items-center gap-3 p-3 rounded-md text-lg font-medium hover:bg-gray-200 text-gray-700"
//           >
//             {tab.icon}
//             {tab.name}
//           </button>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow p-4 max-w-3xl mx-auto">
//         <Outlet context={{ posts, user }} />{" "}
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userResponse = await axiosInstance.get("/users/allUsers");
        const postsResponse = await axiosInstance.get("/posts/allposts", {
          responseType: "arraybuffer", // API se buffer format me data le rahe hain
        });

        // ✅ Buffer ko Text me Convert kar ke JSON Parse karo
        const decoder = new TextDecoder("utf-8");
        const jsonString = decoder.decode(new Uint8Array(postsResponse.data));
        const parsedData = JSON.parse(jsonString);

        console.log("Parsed Posts:", parsedData);

        setUser(userResponse.data);
        setPosts(parsedData.posts);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Default Home par navigate karne ke liye
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/home"); // Home page par redirect
    }
  }, [location.pathname, navigate]);

  if (loading)
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-[url(https://images.unsplash.com/photo-1589264110781-1ebfa05f901e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxpZ2h0JTIwYmx1ZSUyMGJhY2tncm91bmQlMjBpbWd8ZW58MHx8MHx8fDA%3D)] bg-cover">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 p-4 bg-white shadow-md min-h-screen">
        {[
          {
            name: "Home",
            path: "/dashboard/home",
            icon: <Home className="w-6 h-6" />,
          },
          {
            name: "Search",
            path: "/dashboard/search",
            icon: <Search className="w-6 h-6" />,
          },
          {
            name: "Create",
            path: "/dashboard/create",
            icon: <PlusSquare className="w-6 h-6" />,
          },
          {
            name: "Profile",
            path: "/dashboard/profile",
            icon: <User className="w-6 h-6" />,
          },
        ].map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex items-center gap-3 p-3 rounded-md text-lg font-medium hover:bg-gray-200 text-gray-700"
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 max-w-3xl mx-auto">
        <Outlet context={{ posts, user }} />{" "}
      </div>
    </div>
  );
};

export default Dashboard;
