"use client";

import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function MyOrders() {
  const userEmail = "buyer@test.com";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const res = await fetch(
        `https://resell-hub-server-six.vercel.app/orders/${userEmail}`
      );

      const data = await res.json();

      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

 const handlePayment = async (order) => {
  try {
    const response = await fetch(
      "/api/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          orderId: order._id,
          title:
            order.productTitle ||
            order.title,
          price: order.price,
        }),
      }
    );

    const data =
      await response.json();

    if (data.url) {
      window.location.href =
        data.url;
    }
  } catch (error) {
    console.log(error);
    toast.error(
      "Failed to start payment"
    );
  }
};

  const handleCancel = async (id) => {
    try {
      await fetch(
        `https://resell-hub-server-six.vercel.app/orders/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "cancelled",
          }),
        }
      );

      toast.success("Order Cancelled");

      loadOrders();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Cancel");
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <RotateLoader color="#2563eb" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        <div className="grid grid-cols-6 p-4 bg-gray-50 font-semibold">
          <div>Product</div>
          <div>Price</div>
          <div>Status</div>
          <div>Date</div>
          <div>Payment</div>
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
                {order.productTitle ||
                  order.title ||
                  "Unknown Product"}
              </div>

              <div>
                ৳ {order.price || 0}
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div>
                {order.createdAt
                  ? new Date(
                      order.createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </div>

              <div>
                {order.paymentStatus === "paid" ? (
                  <span className="text-green-600 font-semibold">
                    Paid
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      handlePayment(order)
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Pay Now
                  </button>
                )}
              </div>

              <div>
                {order.status === "pending" && (
                  <button
                    onClick={() =>
                      handleCancel(order._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}