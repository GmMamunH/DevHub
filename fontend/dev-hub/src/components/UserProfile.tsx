"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "@/redux/userSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { user, questions, answers, loading, error } = useSelector(
    (state: RootState) => state.user
  );

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchUserProfile(userId));
//     }
//   }, [dispatch, userId]);
useEffect(() => {
  if (userId) {
    console.log(`Fetching data for userId: ${userId}`);
    dispatch(fetchUserProfile(userId));
  }
}, [dispatch, userId]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!user) return <p>User not found</p>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold">{user.username}</h2>
      <p className="text-gray-600">{user.email}</p>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">My Questions</h3>
        {questions.map((q) => (
          <div key={q._id} className="p-3 bg-white rounded-lg shadow-sm mt-2">
            <p>{q.title}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">My Answers</h3>
        {answers.map((a) => (
          <div key={a._id} className="p-3 bg-white rounded-lg shadow-sm mt-2">
            <p>{a.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
