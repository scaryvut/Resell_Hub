"use client";

import { useState } from "react";

export default function ManageProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: "iPhone 13", status: "pending" },
    { id: 2, name: "Laptop", status: "approved" },
  ]);

  const updateStatus = (id, status) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status } : p
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Manage Products
      </h1>

      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-4 bg-white shadow rounded-xl flex justify-between"
          >
            <p className="font-medium">{p.name}</p>

            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(p.id, "approved")}
                className="px-3 py-1 bg-green-100 text-green-600 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(p.id, "rejected")}
                className="px-3 py-1 bg-red-100 text-red-600 rounded"
              >
                Reject
              </button>

              <button
                onClick={() =>
                  setProducts(products.filter((x) => x.id !== p.id))
                }
                className="px-3 py-1 border rounded"
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