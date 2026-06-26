"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { RotateLoader } from "react-spinners";
import { authClient } from "@/lib/auth-client";

export default function AddProductPage() {
  const { data: session, isPending } =
    authClient.useSession();

  const [loading, setLoading] = useState(false);

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Computers",
    "Tablets",
    "Gaming Consoles",
    "Gaming Accessories",
    "Vehicles",
    "Cars",
    "Motorcycles",
    "Bicycles",
    "Furniture",
    "Home Appliances",
    "Kitchen Appliances",
    "Fashion",
    "Men's Fashion",
    "Women's Fashion",
    "Watches",
    "Shoes",
    "Books",
    "Education",
    "Sports",
    "Fitness Equipment",
    "Health & Beauty",
    "Smart Devices",
    "Cameras",
    "Audio Devices",
    "Musical Instruments",
    "Collectibles",
    "Toys",
    "Office Equipment",
    "Pet Supplies",
    "Others",
  ];

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    condition: "Used",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error("Please login first");
      return;
    }

    try {
      setLoading(true);

      const productData = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        condition: form.condition,

        images: [form.image],

        sellerInfo: {
          name: session.user.name,
          email: session.user.email,
        },

        status: "pending",
        createdAt: new Date(),
      };

      const res = await fetch(
        "http://localhost:5000/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Product Added Successfully");

        setForm({
          title: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          condition: "Used",
          image: "",
        });
      } else {
        toast.error("Failed To Add Product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="h-screen flex justify-center items-center">
        <RotateLoader color="#2563eb" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-3xl p-8"
      >
        <h1 className="text-3xl font-bold mb-2">
          Add New Product
        </h1>

        <p className="text-gray-500 mb-8">
          Create and publish your product listing
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product Title"
            required
            className="border p-3 rounded-xl"
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="border p-3 rounded-xl"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="border p-3 rounded-xl"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            required
            className="border p-3 rounded-xl"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="border p-3 rounded-xl md:col-span-2"
          />

          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option value="Used">Used</option>
            <option value="Like New">Like New</option>
            <option value="Refurbished">
              Refurbished
            </option>
          </select>

          <div className="bg-gray-100 rounded-xl p-3">
            <p className="font-semibold">
              {session?.user?.name}
            </p>

            <p className="text-sm text-gray-500">
              {session?.user?.email}
            </p>
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product Description"
            rows={5}
            required
            className="border p-3 rounded-xl md:col-span-2"
          />

          {form.image && (
            <div className="md:col-span-2">
              <img
                src={form.image}
                alt="Preview"
                className="w-full h-72 object-cover rounded-xl border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}