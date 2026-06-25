"use client";

import { FaUserCircle } from "react-icons/fa";

export default function BuyerProfile() {
  const user = {
    name: "Buyer User",
    email: "buyer@test.com",
    role: "buyer",
  };

  return (
    <div className="max-w-2xl mx-auto">

      <div className="bg-white rounded-2xl shadow border p-8">

        <div className="flex flex-col items-center">

          <FaUserCircle className="text-8xl text-blue-600" />

          <h1 className="text-3xl font-bold mt-4">
            {user.name}
          </h1>

          <p className="text-gray-500">
            {user.email}
          </p>

          <span className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
            {user.role}
          </span>

        </div>

      </div>

    </div>
  );
}