import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAnswer } from "@/redux/answerSlice";
import { AppDispatch } from "@/redux/store";

export default function AnswerForm({ questionId }: { questionId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(postAnswer({ questionId, text }));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="border p-2 w-full mb-3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your answer..."
      ></textarea>
      <button className="bg-green-500 text-white px-4 py-2">
        Submit Answer
      </button>
    </form>
  );
}
