"use client";

import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-blue-600 text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Contact Us
        </h1>

        <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
          Have questions or need support? We’re here to help you 24/7.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Get in Touch
          </h2>

          <p className="text-gray-600 mt-3">
            Reach out to us anytime. We usually respond within a few hours.
          </p>

          <div className="mt-8 space-y-5 text-gray-600">

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-600" />
              Dhaka, Bangladesh
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="text-blue-600" />
              +880 1XXXXXXXXX
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
              support@resellhub.com
            </div>

          </div>

          {/* Extra Trust Block */}
          <div className="mt-10 bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold text-gray-800">
              Why contact us?
            </h3>

            <ul className="text-sm text-gray-600 mt-3 space-y-2">
              <li>✔ Account & login issues</li>
              <li>✔ Seller verification support</li>
              <li>✔ Payment & transaction help</li>
              <li>✔ Technical issues</li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-xl p-6">

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <FaPaperPlane />
              Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}