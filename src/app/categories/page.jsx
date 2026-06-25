"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";


const getImage = (p) =>
  p?.images?.[0] || "/default-product.png";

const ITEMS_PER_PAGE = 6;

export default function CategoryPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("all");
  const [page, setPage] = useState(1);

  // FETCH DATA
  useEffect(() => {
    fetch("https://resell-hub-nine.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        
      })
      .catch(() => {
        setLoading(false);
        
      });
  }, []);

  // RESET PAGE
  useEffect(() => {
    setPage(1);
  }, [search, activeCategory]);

  // CATEGORIES
  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(
        products.map(
          (p) =>
            p.category?.toLowerCase() ||
            "uncategorized"
        )
      ),
    ];
  }, [products]);

  // FILTER
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        activeCategory === "all"
          ? true
          : (p.category || "")
              .toLowerCase()
              .includes(activeCategory);

      return matchSearch && matchCategory;
    });
  }, [products, search, activeCategory]);

  // PAGINATION
  const totalPages = Math.ceil(
    filtered.length / ITEMS_PER_PAGE
  );

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filtered, page]);

  // LOADING UI (IMPORTANT)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <RotateLoader color="#2563eb" />
        <p className="mt-4 text-gray-500">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 flex gap-6">

      {/* SIDEBAR */}
      <aside className="w-72 sticky top-6 h-fit bg-white shadow-lg rounded-2xl p-5">
        <h2 className="text-xl font-bold mb-4">
          Categories
        </h2>

        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(cat)
              }
              className={`w-full text-left px-4 py-2 rounded-lg capitalize ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">
            Explore Products
          </h1>
          <p className="text-gray-500">
            Browse marketplace with filters
          </p>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded-lg w-full"
        />

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {paginated.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() =>
                router.push(`/products/${p._id}`)
              }
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
            >
              <img
                src={getImage(p)}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 space-y-2">
                <h3 className="font-bold line-clamp-1">
                  {p.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  {p.category}
                </p>

                <p className="text-green-600 font-semibold">
                  ৳ {p.price}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/products/${p._id}`
                    );
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <div className="text-sm">
              Page {page} of {totalPages}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>
        )}
      </main>
    </div>
  );
}