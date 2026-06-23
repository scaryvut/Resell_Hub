import AdminSidebar from "@/Component/dashboard/AdminSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />

      <main className="flex-1 min-h-screen bg-gray-50 p-6">
        {children}
      </main>
    </div>
  );
}