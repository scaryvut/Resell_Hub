"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function SellerOrders() {
  const { data: session, isPending } =
    authClient.useSession();

  const sellerEmail = session?.user?.email;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    if (!sellerEmail) return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/seller-orders/${sellerEmail}`
      );

      const data = await res.json();

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sellerEmail) {
      loadOrders();
    }
  }, [sellerEmail]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/orders/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success(`Order ${status}`);
        loadOrders();
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "accepted":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-indigo-100 text-indigo-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isPending || loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <RotateLoader color="#2563eb" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Manage Orders
        </h1>

        <p className="text-gray-500 mt-1">
          {sellerEmail}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        <div className="grid grid-cols-6 bg-gray-50 p-4 font-semibold text-gray-600">
          <div>Buyer</div>
          <div>Product</div>
          <div>Price</div>
          <div>Status</div>
          <div>Date</div>
          <div>Actions</div>
        </div>

        {orders.map((order) => (
          <motion.div
            key={order._id}
            whileHover={{
              backgroundColor: "#f9fafb",
            }}
            className="grid grid-cols-6 items-center p-4 border-t"
          >
            <div>{order.userEmail}</div>

            <div>
              {order.productTitle || order.title}
            </div>

            <div>
              ৳ {order.price}
            </div>

            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div>
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </div>

            <div className="flex flex-wrap gap-2">

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "accepted"
                  )
                }
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "shipped"
                  )
                }
                className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs"
              >
                Ship
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "delivered"
                  )
                }
                className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
              >
                Deliver
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "cancelled"
                  )
                }
                className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
              >
                Cancel
              </button>

            </div>
          </motion.div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No orders found
          </div>
        )}

      </div>

    </div>
  );
}