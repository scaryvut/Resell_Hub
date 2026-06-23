"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

// ICONS
import { FaBars, FaUsers, FaBoxOpen, FaShoppingCart, FaHome } from "react-icons/fa";
import { MdDashboard, MdAnalytics, MdCategory } from "react-icons/md";

export default function AdminSidebar() {
  const [open, setOpen] = useState(true);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // 🔴 Hard rule: admin only (you should also enforce backend protection)
  if (user?.role !== "admin") return null;

  const menu = [
    {
      title: "Dashboard",
      path: "/dashboard/admin",
      icon: <MdDashboard />,
    },
    {
      title: "Users",
      path: "/dashboard/admin/users",
      icon: <FaUsers />,
    },
    {
      title: "Products",
      path: "/dashboard/admin/products",
      icon: <FaBoxOpen />,
    },
    {
      title: "Orders",
      path: "/dashboard/admin/orders",
      icon: <FaShoppingCart />,
    },
    {
      title: "Analytics",
      path: "/dashboard/admin/analytics",
      icon: <MdAnalytics />,
    },
   
  ];

  return (
    <motion.aside
      animate={{ width: open ? 260 : 80 }}
      transition={{ duration: 0.25 }}
      className="h-screen bg-white border-r shadow-sm sticky top-0"
    >
      {/* HEADER */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {open && (
          <h1 className="text-xl font-bold text-blue-600">
            Admin Panel
          </h1>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="text-xl"
        >
          <FaBars />
        </button>
      </div>

      {/* MENU */}
      <div className="p-3 space-y-2">

        {/* HOME */}
        <Link href="/">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50">
            <FaHome />
            {open && <span>Home</span>}
          </div>
        </Link>

        {/* ADMIN LINKS */}
        {menu.map((item) => (
          <Link key={item.title} href={item.path}>
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 cursor-pointer"
            >
              <span className="text-lg">{item.icon}</span>

              {open && (
                <span className="font-medium text-gray-700">
                  {item.title}
                </span>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.aside>
  );
}