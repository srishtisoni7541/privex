import React, { useState } from 'react';

const EditProfile = () => {
  const [username, setUsername] = useState('dummyUser');
  const [bio, setBio] = useState('This is a dummy bio.');
  const [profileImg, setProfileImg] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('bio', bio);
    if (profileImg) {
      formData.append('profileImg', profileImg);
    }

    console.log('Form Data:', {
      username,
      bio,
      profileImg: profileImg ? profileImg.name : 'No image selected',
    });

    try {
      const response = await fetch('/api/users/update-profile', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="p-6 text-white rounded-xl max-w-lg mx-auto mt-6 shadow-xl transition-all hover:shadow-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 text-sm font-medium">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 text-black border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
