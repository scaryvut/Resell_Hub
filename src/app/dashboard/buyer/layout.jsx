import DashboardSidebar from "@/Component/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}