"use client";

import { authClient } from "@/lib/auth-client";

export default function EditProfile() {
  const { data: session } =
    authClient.useSession();

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">
          Edit Profile
        </h1>

        <input
          defaultValue={session?.user?.name}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          defaultValue={session?.user?.email}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}