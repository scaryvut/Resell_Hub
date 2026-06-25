"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function WishlistPage() {
  const userEmail = "buyer@test.com";

  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = async () => {
    const res = await fetch(
      `http://localhost:5000/wishlist/${userEmail}`
    );

    const data = await res.json();

    setWishlist(data);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const removeItem = async (id) => {
    await fetch(
      `http://localhost:5000/wishlist/${id}`,
      {
        method: "DELETE",
      }
    );

    toast.success("Removed");

    loadWishlist();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Wishlist
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow p-4"
          >
            <h2 className="font-bold">
              {item.productTitle}
            </h2>

            <button
              onClick={() =>
                removeItem(item._id)
              }
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}