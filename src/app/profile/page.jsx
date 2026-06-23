"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    // 🔴 Replace with real API later
    console.log("Updated profile:", form);
    setEditMode(false);
  };

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-gray-500">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-500">
          Manage your personal information
        </p>
      </div>

      {/* PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow border p-6"
      >
        <div className="flex flex-col md:flex-row items-start gap-6">

          {/* AVATAR */}
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>

          {/* INFO */}
          <div className="flex-1 space-y-4">

            {/* NAME */}
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full mt-1 p-3 border rounded-lg disabled:bg-gray-100"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                name="email"
                value={form.email}
                disabled
                className="w-full mt-1 p-3 border rounded-lg bg-gray-100"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="Add phone number"
                className="w-full mt-1 p-3 border rounded-lg disabled:bg-gray-100"
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="text-sm text-gray-500">Role</label>
              <div className="mt-1 inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm capitalize">
                {user.role || "user"}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 pt-4">

              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-5 py-2 bg-black text-white rounded-lg"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="px-5 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </motion.div>

      {/* EXTRA INFO CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-5 bg-white border rounded-xl shadow">
          <h3 className="text-gray-500">Account Status</h3>
          <p className="text-xl font-bold text-green-600 mt-2">
            Active
          </p>
        </div>

        <div className="p-5 bg-white border rounded-xl shadow">
          <h3 className="text-gray-500">Member Since</h3>
          <p className="text-xl font-bold mt-2">
            2026
          </p>
        </div>

        <div className="p-5 bg-white border rounded-xl shadow">
          <h3 className="text-gray-500">Total Activity</h3>
          <p className="text-xl font-bold mt-2">
            128 Actions
          </p>
        </div>

      </div>
    </div>
  );
}