"use client";

import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function MyOrders() {
  const userEmail = "buyer@test.com";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- LOAD ORDERS ----------------
  const loadOrders = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/orders/${userEmail}`
      );

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ---------------- STRIPE PAYMENT ----------------
  const handlePayment = async (order) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: order.price,
          orderId: order._id,
          productTitle: order.productTitle,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Payment failed");
      }

      if (data.url) {
        window.location.href = data.url; // redirect to Stripe
      } else {
        throw new Error("Checkout URL missing");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Payment failed");
    }
  };

  // ---------------- CANCEL ORDER ----------------
  const handleCancel = async (id) => {
    try {
      await fetch(`http://localhost:5000/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "cancelled",
        }),
      });

      toast.success("Order cancelled");
      loadOrders();
    } catch (error) {
      console.error(error);
      toast.error("Cancel failed");
    }
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <RotateLoader color="#2563eb" />
      </div>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className="p-6">
      
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-6 p-4 bg-gray-50 font-semibold text-sm">
          <div>Product</div>
          <div>Price</div>
          <div>Status</div>
          <div>Date</div>
          <div>Payment</div>
          <div>Action</div>
        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No Orders Found
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-6 p-4 border-t items-center text-sm"
            >

              {/* PRODUCT */}
              <div className="font-medium text-gray-800">
                {order.productTitle || "Unknown Product"}
              </div>

              {/* PRICE */}
              <div className="text-gray-700">
                ৳ {order.price || 0}
              </div>

              {/* STATUS */}
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status || "pending"}
                </span>
              </div>

              {/* DATE */}
              <div className="text-gray-500">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>

              {/* PAYMENT */}
              <div>
                {order.paymentStatus === "paid" ? (
                  <span className="text-green-600 font-semibold">
                    Paid
                  </span>
                ) : (
                  <button
                    onClick={() => handlePayment(order)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-xs transition"
                  >
                    Pay Now
                  </button>
                )}
              </div>

              {/* ACTION */}
              <div>
                {order.status === "pending" ? (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs transition"
                  >
                    Cancel
                  </button>
                ) : (
                  <span className="text-gray-400 text-xs">
                    —
                  </span>
                )}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}