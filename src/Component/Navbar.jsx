"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaHome,
  FaBoxOpen,
  FaThLarge,
  FaBars,
  FaSignOutAlt,
  FaUserCircle,
  FaEnvelope,
  FaStore,
  
} from "react-icons/fa";

import { MdDashboard, MdLogin, MdPersonAdd } from "react-icons/md";

export default function Navbar() {
  const router = useRouter();

  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // ---------------- LOGOUT FIXED ----------------
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setProfileOpen(false);
      setMobileOpen(false);

      // IMPORTANT: force session refresh
      await refetch?.();

      router.replace("/signin"); // better than push
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ---------------- ROLE DASHBOARD ----------------
  const getDashboardLink = () => {
    if (!user) return "/signin";

    switch (user.role) {
      case "admin":
        return "/dashboard/admin";
      case "seller":
        return "/dashboard/seller";
      default:
        return "/dashboard/buyer";
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen /> },
    { name: "Categories", path: "/categories", icon: <FaThLarge /> },
    { name: "About", path: "/about", icon: <FaStore /> },
    { name: "Contact", path: "/contact", icon: < FaEnvelope /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ReSellHub
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* LOADING */}
          {isPending ? (
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          ) : !user ? (
            <div className="hidden md:flex gap-3">
              <Link href="/signin">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                  <MdLogin />
                  Login
                </button>
              </Link>

              <Link href="/signup">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                  <MdPersonAdd />
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative">

              {/* AVATAR + NAME */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <span className="hidden md:block font-medium">
                  {user.name}
                </span>
              </button>

              {/* DROPDOWN */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-64 bg-white border rounded-2xl shadow-xl overflow-hidden"
                  >

                    {/* USER INFO */}
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    {/* PROFILE */}
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      <FaUserCircle />
                      Profile
                    </Link>

                    {/* DASHBOARD */}
                    <Link
                      href={getDashboardLink()}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      <MdDashboard />
                      Dashboard
                    </Link>

                    {/* LOGOUT */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* MOBILE */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-2xl"
          >
            <FaBars />
          </button>

        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t bg-white"
          >
            <div className="px-6 py-4 flex flex-col gap-4">

              {navLinks.map((item) => (
                <Link key={item.name} href={item.path}>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    {item.name}
                  </div>
                </Link>
              ))}

              {!user ? (
                <div className="flex gap-3 mt-4">
                  <Link href="/signin" className="flex-1 border py-2 text-center rounded-lg">
                    Login
                  </Link>

                  <Link href="/signup" className="flex-1 bg-blue-600 text-white py-2 text-center rounded-lg">
                    Register
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-red-500 mt-4 text-left flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}