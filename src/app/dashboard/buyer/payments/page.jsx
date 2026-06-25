"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { RotateLoader } from "react-spinners";
import {
  FaMoneyCheckAlt,
  FaWallet,
  FaCreditCard,
} from "react-icons/fa";

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
        setPayments(
          Array.isArray(data)
            ? data
            : []
        );

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [session]);

  if (loading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <RotateLoader color="#2563eb" />
      </div>
    );
  }

  const totalAmount =
    payments.reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0
    );

  const latestPayment =
    payments.length > 0
      ? payments[0]
      : null;

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">
          Payment History
        </h1>

        <p className="text-gray-500 mt-2">
          View all payment records.
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between">
            <div>
              <p>Total Payments</p>

              <h2 className="text-3xl font-bold mt-2">
                {payments.length}
              </h2>
            </div>

            <FaMoneyCheckAlt size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between">
            <div>
              <p>Total Amount</p>

              <h2 className="text-3xl font-bold mt-2">
                ৳
                {totalAmount.toLocaleString()}
              </h2>
            </div>

            <FaWallet size={40} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between">
            <div>
              <p>Latest Payment</p>

              <h2 className="text-xl font-bold mt-2">
                {latestPayment
                  ? latestPayment.transactionId?.slice(
                      0,
                      10
                    )
                  : "N/A"}
              </h2>
            </div>

            <FaCreditCard size={40} />
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="font-bold text-xl">
            Payment Records
          </h2>
        </div>

        {payments.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No Payment Found
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left p-4">
                    Transaction ID
                  </th>

                  <th className="text-left p-4">
                    Order ID
                  </th>

                  <th className="text-left p-4">
                    Amount
                  </th>

                  <th className="text-left p-4">
                    Method
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-left p-4">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {payments.map(
                  (payment) => (
                    <tr
                      key={payment._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4 font-mono text-sm">
                        {
                          payment.transactionId
                        }
                      </td>

                      <td className="p-4">
                        {payment.orderId}
                      </td>

                      <td className="p-4 font-semibold text-green-600">
                        ৳
                        {Number(
                          payment.amount
                        ).toLocaleString()}
                      </td>

                      <td className="p-4">
                        {payment.paymentMethod ||
                          "Stripe"}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                      <td className="p-4 text-gray-500">
                        {payment.paymentDate
                          ? new Date(
                              payment.paymentDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}