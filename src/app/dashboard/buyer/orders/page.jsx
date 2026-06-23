"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const userEmail = "buyer@test.com";

  useEffect(() => {
    fetch(`http://localhost:5000/orders/${userEmail}`)
      .then((r) => r.json())
      .then(setOrders);

    fetch("http://localhost:5000/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  const getProduct = (id) =>
    products.find((p) => p._id === id);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => {
              const product = getProduct(o.productId);

              return (
                <tr key={o._id} className="border-t">
                  <td className="p-3 font-semibold">
                    {product ? product.title : "Loading..."}
                  </td>

                  <td className="p-3">
                    {o.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}