"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import { toast } from "react-toastify";

const getImage = (p) =>
  p?.images?.[0] || "/default-product.png";

export default function ProductDetails() {
  const { id } = useParams();

  const { data: session, isPending } =
    useSession();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const user = {
    email: session?.user?.email,
    role:
      session?.user?.role?.toLowerCase() ||
      "buyer",
  };

  // FETCH PRODUCT
  useEffect(() => {
    setLoading(true);

    fetch(
      `http://localhost:5000/products/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error(
          "Failed to load product"
        );
      });
  }, [id]);

  // BUY / WISHLIST
  const handleAction = async (
    type
  ) => {
    if (!session?.user) {
      toast.error(
        "Please login first"
      );
      return;
    }

    if (user.role !== "buyer") {
      toast.error(
        "Only Buyers can place orders or add wishlist"
      );
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
            productTitle:
              product.title,
            productPrice:
              product.price,
            buyerEmail:
              user.email,
            role: user.role,
            status: "pending",
            createdAt:
              new Date(),
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.message
        );
      }

      toast.success(
        type === "orders"
          ? "Order placed successfully"
          : "Added to wishlist"
      );
    } catch (err) {
      toast.error(
        err.message ||
          "Something went wrong"
      );
    }
  };

  // LOADING
  if (
    loading ||
    isPending
  ) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <RotateLoader color="#2563eb" />

        <p className="mt-4 text-gray-500">
          Loading product...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        Product Not Found
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="grid md:grid-cols-2 gap-10 bg-white shadow-2xl rounded-2xl overflow-hidden">

        {/* IMAGE */}
        <motion.img
          whileHover={{
            scale: 1.05,
          }}
          src={getImage(product)}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        {/* DETAILS */}
        <div className="p-6 space-y-4">

          <div>
            <h1 className="text-3xl font-bold">
              {product.title}
            </h1>

            <p className="text-gray-500">
              Category:
              {" "}
              {product.category}
            </p>

            <p className="mt-4 text-gray-700">
              {
                product.description
              }
            </p>

            <p className="text-3xl font-bold text-green-600 mt-6">
              ৳ {product.price}
            </p>
          </div>

          {/* SELLER */}
          <div className="bg-gray-100 p-4 rounded-xl">
            <h2 className="text-lg font-bold mb-2">
              Seller Information
            </h2>

            <p>
              <span className="font-semibold">
                Name:
              </span>
              {" "}
              {product.seller
                ?.name ||
                "Unknown"}
            </p>

            <p>
              <span className="font-semibold">
                Email:
              </span>
              {" "}
              {product.seller
                ?.email ||
                "Not Available"}
            </p>
          </div>

          {/* USER ROLE INFO */}
          {session?.user && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              Logged in as:
              {" "}
              <span className="font-semibold">
                {
                  session.user
                    .name
                }
              </span>
              {" "}
              (
              {
                user.role
              }
              )
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">

            <motion.button
              whileTap={{
                scale: 0.95,
              }}
              disabled={
                user.role !==
                "buyer"
              }
              onClick={() =>
                handleAction(
                  "orders"
                )
              }
              className={`w-full px-5 py-3 rounded-xl text-white font-semibold transition ${
                user.role ===
                "buyer"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Buy Now
            </motion.button>

            <motion.button
              whileTap={{
                scale: 0.95,
              }}
              disabled={
                user.role !==
                "buyer"
              }
              onClick={() =>
                handleAction(
                  "wishlist"
                )
              }
              className={`w-full px-5 py-3 rounded-xl text-white font-semibold transition ${
                user.role ===
                "buyer"
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Wishlist
            </motion.button>

          </div>

          {user.role !==
            "buyer" && (
            <p className="text-red-500 text-sm text-center">
              Only buyers can
              purchase products or
              add items to wishlist.
            </p>
          )}

        </div>
      </div>
    </motion.div>
  );
}