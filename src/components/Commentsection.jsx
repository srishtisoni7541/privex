// import React, { useState } from "react";
// import { Heart, Send, Trash } from "lucide-react";

// const CommentSection = ({ user = {} }) => {
//   const [comments, setComments] = useState([
//     { _id: "1", userId: { _id: "123", username: "Alice" }, text: "Nice post!", likes: [] },
//     { _id: "2", userId: { _id: "456", username: "Bob" }, text: "Great work!", likes: ["123"] },
//   ]);
//   const [newComment, setNewComment] = useState("");

//   const handleAddComment = () => {
//     if (!newComment.trim()) return;
//     const newComm = {
//       _id: Date.now().toString(),
//       userId: { _id: user?._id || "guest", username: user?.username || "Guest" },
//       text: newComment,
//       likes: [],
//     };
//     setComments((prev) => [...prev, newComm]);
//     setNewComment("");
//   };

//   const handleDeleteComment = (commentId) => {
//     if (!window.confirm("Delete this comment?")) return;
//     setComments((prev) => prev.filter((comment) => comment._id !== commentId));
//   };

//   const handleLikeComment = (commentId) => {
//     setComments((prev) =>
//       prev.map((comment) =>
//         comment._id === commentId
//           ? {
//               ...comment,
//               likes: comment.likes.includes(user?._id)
//                 ? comment.likes.filter((id) => id !== user?._id)
//                 : [...comment.likes, user?._id],
//             }
//           : comment
//       )
//     );
//   };

//   return (
//     <div>
//       {comments.map((comment) => (
//         <div key={comment._id} className="flex items-center gap-2 border-b py-2">
//           <p>
//             <strong>{comment.userId.username}:</strong> {comment.text}
//           </p>
//           <button onClick={() => handleLikeComment(comment._id)}>
//             <Heart />
//           </button>
//           <span>{comment.likes.length}</span>
//           {comment.userId._id === user?._id && (
//             <button onClick={() => handleDeleteComment(comment._id)}>
//               <Trash />
//             </button>
//           )}
//         </div>
//       ))}
//       <input value={newComment} onChange={(e) => setNewComment(e.target.value)} />
//       <button onClick={handleAddComment}>
//         <Send />
//       </button>
//     </div>
//   );
// };

// export default CommentSection;



import React from "react";

const comments = [
  {
    id: 1,
    username: "avanindra_shankar",
    comment: "Amrish Puri Sahab and Kajol 😂",
    likes: 40,
    time: "6w",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    username: "ankita_yaduvanshi_2003",
    comment: "Amrishpuri 😂😂😂😂😂",
    likes: 77,
    time: "6w",
    avatar: "https://via.placeholder.com/50",
  },
  // Add more comments as needed
];

const CommentSection = () => {
  return (
    <div className="bg-black text-white p-4 w-full max-w-md mx-auto rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start gap-3 mb-4">
          <img src={comment.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{comment.username}</span>
              <span className="text-xs text-gray-400">{comment.time}</span>
            </div>
            <p className="text-sm mt-1">{comment.comment}</p>
            <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
              <span className="cursor-pointer">❤️ {comment.likes}</span>
              <span className="cursor-pointer">Reply</span>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full bg-gray-800 text-white p-2 rounded-lg text-sm focus:outline-none"
        />
        <button className="text-blue-500 text-sm">Post</button>
      </div>
    </div>
  );
};

export default CommentSection;


