"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminOrders() {
  // 🔴 Fake data (replace with API later)
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      buyer: "Rahim",
      product: "iPhone 13",
      amount: 85000,
      status: "Pending",
    },
    {
      id: "ORD-1002",
      buyer: "Karim",
      product: "MacBook Pro",
      amount: 180000,
      status: "Shipped",
    },
    {
      id: "ORD-1003",
      buyer: "Sadia",
      product: "AirPods",
      amount: 20000,
      status: "Delivered",
    },
    {
      id: "ORD-1004",
      buyer: "Nusrat",
      product: "Gaming Chair",
      amount: 45000,
      status: "Disputed",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: newStatus } : o
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Disputed":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        Manage Orders
      </h1>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        {/* TABLE HEAD */}
        <div className="grid grid-cols-6 p-4 bg-gray-50 font-semibold text-gray-600 text-sm">
          <div>Order ID</div>
          <div>Buyer</div>
          <div>Product</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {/* ROWS */}
        {orders.map((order) => (
          <motion.div
            key={order.id}
            whileHover={{ backgroundColor: "#f9fafb" }}
            className="grid grid-cols-6 p-4 items-center border-t text-sm"
          >
            <div className="font-medium">{order.id}</div>

            <div>{order.buyer}</div>

            <div className="text-gray-600">
              {order.product}
            </div>

            <div className="font-semibold">
              ৳ {order.amount}
            </div>

            {/* STATUS */}
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-2">

              <button
                onClick={() => updateStatus(order.id, "Shipped")}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
              >
                Ship
              </button>

              <button
                onClick={() => updateStatus(order.id, "Delivered")}
                className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
              >
                Deliver
              </button>

              <button
                onClick={() => updateStatus(order.id, "Cancelled")}
                className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => updateStatus(order.id, "Disputed")}
                className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded"
              >
                Dispute
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}