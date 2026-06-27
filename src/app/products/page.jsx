"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";

const getImage = (p) =>
  p?.images?.[0] || "/default-product.png";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const ITEMS_PER_PAGE = 12;

  // FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://resell-hub-server-six.vercel.app/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        // FORCE ARRAY SAFETY
        setProducts(Array.isArray(data) ? data : []);

      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // RESET PAGE
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  // LOADING UI
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <RotateLoader color="#2563eb" />
        <p className="mt-4 text-gray-500">
          Loading products...
        </p>
      </div>
    );
  }

  // ERROR UI
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  // SAFETY CHECK
  const safeProducts = products || [];

  const totalPages = Math.max(
    1,
    Math.ceil(safeProducts.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentProducts = safeProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        Discover Products
      </h1>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8">

        {currentProducts.map((p, i) => (
          <motion.div
            key={p?._id || i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={getImage(p)}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold">
                {p?.title || "No title"}
              </h2>

              <p className="text-gray-500">
                {p?.category || "uncategorized"}
              </p>

              <p className="text-green-600 font-bold mt-2">
                ৳ {p?.price || 0}
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  router.push(`/products/${p?._id}`)
                }
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">

          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(p - 1, 1))
            }
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
}