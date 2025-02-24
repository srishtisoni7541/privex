// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axiosInstance from "../../utils/axios";
// import DOMPurify from "dompurify"; // For preventing XSS attacks

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const sanitizedValue = DOMPurify.sanitize(value);
//     setFormData({ ...formData, [name]: sanitizedValue });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!formData.username || !formData.email || !formData.password) {
//       toast.error("All fields are required!");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/auth/register", formData);
//       const userData = response.data;

//       localStorage.setItem("accessToken", userData.accessToken);

//       toast.success(response.data.message || "Registered Successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });

//       setTimeout(() => navigate("/login"), 3000);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed! Try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-cover bg-blue-100 bg-[url(https://images.unsplash.com/photo-1589264110781-1ebfa05f901e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxpZ2h0JTIwYmx1ZSUyMGJhY2tncm91bmQlMjBpbWd8ZW58MHx8MHx8fDA%3D)]">
//       <div className="w-[70vw] p-10 h-[40vw] rounded-md shadow-2xl flex">
//         <div className="logo w-[500px] h-[69vh]">
//           <h1 className="text-9xl ml-24 mt-4 text-white">ₚᵣᵢᵥₑₓ</h1>
//           <h5 className="mt-10 ml-30 text-4xl text-white text-center w-[150px]">
//             Yₒᵤᵣ ₚᵣᵢᵥₐₜₑ ₛₒcᵢₐₗ ₛₚₐcₑ ₜₒ cₒₙₙₑcₜ
//           </h5>
//         </div>
//         <div className="p-8 text-white shadow-xl w-96">
//           <h2 className="text-2xl font-bold text-center text-white mb-4">Register</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-white">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-600 rounded mt-1 focus:ring-2 focus:ring-blue-400"
//                 required
//                 minLength={3}
//                 maxLength={20}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-white">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-600 rounded mt-1 focus:ring-2 focus:ring-blue-400"
//                 required
//                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-white">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-600 rounded mt-1 focus:ring-2 focus:ring-blue-400"
//                 required
//                 minLength={8}
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-600 transition"
//               disabled={loading}
//             >
//               {loading ? "Registering..." : "Register"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../utils/axios";
import DOMPurify from "dompurify"; // For preventing XSS attacks

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register", formData);
      const userData = response.data;

      localStorage.setItem("accessToken", userData.accessToken);

      toast.success(response.data.message || "Registered Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed! Try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-blue-100 px-4 bg-[url(https://images.unsplash.com/photo-1589264110781-1ebfa05f901e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxpZ2h0JTIwYmx1ZSUyMGJhY2tncm91bmQlMjBpbWd8ZW58MHx8MHx8fDA%3D)] ">
      <div className="w-full max-w-3xl p-6 rounded-md shadow-2xl flex flex-col md:flex-row  gap-6">
        {/* Left Section (Logo & Tagline) */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          <h1 className="text-6xl md:text-9xl text-white font-bold">ₚᵣᵢᵥₑₓ</h1>
          <h5 className="mt-6 text-xl md:text-2xl text-white w-3/4">
            Yₒᵤᵣ ₚᵣᵢᵥₐₜₑ ₛₒcᵢₐₗ ₛₚₐcₑ ₜₒ cₒₙₙₑcₜ
          </h5>
        </div>

        {/* Right Section (Register Form) */}
        <div className="w-full md:w-1/2 p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold text-center text-white mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-100 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                required
                minLength={3}
                maxLength={20}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-100 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-100 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                required
                minLength={8}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
