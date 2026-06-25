"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const router = useRouter();

  const userEmail = "buyer@test.com";
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/wishlist/${userEmail}`
      );

      const data = await res.json();
      setWishlist(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load wishlist");
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const removeItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/wishlist/${id}`, {
        method: "DELETE",
      });

      toast.success("Removed from wishlist");
      loadWishlist();
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          My Wishlist
        </h1>
        <p className="text-gray-500 mt-2">
          Saved products you can review anytime
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading wishlist...
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl">💔</div>
            <h2 className="text-xl font-semibold mt-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mt-2">
              Start saving products you like
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                {/* IMAGE */}
                <div className="h-44 bg-gray-100">
                  <img
                    src={
                      item.productImage ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={item.productTitle || "Product"}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.productTitle || "Untitled Product"}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Saved in your wishlist
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-2 mt-5">
                    
                    {/* VIEW BUTTON */}
                    <button
                      onClick={() => {
                        if (item.productId) {
                          router.push(`/product/${item.productId}`);
                        } else {
                          toast.error("Product page not available");
                        }
                      }}
                      className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                    >
                      View
                    </button>

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() => removeItem(item._id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}