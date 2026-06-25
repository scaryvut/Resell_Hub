import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Success({ searchParams }) {
  const sessionId = searchParams?.session_id;

  if (!sessionId) {
    redirect("/buyer/orders");
  }

  let session;

  try {
    session = await stripe.checkout.sessions.retrieve(
      sessionId,
      {
        expand: ["payment_intent"],
      }
    );
  } catch (error) {
    console.error("Stripe Session Error:", error);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">
          Invalid Stripe Session
        </h1>
      </div>
    );
  }

  const transactionId =
    session.payment_intent?.id || "";

  const amount =
    (session.amount_total || 0) / 100;

  const email =
    session.customer_details?.email || "";

  const orderId =
    session.metadata?.orderId || "";

  try {
    // Save payment

    await fetch(
      "https://resell-hub-nine.vercel.app/payments",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          transactionId,
          buyerEmail: email,
          orderId,
          amount,
          paymentStatus: "paid",
          paymentMethod: "card",
          paymentDate: new Date(),
        }),
        cache: "no-store",
      }
    );

    // Update order

    if (orderId) {
      await fetch(
        `https://resell-hub-nine.vercel.app/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            paymentStatus: "paid",
            status: "processing",
            transactionId,
          }),
          cache: "no-store",
        }
      );
    }
  } catch (error) {
    console.error(
      "Database Update Error:",
      error
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl w-full">
        <div className="text-center">
          <div className="text-6xl mb-4">
            🎉
          </div>

          <h1 className="text-4xl font-bold text-green-600">
            Payment Successful
          </h1>

          <p className="text-gray-500 mt-2">
            Your payment has been
            processed successfully.
          </p>
        </div>

        <div className="mt-8 border rounded-xl p-5 space-y-3">
          <p>
            <strong>Order ID:</strong>{" "}
            {orderId}
          </p>

          <p>
            <strong>
              Transaction ID:
            </strong>{" "}
            {transactionId}
          </p>

          <p>
            <strong>Amount:</strong> $
            {amount.toFixed(2)}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {email}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            Paid
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date().toLocaleString()}
          </p>
        </div>

        <div className="flex gap-4 mt-8">
          <Link
            href="/buyer/orders"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg"
          >
            My Orders
          </Link>

          <Link
            href="/products"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}