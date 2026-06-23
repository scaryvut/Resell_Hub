"use client";

import { motion } from "framer-motion";
import { FaStar, FaCheckCircle } from "react-icons/fa";

export default function TrustedSellers() {
  const sellers = [
    {
      name: "Rahim Electronics",
      rating: 4.9,
      sales: "1.2k+ Sales",
      verified: true,
    },
    {
      name: "Smart Fashion BD",
      rating: 4.8,
      sales: "980+ Sales",
      verified: true,
    },
    {
      name: "Dhaka Motors",
      rating: 4.7,
      sales: "750+ Sales",
      verified: true,
    },
    {
      name: "Home Comfort Store",
      rating: 4.9,
      sales: "1.5k+ Sales",
      verified: true,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Trusted Sellers
          </h2>

          <p className="text-gray-500 mt-2">
            Verified and top-rated sellers in the ResellHub marketplace
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          {sellers.map((seller, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              whileHover={{
                scale: 1.05,
                y: -6,
              }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl border border-gray-100"
            >

              {/* Avatar Placeholder */}
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                {seller.name.charAt(0)}
              </div>

              {/* Name + Verified */}
              <div className="flex items-center gap-2 mt-4">
                <h3 className="font-semibold text-gray-800">
                  {seller.name}
                </h3>

                {seller.verified && (
                  <FaCheckCircle className="text-green-500 text-sm" />
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2 text-yellow-400">
                <FaStar />
                <span className="text-sm text-gray-600 ml-1">
                  {seller.rating}
                </span>
              </div>

              {/* Sales */}
              <p className="text-sm text-gray-500 mt-1">
                {seller.sales}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}