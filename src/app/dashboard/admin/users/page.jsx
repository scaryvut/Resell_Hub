"use client";

import { useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@mail.com", status: "active" },
    { id: 2, name: "Sara", email: "sara@mail.com", status: "blocked" },
  ]);

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "blocked" : "active" }
          : u
      )
    );
  };

  const removeUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center p-4 border-b"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  user.status === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {user.status}
              </span>

              <button
                onClick={() => toggleStatus(user.id)}
                className="px-3 py-1 border rounded"
              >
                Toggle
              </button>

              <button
                onClick={() => removeUser(user.id)}
                className="px-3 py-1 text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}