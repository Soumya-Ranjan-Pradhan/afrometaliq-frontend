// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   FiHome,
//   FiShoppingBag,
//   FiTag,
//   FiLifeBuoy,
//   FiChevronUp,
//   FiChevronDown,
//   FiMenu,
// } from "react-icons/fi";
// import Image from "next/image";
// import { BiCategoryAlt } from "react-icons/bi";
// import { MdOutlineProductionQuantityLimits } from "react-icons/md";
// import { MdAcUnit } from "react-icons/md";
// import { MdOutlineCategory } from "react-icons/md";
// import { TbCategoryPlus } from "react-icons/tb";
// import { FaFirstOrder } from "react-icons/fa";
// import { LuListOrdered } from "react-icons/lu";
// import { FaUserCheck } from "react-icons/fa6";
// import { FaUserCog } from "react-icons/fa";
// import { RiContactsBook3Line } from "react-icons/ri";
// import { TfiGallery } from "react-icons/tfi";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { FiAlertOctagon } from "react-icons/fi";
// import { TbListDetails } from "react-icons/tb";
// import { MdOutlineCloudUpload } from "react-icons/md";

// const AdminSidebar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
//   const [isContentOpen, setIsContentOpen] = useState<boolean>(false);
//   const [ordersOpen, setOrdersOpen] = useState<boolean>(false);
//   const [user, setUser] = useState<boolean>(false);
//   const [galleryOpen, setGalleryOpen] = useState<boolean>(false);

//   return (
//     <>
//       {/* Navbar for mobile view */}
//       <nav className="lg:hidden  text-white bg-white w-full h-20 fixed  z-50 flex items-center">
//         <button className="border-0" onClick={() => setIsOpen(!isOpen)}>
//           <FiMenu size={30} color="black" className="ml-4" />
//         </button>

//         <Image
//           alt="Arfo Metaliq Logo"
//           width={250}
//           height={120}
//           src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1732213762/tv99udrhtcywxvly42lx.png"
//           className="object-contain rounded-full mx-auto pr-4"
//         />
//       </nav>

//       <div
//         className={`fixed inset-y-0 left-0 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
//       >
//         <div className="w-64 relative bg-gray-100 h-full shadow-md flex flex-col z-50">
//           <div className="flex items-center   justify-center p-4">
//             <Image
//               src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1741001860/gg2m37yby4apt0febngh.png"
//               alt="Arfo Metaliq Logo"
//               width={180}
//               height={180}
//               className="absolute mt-14 object-contain rounded-full mx-auto"
//             />
//           </div>
//           <nav className="flex-grow px-4 pb-4 mt-20 overflow-y-auto">
//             <Link
//               href="/admin/dashboard"
//               className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//             >
//               <FiHome className="mr-3" /> Home
//             </Link>

//             {/* Shop Menu */}
//             <button
//               onClick={() => setIsShopOpen(!isShopOpen)}
//               className="w-full flex items-center justify-between p-2 text-black hover:bg-green-300 rounded"
//             >
//               <span className="flex items-center">
//                 <FiShoppingBag className="mr-3" /> Shop
//               </span>
//               <span>{isShopOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
//             </button>
//             <div
//               className={`transition-all overflow-hidden ${
//                 isShopOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//               } duration-300`}
//             >
//               <div className="ml-4">
//                 <Link
//                   href="/admin/products/add"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <FiTag className="mr-3" /> Products
//                 </Link>

//                 <Link
//                   href="/admin/units"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <MdAcUnit className="mr-3" /> Add Units
//                 </Link>

//                 {/* <Link
//                   href="/productcodes"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <RiCodeSSlashFill className="mr-3" /> Product Codes
//                 </Link> */}

//                 <Link
//                   href="/admin/allproducts"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <MdOutlineProductionQuantityLimits className="mr-3" /> All
//                   Products
//                 </Link>
//               </div>
//             </div>

//             {/* Category Menu */}
//             <button
//               onClick={() => setIsContentOpen(!isContentOpen)}
//               className="w-full flex items-center justify-between p-2 text-black hover:bg-green-300 rounded"
//             >
//               <span className="flex items-center">
//                 <MdOutlineCategory className="mr-3" /> Categories
//               </span>
//               <span>{isContentOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
//             </button>
//             <div
//               className={`transition-all overflow-hidden ${
//                 isContentOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//               } duration-300`}
//             >
//               <div className="ml-4">
//                 <Link
//                   href="/admin/categories"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <BiCategoryAlt className="mr-3" /> Add Categories
//                 </Link>
//                 <Link
//                   href="/admin/subcategory"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <TbCategoryPlus className="mr-3" />
//                   Add SubCategory
//                 </Link>
//               </div>
//             </div>

//             {/* Orders Menu */}
//             <button
//               onClick={() => setOrdersOpen(!ordersOpen)}
//               className="w-full flex items-center justify-between p-2 text-black hover:bg-green-300 rounded"
//             >
//               <span className="flex items-center">
//                 <FaFirstOrder className="mr-3" /> Orders
//               </span>
//               <span>{ordersOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
//             </button>
//             <div
//               className={`transition-all overflow-hidden ${
//                 ordersOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//               } duration-300`}
//             >
//               <div className="ml-4">
//                 <Link
//                   href="/admin/orderlists"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <LuListOrdered className="mr-3" /> Order List
//                 </Link>
//               </div>
//             </div>

//             {/* Users Menu */}
//             <button
//               onClick={() => setUser(!user)}
//               className="w-full flex items-center justify-between p-2 text-black hover:bg-green-300 rounded"
//             >
//               <span className="flex items-center">
//                 <FaUserCheck className="mr-3" /> All Users
//               </span>
//               <span>{user ? <FiChevronUp /> : <FiChevronDown />}</span>
//             </button>
//             <div
//               className={`transition-all overflow-hidden ${
//                 user ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//               } duration-300`}
//             >
//               <div className="ml-4">
//                 <Link
//                   href="/admin/users"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <FaUserCog className="mr-3" /> Users
//                 </Link>
//               </div>

//               <div className="ml-4">
//                 <Link
//                   href="/admin/aboutus"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <FiAlertOctagon className="mr-3" /> About Us
//                 </Link>
//               </div>

//               <div className="ml-4">
//                 <Link
//                   href="/admin/userscontact"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <RiContactsBook3Line className="mr-3" /> Contact No
//                 </Link>
//               </div>

//               <div className="ml-4">
//                 <Link
//                   href="/admin/customer"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <TbListDetails className="mr-3" /> Costumer Details
//                 </Link>
//               </div>
//             </div>

//             {/* Gallery Section */}
//             <button
//               onClick={() => setGalleryOpen(!galleryOpen)}
//               className="w-full flex items-center justify-between p-2 text-black hover:bg-green-300 rounded"
//             >
//               <span className="flex items-center">
//                 <TfiGallery className="mr-3" /> Add Gallery
//               </span>
//               <span>{galleryOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
//             </button>

//             <div
//               className={`transition-all overflow-hidden ${
//                 galleryOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//               } duration-300`}
//             >
//               <div className="ml-4">
//                 <Link
//                   href="/admin/uploadgallery"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <IoCloudUploadOutline className="mr-3" /> Gallery
//                 </Link>
//               </div>

//               <div className="ml-4">
//                 <Link
//                   href="/admin/banner"
//                   className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//                 >
//                   <MdOutlineCloudUpload className="mr-3" /> Upload Banner
//                 </Link>
//               </div>
//             </div>

//             <Link
//               href="/admin/support"
//               className="flex items-center p-2 text-black hover:bg-green-300 rounded"
//             >
//               <FiLifeBuoy className="mr-3" /> Support
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminSidebar;

"use client";

import {
  Book,
  Briefcase,
  ChevronDown,
  LayoutDashboard,
  PanelTop,
  Settings,
  SquareStack,
  Users,
  ShoppingCart,
  Tag,
  Folder,
  BarChart2,
  Star,
  Inbox,
  HelpCircle,
  Bookmark,
  UserCog,
  Cog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
// import { Avatar, AvatarImage  } from "@/Components/ui/avatar";
import Image from "next/image";
import {
  FiHome,
  FiShoppingBag,
  FiTag,
  FiLifeBuoy,
  FiChevronUp,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";

import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdAcUnit } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { FaFirstOrder } from "react-icons/fa";
import { LuListOrdered } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { TfiGallery } from "react-icons/tfi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FiAlertOctagon } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineCloudUpload } from "react-icons/md";

export default function AdminSidebar({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string | null>(pathname);

  const handleClick = (path: string) => {
    setActivePath((prev) => (prev === path ? null : path));
  };

  return (
    <aside
      className={`${
        mobile
          ? "flex h-full w-full flex-col px-4 py-4 bg-[#1E2753] text-white"
          : "fixed top-0 left-0 z-20 hidden h-full w-64 flex-col justify-between bg-[#1E2753] px-4 py-4 shadow-sm md:flex text-white"
      }`}
    >
      <div>
        {/* Logo */}
        <div className="mb-8 flex items-center justify-between">
          <Image
            alt="Arfo Metaliq Logo"
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1732213762/tv99udrhtcywxvly42lx.png"
            width={100}
            height={100}
          />

          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>

        {/* Main Navigation */}
        <div className="space-y-1 text-sm">
          <SidebarLink
            href="/admin/dashboard"
            icon={<FiHome size={18} />}
            label="Home"
            // badge="16"
            activePath={activePath}
            handleClick={handleClick}
          />

          <SidebarLink
            href="/admin/orders"
            icon={<ShoppingCart size={18} />}
            label="Orders"
            badge="16"
            activePath={activePath}
            handleClick={handleClick}
          />
          <SidebarLink
            href="/admin/products/add"
            icon={<Tag size={18} />}
            label="Products"
            activePath={activePath}
            handleClick={handleClick}
          />
          <SidebarLink
            href="/admin/categories"
            icon={<Folder size={18} />}
            label="Categories"
            activePath={activePath}
            handleClick={handleClick}
          />
          <SidebarLink
            href="/admin/allproducts"
            icon={<MdOutlineProductionQuantityLimits size={18} />}
            label="All Products"
            activePath={activePath}
            handleClick={handleClick}
          />
          <SidebarLink
            href="/admin/units"
            icon={<MdAcUnit size={18} />}
            label="Add Unit"
            activePath={activePath}
            handleClick={handleClick}
          />
          <SidebarLink
            href="/admin/reports"
            icon={<BarChart2 size={18} />}
            label="Reports"
            activePath={activePath}
            handleClick={handleClick}
          />
          <SidebarLink
            href="/admin/inbox"
            icon={<Inbox size={18} />}
            label="Inbox"
            activePath={activePath}
            handleClick={handleClick}
          />
        </div>

        {/* Vendor Information*/}
        <div className="mt-6 text-sm">
          <p className="mb-2 mt-4 text-xs text-gray-400 uppercase">
            Users Information
          </p>
          <SidebarLink
            href="/admin/users"
            icon={<Briefcase size={18} />}
            label="Users"
            activePath={activePath}
            handleClick={handleClick}
          />
          <SidebarLink
            href="/admin/aboutus"
            icon={<FiAlertOctagon size={18} />}
            label="About Us"
            activePath={activePath}
            handleClick={handleClick}
          />

          <SidebarLink
            href="/admin/customer"
            icon={<RiContactsBook3Line size={18} />}
            label="Customer Message"
            activePath={activePath}
            handleClick={handleClick}
          />
        </div>

        <div className="mt-6 text-sm">
          <p className="mb-2 mt-4 text-xs text-gray-400 uppercase">
            Gallery Section
          </p>
          <SidebarLink
            href="/admin/uploadgallery"
            icon={<IoCloudUploadOutline size={18} />}
            label="Upload Gallery"
            activePath={activePath}
            handleClick={handleClick}
          />
          <SidebarLink
            href="/admin/banner"
            icon={<MdOutlineCloudUpload size={18} />}
            label="Global Settings"
            activePath={activePath}
            handleClick={handleClick}
          />
        </div>

        {/* Settings */}
        <div className="mt-6 text-sm">
          <p className="mb-2 mt-4 text-xs text-gray-400 uppercase">Settings</p>
          <SidebarLink
            href="/admin/personal-settings"
            icon={<UserCog size={18} />}
            label="Personal Settings"
            activePath={activePath}
            handleClick={handleClick}
          />
          <SidebarLink
            href="/admin/global-settings"
            icon={<Cog size={18} />}
            label="Global Settings"
            activePath={activePath}
            handleClick={handleClick}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 border-t border-gray-700 pt-4">
        {/* <Avatar className="h-8 w-8">
          <AvatarImage src="https://i.pravatar.cc/40" alt="shadcn" />
        </Avatar> */}
        <div className="text-sm">
          <p className="font-medium leading-tight">shadcn</p>
          <p className="text-xs text-gray-400">m@example.com</p>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400 ml-auto" />
      </div>
    </aside>
  );
}

const SidebarLink = ({
  href,
  icon,
  label,
  badge,
  activePath,
  handleClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  activePath: string | null;
  handleClick: (path: string) => void;
}) => {
  const isActive = activePath === href;

  return (
    <Link
      href={href}
      onClick={() => handleClick(href)}
      className={`flex items-center justify-between rounded px-2 py-2 text-sm transition ${
        isActive ? "bg-[#2c376b]" : "hover:bg-[#2c376b]"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge && (
        <span className="ml-auto rounded-full bg-white text-[#1E2753] text-xs font-semibold px-2 py-0.5">
          {badge}
        </span>
      )}
    </Link>
  );
};
