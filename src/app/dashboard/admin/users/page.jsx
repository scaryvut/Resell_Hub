"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import {
  FaSearch,
  FaTrash,
  FaUserLock,
  FaUserCheck,
} from "react-icons/fa";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();

      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredUsers(result);
  }, [search, users]);

  const toggleStatus = async (user) => {
    const newStatus =
      user.status === "active"
        ? "blocked"
        : "active";

    try {
      await fetch(
        `http://localhost:5000/users/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `http://localhost:5000/users/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col justify-center items-center">
        <RotateLoader color="#2563eb" />
        <p className="mt-4 text-gray-500">
          Loading Users...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-bold">
          Manage Users
        </h1>

        <p className="text-gray-500 mt-2">
          Search, block or remove users
        </p>
      </motion.div>

      {/* SEARCH */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full pl-12 p-3 border rounded-xl"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <div className="grid grid-cols-6 bg-gray-50 p-4 font-semibold">
          <div>User</div>
          <div>Email</div>
          <div>Role</div>
          <div>Location</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {filteredUsers.map((user) => (
          <motion.div
            key={user._id}
            whileHover={{
              backgroundColor: "#f9fafb",
            }}
            className="grid grid-cols-6 items-center p-4 border-t"
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  user.photo ||
                  "https://i.pravatar.cc/150"
                }
                alt=""
                className="w-10 h-10 rounded-full"
              />

              <span className="font-medium">
                {user.name}
              </span>
            </div>

            <div>{user.email}</div>

            <div>
              <span className="capitalize">
                {user.role}
              </span>
            </div>

            <div>{user.location}</div>

            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  user.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.status}
              </span>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  toggleStatus(user)
                }
                className={`p-2 rounded-lg ${
                  user.status === "active"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.status === "active" ? (
                  <FaUserLock />
                ) : (
                  <FaUserCheck />
                )}
              </button>

              <button
                onClick={() =>
                  deleteUser(user._id)
                }
                className="p-2 rounded-lg bg-red-100 text-red-600"
              >
                <FaTrash />
              </button>

            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}