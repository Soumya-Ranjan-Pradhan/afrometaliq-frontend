"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { RiHome6Line } from "react-icons/ri";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { TfiGallery } from "react-icons/tfi";
import { useGetLoggedUserDetails } from "@/api/auth/queries/authQuery";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/store/global";
import { useAuthStore } from "@/store/auth";
import UserMenu from "./UserMenu";

const Sidebar = () => {
  //! Usage: You can use this information to change the appearance of components, such as highlighting a menu item in a navigation bar based on the current page.
  const pathname = usePathname();

  const setComingSoon = useGlobalStore((state) => state.setIsComingSoon);

  const handleClick = () => {
    setComingSoon(true);
  };

  // let token;
  // if (window) {
  //   token = window.localStorage.getItem("accessToken");
  // }

  const { data: userData } = useGetLoggedUserDetails({
    // enabled: !!token,
  });

  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    if (userData) {
      if (userData?.data.user.isEmailVerified) {
        console.log("LAYOUT ===========", "User is verified");
        // router.push("/");
      } else {
        router.replace("/email/verify");
      }
    }
  }, [userData]);

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
        <div className="flex flex-col items-center gap-1 cursor-pointer p-1">
          <div className={"relative text-purple-500 "}>
            <FaShoppingCart size={25} onClick={handleClick} />

            {/* {cartQuantity > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartQuantity}
              </span>
            )} */}
          </div>
          <span className="text-sm">Cart</span>
        </div>

        {/* Account Icon */}
        <Link
          href="/profile"
          className="flex flex-col items-center gap-1 cursor-pointer p-1"
        >
          <div
            className={`relative ${
              pathname === "/profile" ? "text-purple-500" : ""
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
