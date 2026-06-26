"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import { toast } from "react-toastify";

const getImage = (p) =>
  p?.images?.[0] || "/default-product.png";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = {
    email: "buyer@test.com",
    role: "buyer",
  };

  // FETCH PRODUCT
  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to load product");
      });
  }, [id]);

  // LOADING UI
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <RotateLoader color="#2563eb" />
        <p className="mt-4 text-gray-500">
          Loading product...
        </p>
      </div>
    );
  }

  const handleAction = async (type) => {
  try {
    const payload =
      type === "orders"
        ? {
            buyerInfo: {
              email: user.email,
              name: "Buyer User",
            },

            sellerInfo: {
              email:
                product.sellerInfo?.email,
              name:
                product.sellerInfo?.name,
            },

            productId: product._id,
            title: product.title,
            price: product.price,
            orderStatus: "pending",
            paymentStatus: "unpaid",
            createdAt: new Date(),
          }
        : {
            userEmail: user.email,
            productId: product._id,
            title: product.title,
            price: product.price,
            createdAt: new Date(),
          };

    const res = await fetch(
      `http://localhost:5000/${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok)
      throw new Error();

    toast.success(
      type === "orders"
        ? "Order placed successfully"
        : "Added to wishlist"
    );
  } catch (err) {
    toast.error(
      "Something went wrong"
    );
  }
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="grid md:grid-cols-2 gap-10 bg-white shadow-2xl rounded-2xl overflow-hidden">

        {/* IMAGE */}
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={getImage(product)}
          className="w-full h-full object-cover"
        />

        {/* DETAILS */}
        <div className="p-6 space-y-4">

          {/* PRODUCT INFO */}
          <div>
            <h1 className="text-3xl font-bold">
              {product.title}
            </h1>

            <p className="text-gray-500">
              Category: {product.category}
            </p>

            <p className="mt-4 text-gray-700">
              {product.description}
            </p>

            <p className="text-3xl font-bold text-green-600 mt-6">
              ৳ {product.price}
            </p>
          </div>

          {/* SELLER INFO */}
          <div className="bg-gray-100 p-4 rounded-xl">
            <h2 className="text-lg font-bold mb-2">
              Seller Information
            </h2>

            <p>
              <span className="font-semibold">
                Name:
              </span>{" "}
              {product.seller?.name || "Unknown"}
            </p>

            <p>
              <span className="font-semibold">
                Email:
              </span>{" "}
              {product.seller?.email ||
                "Not available"}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 pt-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                handleAction("orders")
              }
              className="bg-blue-600 text-white px-5 py-3 rounded-xl w-full"
            >
              Buy Now
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                handleAction("wishlist")
              }
              className="bg-pink-600 text-white px-5 py-3 rounded-xl w-full"
            >
              Wishlist
            </motion.button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}