// src/pages/Feedback.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import left from "../assets/left.png";

export default function Feedback() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "issue", // default option
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.type || !form.message) {
    setError(" Please fill in all fields before submitting.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setSubmitted(true);
      setForm({ name: "", email: "", type: "issue", message: "" });
    } else {
      setError("Failed to submit feedback. Try again later.");
    }
  } catch (err) {
    console.error("Error submitting feedback:", err);
    setError(" Server error. Try again later.");
  }
};


  if (submitted) {
    return (
      <div className="min-h-screen bg-[#011313] flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">Thanks for your feedback!</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-[#4C9F38] px-6 py-3 rounded-full text-lg hover:opacity-80"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <div className="items-center px-6 pt-2 mb-0 text-white font-tenor">
        <button onClick={() => navigate("/")} className="flex flex-row items-center">
          <img src={left} alt="Left" className="w-[50px]" />
          <p className="font-tenor text-white tracking-wide text-lg">Home</p>
        </button>
      </div>

      {/* Form */}
      <div className="bg-[#011313] flex items-center justify-center px-6 pt-0">
        <form
          onSubmit={handleSubmit}
          className="bg-[#022222] p-8 rounded-2xl shadow-lg w-full max-w-lg text-white"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">Feedback Form</h1>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <label className="block mb-3">
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-md bg-[#033333] border border-gray-600 focus:outline-none focus:border-[#4C9F38]"
            />
          </label>

          <label className="block mb-3">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-md bg-[#033333] border border-gray-600 focus:outline-none focus:border-[#4C9F38]"
            />
          </label>

          <label className="block mb-3">
            Feedback Type
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-md bg-[#033333] border border-gray-600 focus:outline-none focus:border-[#4C9F38]"
            >
              <option value="issue">Report an Issue</option>
              <option value="feedback">General Feedback</option>
              <option value="request">Request a Product</option>
            </select>
          </label>

          <label className="block mb-3">
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full mt-1 px-4 py-2 rounded-md bg-[#033333] border border-gray-600 focus:outline-none focus:border-[#4C9F38]"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-[#4C9F38] py-3 rounded-full mt-4 font-bold hover:opacity-80"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
