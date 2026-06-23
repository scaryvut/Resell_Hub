export default function SellerOrders() {
  const orders = [
    { id: 1, buyer: "John", status: "Pending" },
    { id: 2, buyer: "Sarah", status: "Shipped" },
  ];

  return (
    <div className="space-y-4">

      <h1 className="text-xl font-bold">Manage Orders</h1>

      {orders.map((o) => (
        <div key={o.id} className="p-4 border rounded flex justify-between">

          <div>
            <p>Buyer: {o.buyer}</p>
            <p>Status: {o.status}</p>
          </div>

          <div className="flex gap-2">
            <button className="px-3 py-1 bg-green-500 text-white rounded">
              Accept
            </button>

            <button className="px-3 py-1 bg-red-500 text-white rounded">
              Reject
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}