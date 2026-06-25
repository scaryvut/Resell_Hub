"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { RotateLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function MyOrders() {
  const { data: session, isPending } =
    useSession();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const userEmail =
    session?.user?.email;

  const loadOrders = async () => {
    if (!userEmail) return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/orders/${userEmail}`
      );

      const data = await res.json();

      console.log("Orders:", data);

      setOrders(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userEmail) return;

    loadOrders();
  }, [userEmail]);

  const handlePayment = async (
    order
  ) => {
    try {
      const res = await fetch(
        "/api/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            price: order.price,
            orderId: order._id,
            productTitle:
              order.title,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Payment failed"
        );
      }

      if (data.url) {
        window.location.href =
          data.url;
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
          "Payment failed"
      );
    }
  };

  const handleCancel =
    async (id) => {
      try {
        const res = await fetch(
          `http://localhost:5000/orders/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              orderStatus:
                "cancelled",
            }),
          }
        );

        if (!res.ok) {
          throw new Error();
        }

        toast.success(
          "Order cancelled"
        );

        loadOrders();
      } catch (error) {
        console.error(error);

        toast.error(
          "Cancel failed"
        );
      }
    };

  if (
    loading ||
    isPending
  ) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <RotateLoader color="#2563eb" />
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-2">
        My Orders
      </h1>

      <p className="text-gray-500 mb-6">
        {userEmail}
      </p>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        <div className="grid grid-cols-6 p-4 bg-gray-50 font-semibold">
          <div>Product</div>
          <div>Price</div>
          <div>Status</div>
          <div>Payment</div>
          <div>Order ID</div>
          <div>Action</div>
        </div>

        {orders.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No Orders Found
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-6 p-4 border-t items-center"
            >
              <div className="font-medium">
                {order.title}
              </div>

              <div>
                ৳ {order.price}
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.orderStatus ===
                    "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus ===
                        "processing"
                      ? "bg-blue-100 text-blue-700"
                      : order.orderStatus ===
                        "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div>
                {order.paymentStatus ===
                "paid" ? (
                  <span className="text-green-600 font-semibold">
                    Paid
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      handlePayment(
                        order
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-xs"
                  >
                    Pay Now
                  </button>
                )}
              </div>

              <div className="text-xs text-gray-500">
                {order._id}
              </div>

              <div>
                {order.orderStatus !==
                  "cancelled" &&
                order.orderStatus !==
                  "delivered" ? (
                  <button
                    onClick={() =>
                      handleCancel(
                        order._id
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                ) : (
                  <span className="text-gray-400">
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