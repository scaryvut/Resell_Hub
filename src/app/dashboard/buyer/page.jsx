"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import {
  FaShoppingBag,
  FaHeart,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function BuyerDashboard() {
  const { data: session, isPending } =
    useSession();

  const [stats, setStats] = useState({
    totalOrders: 0,
    wishlist: 0,
    delivered: 0,
    pending: 0,
    recentOrders: [],
  });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadData = async () => {
      try {
        setLoading(true);

        const email =
          session.user.email;

        const [ordersRes, wishlistRes] =
          await Promise.all([
            fetch(
              `http://localhost:5000/orders/${email}`
            ),
            fetch(
              `http://localhost:5000/wishlist/${email}`
            ),
          ]);

        const orders =
          await ordersRes.json();

        const wishlist =
          await wishlistRes.json();

        const ordersArray =
          Array.isArray(orders)
            ? orders
            : [];

        const wishlistArray =
          Array.isArray(wishlist)
            ? wishlist
            : [];

        setStats({
          totalOrders:
            ordersArray.length,

          wishlist:
            wishlistArray.length,

          delivered:
            ordersArray.filter(
              (o) =>
                o.orderStatus ===
                "delivered"
            ).length,

          pending:
            ordersArray.filter(
              (o) =>
                o.orderStatus ===
                  "pending" ||
                o.orderStatus ===
                  "processing"
            ).length,

          recentOrders:
            ordersArray.slice(0, 5),
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [session]);

  if (isPending || loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <RotateLoader color="#2563eb" />
      </div>
    );
  }

  const cards = [
    {
      title: "My Orders",
      value: stats.totalOrders,
      icon: <FaShoppingBag />,
      color:
        "from-blue-500 to-blue-700",
    },
    {
      title: "Wishlist",
      value: stats.wishlist,
      icon: <FaHeart />,
      color:
        "from-pink-500 to-red-500",
    },
    {
      title: "Delivered",
      value: stats.delivered,
      icon: <FaCheckCircle />,
      color:
        "from-green-500 to-green-700",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      color:
        "from-orange-500 to-orange-700",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Buyer Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back,{" "}
          {session?.user?.name}
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{
              y: -5,
            }}
            className={`bg-gradient-to-r ${card.color} text-white rounded-2xl p-6 shadow-lg`}
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="text-white/80">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div className="text-4xl opacity-80">
                {card.icon}
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="font-bold text-xl">
            Recent Orders
          </h2>
        </div>

        {stats.recentOrders.length ===
        0 ? (
          <div className="p-10 text-center text-gray-500">
            No Orders Found
          </div>
        ) : (
          stats.recentOrders.map(
            (order) => (
              <div
                key={order._id}
                className="p-4 border-b flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">
                    {order.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    ৳
                    {order.price}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.orderStatus ===
                    "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus ===
                        "processing"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {
                    order.orderStatus
                  }
                </span>
              </div>
            )
          )
        )}

      </div>

    </div>
  );
}