"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaBars,
  FaHome,
  FaBoxOpen,
  FaPlus,
  FaShoppingCart,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

import { MdDashboard } from "react-icons/md";

export default function SellerSidebar() {
  const [open, setOpen] = useState(true);

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard/seller",
      icon: <MdDashboard />,
    },
    {
      name: "Add Product",
      path: "/dashboard/seller/add-product",
      icon: <FaPlus />,
    },
    {
      name: "My Products",
      path: "/dashboard/seller/products",
      icon: <FaBoxOpen />,
    },
    {
      name: "Orders",
      path: "/dashboard/seller/orders",
      icon: <FaShoppingCart />,
    },
    {
      name: "Analytics",
      path: "/dashboard/seller/analytics",
      icon: <FaChartLine />,
    },
  ];

  return (
    <motion.aside
      animate={{ width: open ? 260 : 80 }}
      transition={{ duration: 0.25 }}
      className="
        h-screen
        bg-white
        border-r
        shadow-sm
        sticky
        top-0
        flex
        flex-col
      "
    >
      {/* HEADER */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {open && (
          <h1 className="text-lg font-bold text-blue-600">
            Seller Panel
          </h1>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="text-lg"
        >
          <FaBars />
        </button>
      </div>

      {/* MENU */}
      <div className="p-3 space-y-2 flex-1">

        {menu.map((item) => (
          <Link key={item.name} href={item.path}>
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-blue-50 text-gray-700 transition">
              <span className="text-lg">{item.icon}</span>

              {open && (
                <span className="font-medium">
                  {item.name}
                </span>
              )}
            </div>
          </Link>
        ))}

      </div>

      {/* FOOTER (optional logout area) */}
      <div className="p-3 border-t">

        <button className="flex items-center gap-3 px-3 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg">
          <FaSignOutAlt />
          {open && <span>Logout</span>}
        </button>

      </div>
    </motion.aside>
  );
}