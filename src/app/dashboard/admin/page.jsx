"use client";

import { motion } from "framer-motion";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
} from "react-icons/fa";

export default function AdminDashboard() {
  // 🔴 Fake Data (replace later with API)
  const stats = {
    users: 1240,
    products: 560,
    orders: 320,
  };

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <FaUsers />,
      color: "blue",
    },
    {
      title: "Total Products",
      value: stats.products,
      icon: <FaBoxOpen />,
      color: "green",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: <FaShoppingCart />,
      color: "purple",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow border"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-gray-500">{card.title}</h2>
              <div className="text-2xl text-gray-600">
                {card.icon}
              </div>
            </div>

            <p className="text-3xl font-bold mt-3">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}