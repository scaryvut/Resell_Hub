"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

export default function SuccessStories() {
  const stories = [
    {
      name: "Rahim Uddin",
      role: "Seller",
      story:
        "I started with zero experience. Within 2 months on ResellHub, I built a stable income selling electronics.",
      rating: 5,
    },
    {
      name: "Nusrat Jahan",
      role: "Buyer",
      story:
        "I found quality furniture at half the market price. The experience was smooth and secure.",
      rating: 5,
    },
    {
      name: "Arif Hasan",
      role: "Seller",
      story:
        "ResellHub helped me turn my small shop into a full online business with consistent sales.",
      rating: 5,
    },
    {
      name: "Mehedi Hasan",
      role: "Buyer",
      story:
        "Very trustworthy platform. I’ve bought multiple items without any issues.",
      rating: 4,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Success Stories
          </h2>

          <p className="text-gray-500 mt-2">
            Real experiences from buyers and sellers on ResellHub
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          {stories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-xl transition"
            >

              {/* Role */}
              <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                {item.role}
              </span>

              {/* Story */}
              <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                "{item.story}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mt-4 text-yellow-400">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Name */}
              <h4 className="mt-3 font-semibold text-gray-800">
                {item.name}
              </h4>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}