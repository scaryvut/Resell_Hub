"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [role, setRole] = useState("buyer");
  const [msg, setMsg] = useState("");

  const roles = [
    { id: "buyer", label: "Buyer" },
    { id: "seller", label: "Seller" },
    { id: "admin", label: "Admin" },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMsg("");

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setMsg(error.message || "Invalid email or password ❌");
        return;
      }

      // Check saved role from database
      const userRole = data?.user?.role;

      if (userRole !== role) {
        await authClient.signOut();

        setMsg(
          `Login failed ❌ You selected "${role}" but your account role is "${userRole}".`
        );

        return;
      }

      setMsg("Login successful ✅");

      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "seller") {
        router.push("/dashboard/seller");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setMsg("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error(err);
      setMsg("Google login failed ❌");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <h1 className="text-4xl font-bold mb-4">
            Welcome Back
          </h1>

          <p className="text-blue-100">
            Login to access your ResellHub account and continue trading.
          </p>

          <div className="mt-8 space-y-3">
            <p>✓ Secure Authentication</p>
            <p>✓ Buyer & Seller Dashboard</p>
            <p>✓ Role Based Access Control</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10">

          <h2 className="text-3xl font-bold mb-2">
            Login
          </h2>

          <p className="text-gray-500 mb-6">
            Access your ResellHub account
          </p>

          {msg && (
            <div
              className={`mb-5 p-3 rounded-lg text-sm ${
                msg.includes("successful")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {msg}
            </div>
          )}

          {/* ROLE SELECT */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Login As
            </p>

            <div className="grid grid-cols-3 gap-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`py-2 rounded-lg border font-medium transition ${
                    role === r.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* GOOGLE */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border py-3 rounded-lg mb-5 hover:bg-gray-50"
          >
            {googleLoading
              ? "Connecting..."
              : "Continue with Google"}
          </button>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full border p-3 rounded-lg"
            />

            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
            >
              {loading ? "Logging In..." : `Login as ${role}`}
            </motion.button>

          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600"
            >
              Register
            </Link>
          </p>

        </div>
      </motion.div>

    </div>
  );
}