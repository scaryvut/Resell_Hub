"use client";

import { useEffect, useState } from "react";
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
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/admin/analytics")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col justify-center items-center">
        <RotateLoader color="#2563eb" />
        <p className="mt-4 text-gray-500">
          Loading Analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold">
          Platform Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Growth, performance and business insights
        </p>
      </motion.div>

      {/* TOP CARDS */}
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
            {analytics?.totalUsers || 0}
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
            {analytics?.totalProducts || 0}
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
            {analytics?.totalOrders || 0}
          </h2>
        </motion.div>

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* USER GROWTH */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl shadow p-6"
        >
          <h2 className="text-xl font-bold mb-5">
            User Growth
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart
              data={analytics?.userGrowth}
            >
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
        </motion.div>

        {/* MONTHLY ORDERS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl shadow p-6"
        >
          <h2 className="text-xl font-bold mb-5">
            Monthly Orders
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={analytics?.monthlyOrders}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="orders"
                fill="#16a34a"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* CATEGORY PERFORMANCE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl shadow p-6"
        >
          <h2 className="text-xl font-bold mb-5">
            Category Performance
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <PieChart>
              <Pie
                data={analytics?.categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {analytics?.categoryData?.map(
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
        </motion.div>

        {/* TOP CATEGORIES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl shadow p-6"
        >
          <h2 className="text-xl font-bold mb-5">
            Top Categories
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart
              data={analytics?.categoryData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="value"
                fill="#9333ea"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  );
}