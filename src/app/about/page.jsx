"use client";

import { motion } from "framer-motion";
import {
  FaRecycle,
  FaLeaf,
  FaGlobeAsia,
  FaShoppingBag,
} from "react-icons/fa";

export default function About() {
  const sections = [
    {
      icon: <FaShoppingBag />,
      title: "What is ResellHub?",
      desc: "ResellHub is a modern marketplace where users can buy and sell used or unused products easily. Instead of letting items sit idle or go to waste, we give them a second life through simple, secure trading.",
    },
    {
      icon: <FaRecycle />,
      title: "Why Recycling Matters",
      desc: "Every year, millions of tons of usable products are discarded. Recycling and reselling reduce landfill waste, save resources, and lower environmental pollution. One reused item means one less burden on the planet.",
    },
    {
      icon: <FaLeaf />,
      title: "Building a Sustainable Future",
      desc: "Sustainability is not a choice anymore — it is a necessity. By encouraging reuse and resale, we reduce manufacturing demand and energy consumption, helping preserve natural ecosystems.",
    },
    {
      icon: <FaGlobeAsia />,
      title: "A Small Step, A Big Impact",
      desc: "If every person reuses just a few products instead of buying new ones, the collective impact becomes massive. ResellHub aims to turn small individual actions into global environmental change.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 py-16 px-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <h1 className="text-5xl font-bold text-gray-800">
          About ResellHub
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          A marketplace built not just for buying and selling —
          but for saving resources and shaping a sustainable future.
        </p>
      </motion.div>

      {/* BLOG SECTIONS */}
      <div className="max-w-5xl mx-auto space-y-8">

        {sections.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4 mb-3 text-blue-600 text-2xl">
              {item.icon}
              <h2 className="text-2xl font-bold text-gray-800">
                {item.title}
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* FINAL MESSAGE */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mt-16 max-w-2xl mx-auto"
      >
        <p className="text-xl text-gray-700 font-medium">
          “The future is not about producing more — it is about reusing better.”
        </p>

        <p className="text-gray-500 mt-2">
          Join ResellHub and be part of the circular economy revolution.
        </p>
      </motion.div>
    </div>
  );
}