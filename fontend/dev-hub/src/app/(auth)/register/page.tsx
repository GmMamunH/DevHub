"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Register() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // যদি ইউজার লগইন থাকে, তাহলে তাকে হোমপেজে পাঠানো হবে
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      router.push("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-teal-800 p-6 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4 text-sky-800">Register</h2>
        <input
          className="border p-2 w-full mb-3"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
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
          Register
        </button>
      </form>
    </div>
  );
}
