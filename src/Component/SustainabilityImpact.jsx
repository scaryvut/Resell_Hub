"use client";

import { motion } from "framer-motion";
import { FaLeaf, FaRecycle, FaGlobeAmericas } from "react-icons/fa";

export default function SustainabilityImpact() {
  const stats = [
    {
      icon: <FaRecycle />,
      title: "Less Waste",
      desc: "Every reused product reduces landfill waste and extends product life.",
    },
    {
      icon: <FaLeaf />,
      title: "Lower Carbon Footprint",
      desc: "Second-hand buying reduces demand for new production and emissions.",
    },
    {
      icon: <FaGlobeAmericas />,
      title: "Global Impact",
      desc: "Thousands of users collectively contribute to a more sustainable economy.",
    },
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Sustainability Impact
          </h2>

          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Buying and selling second-hand isn’t just smart — it helps protect the planet.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.15,
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl shadow text-center border border-green-100"
            >

              <div className="text-4xl text-green-600 flex justify-center">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mt-4 text-gray-800">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {item.desc}
              </p>

            </motion.div>
          ))}

        </div>

        {/* Footer Impact Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 text-gray-600"
        >
          <p className="text-sm">
            🌍 ResellHub users help reduce waste with every transaction.
          </p>
        </motion.div>

      </div>
    </section>
  );
}