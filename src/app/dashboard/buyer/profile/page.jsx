"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function BuyerProfile() {
  const { data: session, isPending } =
    useSession();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-8xl text-blue-600" />

          <h1 className="text-3xl font-bold mt-4">
            {user?.name}
          </h1>

          <p className="text-gray-500">
            {user?.email}
          </p>

          <div className="mt-6">
            <Link
              href="/buyer/profile/edit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}