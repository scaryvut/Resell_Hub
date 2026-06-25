"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function PaymentHistory() {
  const { data: session } = useSession();

  const [payments, setPayments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `http://localhost:5000/payments/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="text-lg font-medium">
          Loading Payments...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Payment History
        </h1>

        <p className="text-gray-500 mt-2">
          View all your Stripe payments.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        {payments.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold">
              No Payment Found
            </h2>

            <p className="text-gray-500 mt-2">
              Your payment history will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Transaction ID
                  </th>

                  <th className="px-6 py-4 text-left">
                    Order ID
                  </th>

                  <th className="px-6 py-4 text-left">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left">
                    Method
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-mono text-sm">
                      {payment.transactionId}
                    </td>

                    <td className="px-6 py-4">
                      {payment.orderId}
                    </td>

                    <td className="px-6 py-4 font-semibold text-green-600">
                      $
                      {Number(
                        payment.amount
                      ).toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      {payment.paymentMethod ||
                        "Card"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          payment.paymentStatus ===
                          "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {
                          payment.paymentStatus
                        }
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {new Date(
                        payment.paymentDate
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}