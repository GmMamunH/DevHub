import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAnswer } from "@/redux/answerSlice";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";

export default function AnswerForm({ questionId }: { questionId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(postAnswer({ questionId, text }));

      toast.success("Answer posted successfully!"); // ✅ Notification দেখাও
      setText("");
    } catch (error) {
      toast.error("Failed to post answer!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="border p-2 w-full mb-3 h-36"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your answer..."
        required
      ></textarea>
      <button className="bg-green-500 text-white px-4 py-2">
        Submit Answer
      </button>
    </form>
  );
}
