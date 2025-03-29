import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAnswers,
  upvoteAnswer,
  downvoteAnswer,
} from "@/redux/answerSlice";
import { RootState, AppDispatch } from "@/redux/store";

interface Answer {
  _id: string;
  text: string;
  user: { username: string };
  upvotes: { length: number };
  downvotes: { length: number };
}

export default function AnswerList({ questionId }: { questionId: string }) {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Redux state থেকে data, loading & error নেওয়া
  const { answers, loading, error } = useSelector(
    (state: RootState) => state.answers
  );

  useEffect(() => {
    dispatch(fetchAnswers(questionId));
  }, [dispatch, questionId]);

  return (
    <div className="mt-5">
      <h3 className="text-lg font-bold mb-2">Answers</h3>

      {/* ✅ লোডিং থাকলে মেসেজ দেখাবে */}
      {loading && <p className="text-yellow-400">Loading answers...</p>}

      {/* ✅ কোনো এরর থাকলে দেখাবে */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* ✅ উত্তর না থাকলে মেসেজ দেখাবে */}
      {!answers.length && !loading && (
        <p className="text-gray-500">No answers yet. Be the first to answer!</p>
      )}

      {/* ✅ উত্তর গুলো লুপ করে দেখানো */}
      {answers.map((answer: Answer) => (
        <div
          key={answer._id}
          className="p-3 bg-gray-800 text-white rounded-lg mb-2 shadow-lg"
        >
          <p className="whitespace-pre-line text-base">{answer.text}</p>
          <small className="text-gray-400">— {answer.user.username}</small>
          <div className="mt-2 flex items-center space-x-4">
            <button
              onClick={() => dispatch(upvoteAnswer(answer._id))}
              className="text-green-400 hover:text-green-500 transition"
            >
              👍 {answer.upvotes.length}
            </button>
            <button
              onClick={() => dispatch(downvoteAnswer(answer._id))}
              className="text-red-400 hover:text-red-500 transition"
            >
              👎 {answer.downvotes.length}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
