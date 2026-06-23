export default function PaymentHistory() {
  const payments = [
    {
      amount: "$400",
      date: "2026-06-22",
      status: "Paid",
    },
    {
      amount: "$250",
      date: "2026-06-18",
      status: "Paid",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Payment History
      </h1>

      <div className="space-y-4">

        {payments.map((payment, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow flex justify-between"
          >
            <span>{payment.amount}</span>
            <span>{payment.date}</span>
            <span>{payment.status}</span>
          </div>
        ))}

      </div>
    </div>
  );
}