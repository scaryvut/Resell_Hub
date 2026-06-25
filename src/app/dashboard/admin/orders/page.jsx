"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import {
  FaSearch,
  FaTruck,
  FaCheckCircle,
  FaBan,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/orders"
      );

      const data = await res.json();

      setOrders(Array.isArray(data) ? data : []);
      setFilteredOrders(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const result = orders.filter(
      (order) =>
        order.userEmail
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.productTitle
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredOrders(result);
  }, [search, orders]);

  const updateStatus = async (
    id,
    newStatus
  ) => {
    try {
      await fetch(
        `http://localhost:5000/orders/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "disputed":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col justify-center items-center">
        <RotateLoader color="#2563eb" />

        <p className="mt-4 text-gray-500">
          Loading Orders...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-bold">
          Manage Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor and manage all platform
          orders
        </p>
      </motion.div>

      {/* SEARCH */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search order..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full pl-12 p-3 border rounded-xl"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <div className="grid grid-cols-7 bg-gray-50 p-4 font-semibold">
          <div>Buyer</div>
          <div>Product</div>
          <div>Price</div>
          <div>Seller</div>
          <div>Date</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {filteredOrders.map((order) => (
          <motion.div
            key={order._id}
            whileHover={{
              backgroundColor: "#f9fafb",
            }}
            className="grid grid-cols-7 items-center p-4 border-t"
          >
            <div>
              {order.userEmail}
            </div>

            <div>
              {order.productTitle}
            </div>

            <div>
              ৳ {order.price}
            </div>

            <div>
              {order.sellerEmail}
            </div>

            <div>
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </div>

            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex gap-2 flex-wrap">

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "shipped"
                  )
                }
                className="p-2 rounded-lg bg-blue-100 text-blue-700"
                title="Ship"
              >
                <FaTruck />
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "delivered"
                  )
                }
                className="p-2 rounded-lg bg-green-100 text-green-700"
                title="Delivered"
              >
                <FaCheckCircle />
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "cancelled"
                  )
                }
                className="p-2 rounded-lg bg-red-100 text-red-700"
                title="Cancel"
              >
                <FaBan />
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "disputed"
                  )
                }
                className="p-2 rounded-lg bg-purple-100 text-purple-700"
                title="Dispute"
              >
                <FaExclamationTriangle />
              </button>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}