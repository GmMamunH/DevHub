import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "@/redux/userSlice";
import { RootState, AppDispatch } from "@/redux/store";

export default function EditProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || ""
  );

  const handleUpdate = () => {
    dispatch(
      updateUserProfile({ userId: user?._id, username, email, profilePicture })
    );
  };

  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow">
      <h2 className="text-xl font-bold">Edit Profile</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border p-2 w-full mt-2 rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 w-full mt-2 rounded"
      />
      <input
        type="text"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
        placeholder="Profile Picture URL"
        className="border p-2 w-full mt-2 rounded"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white p-2 mt-2 rounded"
      >
        Update Profile
      </button>
    </div>
  );
}
