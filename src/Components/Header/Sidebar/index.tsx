"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import React from "react";
import { BiHistory } from "react-icons/bi";
import { IoFolderOutline } from "react-icons/io5";
import { RiHome6Line } from "react-icons/ri";
import { TbUserCheck } from "react-icons/tb";

const Sidebar = () => {
  //! Usage: You can use this information to change the appearance of components, such as highlighting a menu item in a navigation bar based on the current page.
  const pathname = usePathname();

  const bottomBarItems = [
    {
      icon: <RiHome6Line size={25} />,
      title: "Home",
      url: "/",
    },
    {
      icon: <BiHistory size={25} />,
      title: "History",
      url: "/history",
    },
    {
      icon: <IoFolderOutline size={25} />,
      title: "Collections",
      url: "/collections",
    },
    {
      icon: <TbUserCheck size={25} />,
      title: "Subscriptions",
      url: "/subscriptions",
    },
  ];

  return (
    <>
      {/* Bottom navigation for mobile screens */}
      <div
        className="border-t-2 text-white h-16 sm:hidden z-20 p-1 w-full flex 
      justify-around fixed bottom-0 bg-gradient-to-r from-[#24246C] to-[#5A43AF] "
      >
        {bottomBarItems.map((item) => (
          <Link href={item.url} key={item.title}>
            <div
              className={`flex flex-col items-center gap-1 cursor-pointer p-1 ${
                pathname === item.url ? "text-purple-500" : ""
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
