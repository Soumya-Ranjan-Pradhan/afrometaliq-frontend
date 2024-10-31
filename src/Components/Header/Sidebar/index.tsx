"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { RiHome6Line } from "react-icons/ri";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { TfiGallery } from "react-icons/tfi";

const Sidebar = () => {
  //! Usage: You can use this information to change the appearance of components, such as highlighting a menu item in a navigation bar based on the current page.
  const pathname = usePathname();

  // Cart quantity for the FaShoppingCart icon (example: 3 items in the cart)
  const cartQuantity = 3;

  return (
    <>
      {/* Bottom navigation for mobile screens */}
      <div
        className="border-t-2 text-white h-16 sm:hidden z-20 p-1 w-full flex 
      justify-around fixed bottom-0 bg-gradient-to-r from-[#24246C] to-[#5A43AF]"
      >
        {/* Home Icon */}
        <Link
          href="/"
          className="flex flex-col items-center gap-1 cursor-pointer p-1"
        >
          <div
            className={`relative ${pathname === "/" ? "text-purple-500" : ""}`}
          >
            <RiHome6Line size={25} />
          </div>
          <span className="text-sm">Home</span>
        </Link>

        {/* Gallery Icon */}
        <Link
          href="/gallery"
          className="flex flex-col items-center gap-1 cursor-pointer p-1"
        >
          <div
            className={`relative ${
              pathname === "/gallery" ? "text-purple-500" : ""
            }`}
          >
            <TfiGallery size={25} />
          </div>
          <span className="text-sm">Gallery</span>
        </Link>

        {/* Cart Icon with Quantity */}
        <Link
          href="/cart"
          className="flex flex-col items-center gap-1 cursor-pointer p-1"
        >
          <div
            className={`relative ${
              pathname === "/cart" ? "text-purple-500" : ""
            }`}
          >
            <Link href="/cart">
              <FaShoppingCart size={25} />
            </Link>
            {cartQuantity > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartQuantity}
              </span>
            )}
          </div>
          <span className="text-sm">Cart</span>
        </Link>

        {/* Account Icon */}
        <Link
          href="/account"
          className="flex flex-col items-center gap-1 cursor-pointer p-1"
        >
          <div
            className={`relative ${
              pathname === "/account" ? "text-purple-500" : ""
            }`}
          >
            <FaUser size={25} />
          </div>
          <span className="text-sm">Account</span>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
