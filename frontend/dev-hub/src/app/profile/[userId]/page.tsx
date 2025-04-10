"use client";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "@/redux/userSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import EditProfile from "@/components/EditProfile";

export default function UserProfile() {
  const params = useParams();
  const userId = params.userId as string;

  const dispatch = useDispatch<AppDispatch>();
  const { user, questions, answers } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (userId) dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4 sm:p-6 bg-teal-900 min-h-screen rounded-lg max-w-4xl mx-auto text-white">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">{user.username}</h2>
        <p className="text-gray-300">{user.email}</p>
        <EditProfile />
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
          My Questions & Answers
        </h3>

        {questions.map((q) => {
          const relatedAnswers = answers.filter(
            (a) => a.question?._id === q._id
          );

          return (
            <div
              key={q._id}
              className="p-4 bg-gray-800 rounded-lg shadow-md mb-6"
            >
              <p className="text-lg font-semibold mb-1 text-white">
                Q: {q.title}
              </p>
              {q.description && (
                <div
                  className="prose prose-invert max-w-none text-gray-100 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: q.description }}
                />
              )}

              <h4 className="text-gray-200 font-medium mt-2 mb-1">
                Answers ({relatedAnswers.length}):
              </h4>

              {relatedAnswers.length > 0 ? (
                <div className="ml-4 space-y-3">
                  {relatedAnswers.map((a) => (
                    <div
                      key={a._id}
                      className="bg-gray-900 rounded-md p-3 shadow-sm"
                    >
                      <p className="text-sm text-gray-400 mb-1">
                        Answered by:{" "}
                        <span className="text-white font-medium">
                          {a.user?.username}
                        </span>
                      </p>
                      <div
                        className="prose prose-invert max-w-none text-gray-300 whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: a.text }}
                      />
                    </div>
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
