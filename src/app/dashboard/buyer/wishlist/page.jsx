"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const userEmail = "buyer@test.com";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/wishlist/${userEmail}`)
      .then((res) => res.json())
      .then(setWishlist);

    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const getProduct = (id) =>
    products.find((p) => p._id === id);

  const handleRemove = async (id) => {
    try {
      await fetch(`http://localhost:5000/wishlist/${id}`, {
        method: "DELETE",
      });

      // instant UI update
      setWishlist((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Your Wishlist
        </h1>
        <p className="text-gray-500">
          Saved items ready for purchase
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <AnimatePresence>
          {wishlist.map((w) => {
            const product = getProduct(w.productId);

            return (
              <motion.div
                key={w._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* IMAGE */}
                <img
                  src={
                    product?.images?.[0] ||
                    "/default-product.png"
                  }
                  className="h-40 w-full object-cover"
                />

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="font-bold text-lg">
                    {product?.title || "Loading..."}
                  </h3>

                  <p className="text-green-600 font-semibold mt-1">
                    {product?.price
                      ? `৳ ${product.price}`
                      : ""}
                  </p>

                  <button
                    onClick={() => handleRemove(w._id)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* EMPTY STATE */}
      {wishlist.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          Your wishlist is empty
        </div>
      )}
    </div>
  );
}