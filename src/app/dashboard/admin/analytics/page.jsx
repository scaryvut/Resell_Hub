"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#9333ea",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
];

export default function AdminAnalytics() {
  const { data: session, isPending } =
    useSession();

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!session?.user) return;

    const role =
      session.user.role?.toLowerCase();

    if (role !== "admin") {
      setLoading(false);
      return;
    }

    fetch(
      "https://resell-hub-server-six.vercel.app/admin/analytics"
    )
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [session]);

  if (isPending || loading) {
    return (
      <div className="h-[70vh] flex flex-col justify-center items-center">
        <RotateLoader color="#2563eb" />
        <p className="mt-4 text-gray-500">
          Loading Analytics...
        </p>
      </div>
    );
  }

  if (
    session?.user?.role?.toLowerCase() !==
    "admin"
  ) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <h1 className="text-2xl font-bold text-red-500">
          Access Denied
        </h1>
      </div>
    );
  }

  const userGrowth =
    analytics?.userGrowth || [
      { month: "Jan", users: 10 },
      { month: "Feb", users: 20 },
      { month: "Mar", users: 35 },
      { month: "Apr", users: 50 },
    ];

  const monthlyOrders =
    analytics?.monthlyOrders || [
      { month: "Jan", orders: 8 },
      { month: "Feb", orders: 15 },
      { month: "Mar", orders: 25 },
      { month: "Apr", orders: 40 },
    ];

  const categoryData =
    analytics?.categoryData || [
      {
        name: "Electronics",
        value: 40,
      },
      {
        name: "Furniture",
        value: 25,
      },
      {
        name: "Fashion",
        value: 20,
      },
      {
        name: "Books",
        value: 15,
      },
    ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">
          Platform Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome {session.user.name}
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6">

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-3xl shadow p-6"
        >
          <p className="text-gray-500">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ৳ {analytics?.totalRevenue || 0}
          </h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-3xl shadow p-6"
        >
          <p className="text-gray-500">
            Total Users
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {analytics?.users || 0}
          </h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-3xl shadow p-6"
        >
          <p className="text-gray-500">
            Total Products
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {analytics?.products || 0}
          </h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-3xl shadow p-6"
        >
          <p className="text-gray-500">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {analytics?.orders || 0}
          </h2>
        </motion.div>

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* USER GROWTH */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-xl font-bold mb-5">
            User Growth
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="users"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* MONTHLY ORDERS */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-xl font-bold mb-5">
            Monthly Orders
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="orders"
                fill="#16a34a"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CATEGORY PIE */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-xl font-bold mb-5">
            Category Performance
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {categoryData.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* CATEGORY BAR */}
        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-xl font-bold mb-5">
            Top Categories
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart
              data={categoryData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip />
              <Legend />

              <Bar
                dataKey="value"
                fill="#9333ea"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}