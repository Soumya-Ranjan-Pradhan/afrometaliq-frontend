"use client";

import AdminHeader from "@/Components/AdminComponents/AdminHeader";
import AdminSidebar from "@/Components/AdminComponents/SideBar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />
        
        {/* Content */}
        <main className="p-4 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

