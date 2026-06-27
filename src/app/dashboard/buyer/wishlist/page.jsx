"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RotateLoader } from "react-spinners";

export default function WishlistPage() {
  const router = useRouter();

  const userEmail = "buyer@test.com";

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://resell-hub-server-six.vercel.app/wishlist/${userEmail}`
      );

      const data = await res.json();

      setWishlist(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
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
      const res = await fetch(
        `https://resell-hub-server-six.vercel.app/wishlist/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Removed from wishlist");

      setWishlist((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <RotateLoader color="#2563eb" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            My Wishlist
          </h1>

          <p className="text-gray-500 mt-2">
            Saved products for later
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">

            <div className="text-6xl mb-4">
              💔
            </div>

            <h2 className="text-2xl font-bold">
              Wishlist Empty
            </h2>

            <p className="text-gray-500 mt-2">
              No products added yet.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
              >

                <img
                  src={
                    item.productImage ||
                    item.image ||
                    "https://via.placeholder.com/600x400?text=No+Image"
                  }
                  alt={
                    item.productTitle ||
                    item.title
                  }
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">

                  <h2 className="text-xl font-bold">
                    {item.productTitle ||
                      item.title ||
                      "Untitled Product"}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {item.category ||
                      "Uncategorized"}
                  </p>

                  <p className="text-green-600 font-bold text-xl mt-3">
                    ৳{" "}
                    {item.productPrice ||
                      item.price ||
                      0}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() =>
                        router.push(
                          `/products/${item.productId}`
                        )
                      }
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() =>
                        removeItem(item._id)
                      }
                      className="px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg"
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