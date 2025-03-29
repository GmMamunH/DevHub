"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Next.js 13+ এর জন্য পরিবর্তন
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "@/redux/questionSlice";
import AnswerList from "@/components/AnswerList";
import AnswerForm from "@/components/AnswerForm";
import { RootState, AppDispatch } from "@/redux/store";

// interface Question {
//   _id: string;
//   title: string;
//   description: string;
// }

export default function QuestionDetail() {
  // const router = useRouter();
  const [questionId, setQuestionId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { questions } = useSelector((state: RootState) => state.questions);

  // ✅ Ensure `router.query.id` is set correctly
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const idFromUrl = url.pathname.split("/").pop(); // Get ID from URL
      if (idFromUrl) {
        setQuestionId(idFromUrl);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (!questionId) return <p>Loading...</p>;

  const question = questions.find((q) => q._id === questionId);
  if (!question) return <p>Question not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="p-5 bg-teal-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold">{question.title}</h2>
        <p>{question.description}</p>
      </div>
      <AnswerForm questionId={questionId} />
      <AnswerList questionId={questionId} />
    </div>
  );
}
