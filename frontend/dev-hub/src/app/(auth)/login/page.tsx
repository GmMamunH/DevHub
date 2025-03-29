"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // যদি ইউজার লগইন থাকে, তাহলে তাকে হোমপেজে পাঠানো হবে
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-teal-800 p-6 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          className="border p-2 w-full mb-3"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full mb-3"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white px-4 py-2 w-full">
          Login
        </button>
        <div>
          <Link href="/register">Create Account</Link>
        </div>
      </form>
    </div>
  );
}
