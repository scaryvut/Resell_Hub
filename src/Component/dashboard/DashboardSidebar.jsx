"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaBars,
  FaHome,
  FaShoppingCart,
  FaHeart,
  FaMoneyBill,
  FaUserCircle,
} from "react-icons/fa";

export default function BuyerSidebar() {
  const [open, setOpen] = useState(true);

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard/buyer",
      icon: <FaHome />,
    },
    {
      name: "My Orders",
      path: "/dashboard/buyer/orders",
      icon: <FaShoppingCart />,
    },
    {
      name: "Wishlist",
      path: "/dashboard/buyer/wishlist",
      icon: <FaHeart />,
    },
    {
      name: "Payments",
      path: "/dashboard/buyer/payments",
      icon: <FaMoneyBill />,
    },
    {
      name: "Profile",
      path: "/dashboard/buyer/profile",
      icon: <FaUserCircle />,
    },
  ];

  return (
    <motion.aside
      animate={{ width: open ? 260 : 80 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-white border-r shadow-sm sticky top-0"
    >
      {/* HEADER */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {open && (
          <h1 className="text-xl font-bold text-blue-600">
            Buyer Panel
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

        {menu.map((item) => (
          <Link key={item.name} href={item.path}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 transition">

              <span className="text-lg text-blue-600">
                {item.icon}
              </span>

              {open && (
                <span className="font-medium">
                  {item.name}
                </span>
              )}

            </div>
          </Link>
        ))}

      </div>
    </motion.aside>
  );
}