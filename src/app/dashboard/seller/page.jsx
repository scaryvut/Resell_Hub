"use client";

import { motion } from "framer-motion";

export default function SellerDashboard() {
  const stats = [
    { title: "Total Products", value: 24 },
    { title: "Total Sales", value: 128 },
    { title: "Total Revenue", value: "$4,560" },
    { title: "Pending Orders", value: 7 },
  ];

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Seller Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {stats.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -5 }}
            className="p-5 bg-white rounded-xl shadow border"
          >
            <p className="text-gray-500">{item.title}</p>
            <h2 className="text-2xl font-bold mt-2">
              {item.value}
            </h2>
          </motion.div>
        ))}

      </div>
    </div>
  );
}