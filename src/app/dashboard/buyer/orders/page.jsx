"use client";

import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";

export default function MyOrders() {
  const userEmail = "buyer@test.com";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:5000/orders/${userEmail}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <RotateLoader color="#2563eb" />
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        <div className="grid grid-cols-4 p-4 bg-gray-50 font-semibold">
          <div>Product</div>
          <div>Price</div>
          <div>Status</div>
          <div>Date</div>
        </div>

        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-4 p-4 border-t"
          >
            <div>{order.productTitle}</div>
            <div>৳ {order.price}</div>
            <div>{order.status}</div>
            <div>
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}