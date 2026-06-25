"use client";

import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa";

export default function SellerProducts() {
  const sellerEmail = "seller4@gmail.com"; // database email

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/seller-products/${sellerEmail}`
      );

      const data = await res.json();

      console.log(data);

      setProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    await fetch(
      `http://localhost:5000/products/${id}`,
      {
        method: "DELETE",
      }
    );

    loadProducts();
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <RotateLoader color="#2563eb" />
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Products
      </h1>

      {products.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          No Products Found
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-4">

                <h2 className="font-bold text-lg">
                  {product.title}
                </h2>

                <p className="text-gray-500">
                  {product.category}
                </p>

                <p className="font-bold text-blue-600 mt-2">
                  ৳ {product.price}
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-xs
                  ${
                    product.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : product.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.status}
                </span>

                <button
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg flex justify-center items-center gap-2"
                >
                  <FaTrash />
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}