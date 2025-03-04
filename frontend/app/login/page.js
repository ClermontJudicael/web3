"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center">Sign in</h2>
        <p className="text-gray-500 text-center mb-4">Sign in to access your account</p>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Enter Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@gmail.com"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700">Enter Your Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <a href="#" className="hover:text-blue-600">Forgot your password?</a>
        </div>
        <p className="text-sm text-center mt-4">
          Don't have an account? <a href="/signup" className="text-blue-600 font-semibold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
