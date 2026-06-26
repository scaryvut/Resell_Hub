"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaHeart, FaClock } from "react-icons/fa";

const userEmail = "buyer@test.com";

export default function BuyerDashboard() {
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/orders/${userEmail}`)
      .then((r) => r.json())
      .then(setOrders);

    fetch(`http://localhost:5000/wishlist/${userEmail}`)
      .then((r) => r.json())
      .then(setWishlist);
  }, []);

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: <FaShoppingCart />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Wishlist Items",
      value: wishlist.length,
      icon: <FaHeart />,
      color: "from-pink-500 to-red-500",
    },
    {
      title: "Recent Activity",
      value: orders.slice(0, 3).length,
      icon: <FaClock />,
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Buyer Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Track your orders, wishlist, and activity
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r ${item.color}`}
          >
            <div className="flex items-center justify-between">
              <div className="text-3xl opacity-90">
                {item.icon}
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">
                  {item.title}
                </p>
                <p className="text-4xl font-bold">
                  {item.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Optional Insight Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10 bg-white rounded-2xl shadow p-6"
      >
        <h2 className="text-xl font-bold mb-2">
          Quick Insight
        </h2>

        <p className="text-gray-600">
          {orders.length === 0
            ? "You haven't placed any orders yet. Start exploring products."
            : `You are actively shopping with ${orders.length} orders placed.`}
        </p>
      </motion.div>
    </div>
  );
}