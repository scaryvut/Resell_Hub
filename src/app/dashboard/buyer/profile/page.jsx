"use client";

export default function ProfileManagement() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Profile Management
      </h1>

      <form className="max-w-xl bg-white p-6 rounded-2xl shadow space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Profile Image URL"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border p-3 rounded-lg"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Update Profile
        </button>

      </form>
    </div>
  );
}