import ReactQueryProvider from "@/context/ReactQueryProvider";
import AdminHeader from "@/Components/AdminComponents/AdminHeader";
import "../globals.css";
import AdminSidebar from "@/Components/AdminComponents/SideBar";

export const metadata = {
  title: "Admin Panel",
  description: "Admin management area for the website.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 h-screen">
        <ReactQueryProvider>
          <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <AdminSidebar />

            <div className="flex-1 flex flex-col">
              {/* Header */}
              <AdminHeader />

              <main className="p-4 flex-1 overflow-y-auto">{children}</main>
            </div>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
