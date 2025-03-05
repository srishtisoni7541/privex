import React from "react";

const UserPosts = ({ user }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {user.posts.length > 0 ? (
        user.posts.map((post) => (
          <div key={post._id} className="border p-2 rounded-lg shadow-md">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-40 object-cover rounded-lg"
            />
            <p className="text-sm mt-2 text-center">{post.caption}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center col-span-full">
          No posts available
        </p>
      )}
    </div>
  );
};

export default UserPosts;
