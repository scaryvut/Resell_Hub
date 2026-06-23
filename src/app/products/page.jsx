"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const getImage = (p) => p?.images?.[0] || "/default-product.png";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Discover Products
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={getImage(p)}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold">{p.title}</h2>
              <p className="text-gray-500">{p.category}</p>

              <p className="text-green-600 font-bold mt-2">
                ৳ {p.price}
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`/products/${p._id}`)}
                className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}