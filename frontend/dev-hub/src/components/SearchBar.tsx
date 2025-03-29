"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchQuestions, resetSearchResults } from "@/redux/questionSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() !== "" || category !== "") {
        dispatch(searchQuestions({ query, category }));
        router.push("/");
      } else {
        dispatch(resetSearchResults());
        router.push("/");
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [query, category, dispatch, router]);

  return (
    <div className="flex space-x-2 p-2 bg-teal-800 rounded-lg">
      <input
        type="text"
        placeholder="Search questions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded-lg flex-1"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded-lg bg-teal-800"
      >
        <option value="">All Categories</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node.js">Node.js</option>
      </select>
    </div>
  );
}
