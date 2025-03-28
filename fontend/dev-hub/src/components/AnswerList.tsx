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
  downvotes: { length: number };
  upvotes: { length: number };
}

export default function AnswerList({ questionId }: { questionId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { answers } = useSelector((state: RootState) => state.answers);
 

  useEffect(() => {
    dispatch(fetchAnswers(questionId));
  }, [dispatch, questionId]);

  return (
    <div className="mt-5">
      <h3 className="text-lg font-bold mb-2">Answers</h3>
      {answers.map((answer: Answer) => (
        <div key={answer._id} className="p-3 bg-teal-800 rounded-lg mb-2">
          <p className="whitespace-pre-line"> {answer.text}</p>
          <small className="text-gray-500">— {answer.user.username}</small>
          <div className="mt-2 flex items-center space-x-2">
            <button
              onClick={() => dispatch(upvoteAnswer(answer._id))}
              className="text-green-500"
            >
              👍 {answer.upvotes.length}
            </button>
            <button
              onClick={() => dispatch(downvoteAnswer(answer._id))}
              className="text-red-500"
            >
              👎 {answer?.downvotes.length}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
