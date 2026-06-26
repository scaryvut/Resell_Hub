"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/products"
      );

      const data = await res.json();

      setProducts(Array.isArray(data) ? data : []);
      setFilteredProducts(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const result = products.filter(
      (product) =>
        product.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        product.category
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredProducts(result);
  }, [search, products]);

  const updateStatus = async (id, status) => {
    try {
      await fetch(
        `http://localhost:5000/products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `http://localhost:5000/products/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col justify-center items-center">
        <RotateLoader color="#2563eb" />

        <p className="mt-4 text-gray-500">
          Loading Products...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-bold">
          Manage Products
        </h1>

        <p className="text-gray-500 mt-2">
          Approve, reject and moderate
          marketplace products
        </p>
      </motion.div>

      {/* SEARCH */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full pl-12 p-3 border rounded-xl"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <div className="grid grid-cols-7 bg-gray-50 p-4 font-semibold">
          <div>Image</div>
          <div>Title</div>
          <div>Category</div>
          <div>Price</div>
          <div>Seller</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {filteredProducts.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{
              backgroundColor: "#f9fafb",
            }}
            className="grid grid-cols-7 items-center p-4 border-t"
          >
            <div>
              <img
                src={
                  product.images?.[0] ||
                  "/default-product.png"
                }
                alt=""
                className="w-14 h-14 rounded-lg object-cover"
              />
            </div>

            <div className="font-medium">
              {product.title}
            </div>

            <div>
              {product.category}
            </div>

            <div>
              ৳ {product.price}
            </div>

            <div>
              {product.sellerName ||
                product.sellerEmail}
            </div>

            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(
                  product.status
                )}`}
              >
                {product.status || "pending"}
              </span>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  updateStatus(
                    product._id,
                    "approved"
                  )
                }
                className="p-2 rounded-lg bg-green-100 text-green-700"
              >
                <FaCheckCircle />
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    product._id,
                    "rejected"
                  )
                }
                className="p-2 rounded-lg bg-red-100 text-red-700"
              >
                <FaTimesCircle />
              </button>

              <button
                onClick={() =>
                  deleteProduct(product._id)
                }
                className="p-2 rounded-lg bg-gray-100 text-gray-700"
              >
                <FaTrash />
              </button>

            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}