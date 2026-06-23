"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [role, setRole] = useState("buyer");

  const roles = [
    { id: "buyer", label: "Buyer" },
    { id: "seller", label: "Seller" },
    { id: "admin", label: "Admin" },
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const form = e.target;

    const payload = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      role, // 👈 IMPORTANT
    };

    try {
      const { data, error } = await authClient.signUp.email(payload);

      if (error) {
        setMsg(error.message || "Signup failed ❌");
        return;
      }

      setMsg("Account created successfully ✅");

      form.reset();

      setTimeout(() => {
        router.push("/");
      }, 900);
    } catch {
      setMsg("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setMsg("Redirecting to Google...");

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      setMsg("Google signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden"
      >

        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">

          <h1 className="text-4xl font-bold mb-4">
            Join ResellHub
          </h1>

          <p className="text-blue-100">
            Buy, sell, and grow with a smarter marketplace experience.
          </p>

          <div className="mt-10 space-y-2 text-blue-100">
            <p>✔ Verified sellers</p>
            <p>✔ Secure transactions</p>
            <p>✔ Fast listing system</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-10">

          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mb-6">
            Join ResellHub in seconds
          </p>

          {/* MESSAGE */}
          {msg && (
            <p className="text-sm mb-4 text-blue-600">
              {msg}
            </p>
          )}

          {/* ROLE SELECTOR */}
          <div className="mb-5">
            <p className="text-sm text-gray-600 mb-2">
              Select Role
            </p>

            <div className="grid grid-cols-3 gap-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`py-2 rounded-lg border text-sm font-medium transition ${
                    role === r.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* GOOGLE */}
          <button
            onClick={handleGoogle}
            className="w-full border p-3 rounded-lg mb-5 hover:bg-gray-50 transition"
          >
            Continue with Google
          </button>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-4">

            <input
              name="name"
              placeholder="Full Name"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Creating Account..." : `Register as ${role}`}
            </motion.button>
          </form>

          {/* LOGIN */}
          <p className="text-center text-sm mt-6 text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}