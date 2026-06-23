import SellerSidebar from "@/Component/dashboard/SellerSidebar";

// app/dashboard/seller/layout.jsx
export default function SellerLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <SellerSidebar />

      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}