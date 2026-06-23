"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    condition: "Used",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("PRODUCT:", form);

    // TODO: API call
  };

  return (
    <div className="max-w-2xl space-y-4">

      <h1 className="text-xl font-bold">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          placeholder="Title"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Category"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          placeholder="Stock"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, condition: e.target.value })}
        >
          <option>Used</option>
          <option>Like New</option>
          <option>Refurbished</option>
        </select>

        <button className="w-full bg-black text-white p-2 rounded">
          Create Product
        </button>

      </form>

    </div>
  );
}