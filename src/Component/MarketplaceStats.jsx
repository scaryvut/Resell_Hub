"use client";

import { motion } from "framer-motion";

export default function MarketplaceStats() {
  const stats = [
    {
      label: "Total Products",
      value: "12,500+",
    },
    {
      label: "Total Sellers",
      value: "3,200+",
    },
    {
      label: "Total Buyers",
      value: "18,400+",
    },
    {
      label: "Completed Orders",
      value: "25,000+",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Marketplace Statistics
          </h2>

          <p className="text-gray-500 mt-2">
            Real-time growth of the ResellHub ecosystem
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow p-6 text-center"
            >

              <h3 className="text-3xl font-bold text-blue-600">
                {item.value}
              </h3>

              <p className="text-gray-600 mt-2">
                {item.label}
              </p>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}