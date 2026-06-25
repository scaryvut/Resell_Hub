"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import {
  FaShoppingBag,
  FaHeart,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function BuyerDashboard() {
  const userEmail = "buyer@test.com";

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersRes, wishlistRes] = await Promise.all([
          fetch(`http://localhost:5000/orders/${userEmail}`),
          fetch(`http://localhost:5000/wishlist/${userEmail}`),
        ]);

        const orders = await ordersRes.json();
        const wishlist = await wishlistRes.json();

        setStats({
          totalOrders: orders.length,
          wishlist: wishlist.length,
          delivered: orders.filter(
            (o) => o.status === "delivered"
          ).length,
          pending: orders.filter(
            (o) => o.status === "pending"
          ).length,
          recentOrders: orders.slice(0, 5),
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <RotateLoader color="#2563eb" />
      </div>
    );
  }

  const cards = [
    {
      title: "My Orders",
      value: stats.totalOrders,
      icon: <FaShoppingBag />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Wishlist",
      value: stats.wishlist,
      icon: <FaHeart />,
      color: "from-pink-500 to-red-500",
    },
    {
      title: "Delivered",
      value: stats.delivered,
      icon: <FaCheckCircle />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      color: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        Buyer Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className={`bg-gradient-to-r ${card.color} text-white rounded-2xl p-6 shadow`}
          >
            <div className="flex justify-between">
              <div>
                <p>{card.title}</p>
                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div className="text-4xl">
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow border">
        <div className="p-5 border-b">
          <h2 className="font-bold text-xl">
            Recent Orders
          </h2>
        </div>

        {stats.recentOrders.map((order) => (
          <div
            key={order._id}
            className="p-4 border-b"
          >
            {order.productTitle}
          </div>
        ))}
      </div>
    </div>
  );
}