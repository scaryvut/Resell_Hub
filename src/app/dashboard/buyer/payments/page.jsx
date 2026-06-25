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
      });
  }, [session]);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading Payments...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Payment History
      </h1>

      {payments.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          No Payments Found
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white p-5 rounded-2xl shadow"
            >
              <div className="flex justify-between">
                <span className="font-semibold">
                  $
                  {payment.amount}
                </span>

                <span className="text-green-600">
                  {payment.paymentStatus}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-500">
                Transaction:
                {" "}
                {payment.transactionId}
              </div>

              <div className="text-sm text-gray-500">
                Order:
                {" "}
                {payment.orderId}
              </div>

              <div className="text-sm text-gray-500">
                {new Date(
                  payment.paymentDate
                ).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}