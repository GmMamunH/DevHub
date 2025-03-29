"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; // ✅ Toastify ইম্পোর্ট করো
import "react-toastify/dist/ReactToastify.css"; // ✅ Toastify স্টাইল ইম্পোর্ট করো
import { postQuestion } from "@/redux/questionSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function AskQuestion() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(postQuestion(formData)).unwrap(); // ✅ API কল সফল হলে
      toast.success("Question posted successfully!"); // ✅ Notification দেখাও
      setFormData({ title: "", description: "" }); // ✅ ইনপুট ফাঁকা করো
      router.push("/");
    } catch (error) {
      toast.error("Failed to post question!"); // ✅ Error হলে নোটিফিকেশন দেখাও
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-teal-800 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-3"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title} // ✅ Input ফাঁকা রাখার জন্য value যুক্ত করো
          onChange={handleChange}
        />
        <textarea
          className="border p-2 w-full mb-3"
          name="description"
          placeholder="Description"
          value={formData.description} // ✅ Input ফাঁকা রাখার জন্য value যুক্ত করো
          onChange={handleChange}
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2">
          Post Question
        </button>
      </form>
    </div>
  );
}
