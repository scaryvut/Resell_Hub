"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/users"),
      fetch("http://localhost:5000/products"),
      fetch("http://localhost:5000/orders"),
    ])
      .then(async ([users, products, orders]) => {
        const usersData = await users.json();
        const productsData = await products.json();
        const ordersData = await orders.json();

        setStats({
          users: usersData.length || 0,
          products: productsData.length || 0,
          orders: ordersData.length || 0,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <FaUsers />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Products",
      value: stats.products,
      icon: <FaBoxOpen />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: <FaShoppingCart />,
      color: "from-purple-500 to-pink-500",
    },
  ];

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col justify-center items-center">
        <RotateLoader color="#2563eb" />
        <p className="mt-4 text-gray-500">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor users, products and orders
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-3xl shadow-xl`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80">
                  {card.title}
                </p>

                <h2 className="text-5xl font-bold mt-3">
                  {card.value}
                </h2>
              </div>

              <div className="text-5xl opacity-80">
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-3xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-3">
          Platform Overview
        </h2>

        <p className="text-gray-600 leading-7">
          This dashboard provides complete visibility
          over ResellHub activities. Administrators can
          manage users, moderate products, monitor
          orders, and track platform performance through
          analytics.
        </p>
      </motion.div>

    </div>
  );
}