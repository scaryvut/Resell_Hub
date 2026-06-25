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
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const roles = [
    { id: "buyer", label: "Buyer" },
    { id: "seller", label: "Seller" },
  ];

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const form = e.target;

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value,
      role,
      photo: preview, // temporary (should be uploaded in real backend)
    };

    try {
      const { error } = await authClient.signUp.email(payload);

      if (error) {
        setMsg(error.message || "Signup failed");
        return;
      }

      setMsg("Welcome to ResellHub 🎉");

      form.reset();
      setImage(null);
      setPreview(null);

      setTimeout(() => router.push("/"), 800);
    } catch {
      setMsg("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setMsg("Redirecting...");

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      setMsg("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-100 px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden"
      >

        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
          <h1 className="text-4xl font-bold mb-4">
            Join ResellHub
          </h1>

          <p className="text-blue-100 mb-8">
            Buy smarter. Sell faster. Build trust in a verified marketplace.
          </p>

          <div className="space-y-3 text-blue-100">
            <p>✔ Verified users system</p>
            <p>✔ Secure marketplace flow</p>
            <p>✔ Fast onboarding</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-10">

          <h1 className="text-3xl font-bold mb-1">Create Account</h1>
          <p className="text-gray-500 mb-6">Start your ResellHub journey</p>

          {msg && (
            <p className="text-sm mb-4 text-indigo-600 font-medium">
              {msg}
            </p>
          )}

          {/* PROFILE IMAGE */}
          <div className="mb-5">
            <label className="text-sm text-gray-600 mb-2 block">
              Profile Picture
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full border p-2 rounded-lg"
            />

            {preview && (
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={preview}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <span className="text-sm text-gray-500">
                  Image selected
                </span>
              </div>
            )}
          </div>

          {/* ROLE SELECTOR */}
          <div className="mb-6">
            <label className="text-sm text-gray-600 mb-2 block">
              Choose Account Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`py-2 rounded-xl border text-sm font-semibold transition ${
                    role === r.id
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 hover:bg-gray-50"
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
            className="w-full border p-3 rounded-xl mb-5 hover:bg-gray-50 transition"
          >
            Continue with Google
          </button>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-4">

            <input
              name="name"
              placeholder="Full Name"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />

            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full bg-indigo-600 text-white p-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-semibold">
              Login
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}