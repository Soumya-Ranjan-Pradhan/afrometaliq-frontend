// "use client";
// import AdminHeader from "@/Components/AdminComponents/AdminHeader";
// import "../../globals.css";
// import AdminSidebar from "@/Components/AdminComponents/SideBar";
// import { useAuthStore } from "@/store/auth";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useGetLoggedUserDetails } from "@/api/auth/queries/authQuery";

// // export const metadata = {
// //   title: "Admin Panel",
// //   description: "Admin management area for the website.",
// // };

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const user = useAuthStore((state) => state.user);
//   const router = useRouter();

//   const { data: userData, isLoading } = useGetLoggedUserDetails();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!isLoading && !user) {
//       return router.push("/");
//     } else if (user && user.role !== "admin") {
//       return router.push("/");
//     }
//     setLoading(false);
//   }, [isLoading, router, user, userData]);
//   return (
//     <div className="flex h-screen bg-gray-50">
//       {(isLoading || loading) && (
//         <div className="h-screen w-screen bg-gray-100 z-50 flex items-center justify-center fixed top-0 left-0">
//           Loading...
//         </div>
//       )}
//       {/* Sidebar */}
//       <AdminSidebar />

//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <AdminHeader />

//         <main className="p-4 flex-1 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";
import AdminHeader from "@/Components/AdminComponents/AdminHeader";
import "../../globals.css";
import AdminSidebar from "@/Components/AdminComponents/SideBar";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetLoggedUserDetails } from "@/api/auth/queries/authQuery";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state: any) => state.user);
  const router = useRouter();

  const { data: userData, isLoading } = useGetLoggedUserDetails();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      return router.push("/");
    } else if (user && user.role !== "admin") {
      return router.push("/");
    }
    setLoading(false);
  }, [isLoading, router, user, userData]);

  if (isLoading || loading) {
    return (
      <div className="h-screen w-screen bg-gray-100 z-50 flex items-center justify-center fixed top-0 left-0">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="md:ml-64">
        <AdminHeader />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
