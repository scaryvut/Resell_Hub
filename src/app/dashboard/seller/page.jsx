"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";

export default function SellerDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    orders: [],
  });

  const [loading, setLoading] = useState(true);

  // ⚠️ Database email use karo
  const sellerEmail = "seller4@gmail.com";

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/seller/analytics/${sellerEmail}`
      );

      const data = await res.json();

      console.log("Analytics Data:", data);

      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <RotateLoader color="#2563eb" />
        <p className="mt-4">Loading Dashboard...</p>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <FaShoppingCart />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Revenue",
      value: `৳ ${stats.totalRevenue}`,
      icon: <FaMoneyBillWave />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: <FaClock />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Seller Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome Back Seller
        </p>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -5,
              scale: 1.03,
            }}
            className={`bg-gradient-to-r ${card.color}
            text-white p-6 rounded-2xl shadow-xl`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p>{card.title}</p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div className="text-4xl">
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}

      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">
            Recent Orders
          </h2>
        </div>

        {stats.orders?.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No Orders Found
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">
                  Buyer
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {stats.orders.slice(0, 5).map((order) => (
                <tr
                  key={order._id}
                  className="border-t"
                >
                  <td className="p-4">
                    {order.userEmail ||
                      "Unknown"}
                  </td>

                  <td className="p-4 capitalize">
                    {order.status}
                  </td>

                  <td className="p-4">
                    ৳ {order.price || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Debug Section */}

      <div className="bg-gray-100 p-4 rounded-xl">
        <h3 className="font-bold mb-2">
          Debug Data
        </h3>

        <pre className="text-xs overflow-auto">
          {JSON.stringify(stats, null, 2)}
        </pre>
      </div>
    </div>
  );
}