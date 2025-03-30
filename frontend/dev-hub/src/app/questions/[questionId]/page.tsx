"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "@/redux/questionSlice";
import AnswerList from "@/components/AnswerList";
import AnswerForm from "@/components/AnswerForm";
import { RootState, AppDispatch } from "@/redux/store";
import AnswerEditor from "@/components/AnswerEditor";

interface Question {
  _id: string;
  title: string;
  description: string;
}

export default function QuestionDetail() {
  const [questionId, setQuestionId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { questions } = useSelector((state: RootState) => state.questions) as {
    questions: Question[];
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const idFromUrl = url.pathname.split("/").pop();
      if (idFromUrl) {
        setQuestionId(idFromUrl);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (!questionId) return <p>Loading...</p>;

  const question: Question | undefined = questions.find(
    (q: Question) => q._id === questionId
  );

  if (!question) return <p>Question not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="p-5 bg-teal-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold py-2">{question.title}</h2>
        <p className="whitespace-pre-line text-base">{question.description}</p>
      </div>
      {/* <AnswerForm questionId={questionId} /> */}
      <AnswerEditor questionId={questionId} />
      <AnswerList questionId={questionId} />
    </div>
  );
}
