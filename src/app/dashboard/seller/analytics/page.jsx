"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  FaMoneyBillWave,
  FaBoxOpen,
  FaShoppingCart,
  FaClock,
} from "react-icons/fa";

import { authClient } from "@/lib/auth-client";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#9333ea",
  "#ea580c",
  "#dc2626",
  "#0891b2",
];

export default function SellerAnalytics() {
  const { data: session, isPending } =
    authClient.useSession();

  const sellerEmail = session?.user?.email;

  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    categoryData: [],
    orders: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sellerEmail) return;

    const loadAnalytics = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://resell-hub-server-six.vercel.app/seller/analytics/${sellerEmail}`
        );

        const data = await res.json();

        console.log("Analytics:", data);

        setAnalytics(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [sellerEmail]);

  if (isPending || loading) {
    return (
      <div className="h-[70vh] flex flex-col justify-center items-center">
        <RotateLoader color="#2563eb" />
        <p className="mt-4 text-gray-500">
          Loading analytics...
        </p>
      </div>
    );
  }

  const monthlyOrders = [
    { month: "Jan", orders: 12 },
    { month: "Feb", orders: 18 },
    { month: "Mar", orders: 25 },
    { month: "Apr", orders: 20 },
    { month: "May", orders: 32 },
    { month: "Jun", orders: 28 },
  ];

  const cards = [
    {
      title: "Revenue",
      value: `৳ ${analytics.totalRevenue}`,
      icon: <FaMoneyBillWave />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Products",
      value: analytics.totalProducts,
      icon: <FaBoxOpen />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Orders",
      value: analytics.totalOrders,
      icon: <FaShoppingCart />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Pending",
      value: analytics.pendingOrders,
      icon: <FaClock />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          {session?.user?.email}
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -5,
              scale: 1.03,
            }}
            className={`bg-gradient-to-r ${card.color}
            text-white rounded-2xl p-6 shadow-xl`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="opacity-80 text-sm">
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

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow border p-6">
          <h2 className="text-xl font-bold mb-6">
            Product Categories
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <PieChart>
              <Pie
                data={analytics.categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {analytics.categoryData.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow border p-6">
          <h2 className="text-xl font-bold mb-6">
            Monthly Orders
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="orders"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">
            Recent Orders
          </h2>
        </div>

        {analytics.orders?.length === 0 ? (
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
                  Product
                </th>
                <th className="p-4 text-left">
                  Amount
                </th>
                <th className="p-4 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {analytics.orders
                ?.slice(0, 8)
                .map((order) => (
                  <tr
                    key={order._id}
                    className="border-t"
                  >
                    <td className="p-4">
                      {order.userEmail}
                    </td>

                    <td className="p-4">
                      {order.productTitle ||
                        order.title ||
                        "Product"}
                    </td>

                    <td className="p-4">
                      ৳ {order.price}
                    </td>

                    <td className="p-4 capitalize">
                      {order.status}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}