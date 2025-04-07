"use client";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "@/redux/userSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function UserProfile() {
  const params = useParams();
  const userId = params.userId as string;

  const dispatch = useDispatch<AppDispatch>();
  const { user, questions, answers } = useSelector(
    (state: RootState) => state.user
  );

  // console.log(answers);
  

  useEffect(() => {
    if (userId) dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-teal-700 rounded-lg">
      <h2 className="text-2xl font-bold">{user.username}</h2>
      <p className="text-gray-300">{user.email}</p>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">My Questions & Answers</h3>
        {questions.map((q) => {
          const relatedAnswers = answers.filter(
            (a) => a.question?._id === q._id
          );
          return (
            <div
              key={q._id}
              className="p-4 bg-gray-700 rounded-lg shadow-sm mt-4"
            >
              <p className="text-white font-semibold">Q: {q.title}</p>

              {relatedAnswers.length > 0 ? (
                <div className="ml-4 mt-2">
                  {relatedAnswers.map((a) => (
                    <p key={a._id} className="text-gray-300">
                      ➤ {a.text}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 ml-4">No answers yet.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
