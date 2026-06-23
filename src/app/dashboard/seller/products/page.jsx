"use client";

export default function SellerProducts() {
  const products = [
    { id: 1, name: "iPhone 13", price: 500 },
    { id: 2, name: "MacBook Pro", price: 1200 },
  ];

  return (
    <div className="space-y-4">

      <h1 className="text-xl font-bold">My Products</h1>

      <div className="grid gap-3">

        {products.map((p) => (
          <div
            key={p.id}
            className="p-4 border rounded flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-gray-500">${p.price}</p>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded">
                Edit
              </button>

              <button className="px-3 py-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}