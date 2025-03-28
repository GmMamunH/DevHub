"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions } from "@/redux/questionSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Link from "next/link";

interface Question {
  _id: string;
  title: string;
  description: string;
  user: { username: string };
}

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, searchResults, loading } = useSelector(
    (state: RootState) => state.questions
  );

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  // ✅ searchResults থাকলে সেটাই দেখাবে, নাহলে সব questions দেখাবে
  const displayQuestions = searchResults !== null ? searchResults : questions;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Recent Questions
      </h2>

      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : displayQuestions.length === 0 ? (
        <p className="text-center text-gray-300">No questions found.</p>
      ) : (
        displayQuestions.map((question: Question) => (
          <div
            key={question._id}
            className="p-4 bg-teal-800 shadow-lg rounded-lg mb-4 transition hover:scale-105"
          >
            <h3 className="text-lg font-bold text-white">
              {question.title}
              <span className="text-sm text-gray-300 ml-2">
                by {question.user.username}
              </span>
            </h3>
            <p className="text-gray-200">{question.description}</p>

            <Link href={`/questions/${question._id}`}>
              <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                Details
              </button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
