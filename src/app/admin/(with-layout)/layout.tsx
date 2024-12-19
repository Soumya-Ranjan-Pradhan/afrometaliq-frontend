"use client";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import AdminHeader from "@/Components/AdminComponents/AdminHeader";
import "../../globals.css";
import AdminSidebar from "@/Components/AdminComponents/SideBar";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// export const metadata = {
//   title: "Admin Panel",
//   description: "Admin management area for the website.",
// };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  // useEffect(() => {
  //   if (user) {
  //     if (!user.isEmailVerified) {
  //       router.push("/email/verify");
  //     }
  //   } else {
  //     router.push("/");
  //   }
  // }, [router, user]);
  return (
   
          <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <AdminSidebar />

            <div className="flex-1 flex flex-col">
              {/* Header */}
              <AdminHeader />

              <main className="p-4 flex-1 overflow-y-auto">{children}</main>
            </div>
          </div>
       
  );
}
