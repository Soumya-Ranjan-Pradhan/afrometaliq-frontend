// "use client";
// import UserMenu from "@/Components/Header/Sidebar/UserMenu";
// import React from "react";
// import { FaMoon, FaSun } from "react-icons/fa";

// const AdminHeader = () => {
//   return (
//     <header className="bg-white shadow w-full h-24 px-4 flex justify-between items-center">
//       {/* Left: Title */}
//       <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

//       {/* Right: Profile and Theme Switch */}
//       <div className="flex items-center space-x-4">
//         <button className="text-gray-600 hover:text-gray-900">
//           <FaMoon size={20} />
//         </button>
//         <button className="text-gray-600 hover:text-gray-900">
//           <FaSun size={20} />
//         </button>
//         <div className="flex items-center space-x-2">
//           {/* <div className="bg-gray-300 w-8 h-8 rounded-full"></div> */}
//           {/* <span className="text-gray-800 font-medium">Soumya</span> */}
//           <UserMenu />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;

"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Menu, Bell, MessageSquare, ChevronDown, Search } from "lucide-react";
import AdminSidebar from "../AdminSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import UserMenu from "@/Components/Header/Sidebar/UserMenu";

export default function AdminHeader() {
  return (
    <header className="fixed top-0 z-10 flex h-14 w-full items-center justify-between bg-[#1E2753] px-4 shadow-sm md:left-64 md:w-[calc(100%-16rem)]">
      {/* Left Section: Hamburger + Search */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <Menu className="h-6 w-6 text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <AdminSidebar mobile />
            </SheetContent>
          </Sheet>
        </div>

        {/* Search */}
        <div className="relative w-[180px] sm:w-[250px] md:w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-md bg-[#131835] pl-10 pr-3 py-1.5 text-sm text-white placeholder-gray-400 border border-[#2E365D] focus:outline-none focus:ring-1 focus:ring-white"
          />
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Icon with badge */}
        <div className="relative mt-2">
          <button className="text-gray-300 hover:text-white">
            <Bell className="h-5 w-5" />
          </button>
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] px-1.5 rounded-full">
            5
          </span>
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-2 text-white">
         <UserMenu/>
        </div>
      </div>
    </header>
  );
}
