"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiHome6Line } from "react-icons/ri";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { TfiGallery } from "react-icons/tfi";
import { MdShoppingBag } from "react-icons/md";
import { useGetLoggedUserDetails } from "@/api/auth/queries/authQuery";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/store/global";
import { useAuthStore } from "@/store/auth";
import { useCartQuery } from "@/api/cart/query/useCartQuery";
import { MdPhotoLibrary } from "react-icons/md";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { data, isLoading, isError } = useCartQuery();
  const [cartCount, setCartCount] = useState<number>(0);

  const setComingSoon = useGlobalStore((state) => state.setIsComingSoon);

  const { data: userData } = useGetLoggedUserDetails({});
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    if (user && data && data.data?.cart) {
      const count = data.data.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartCount(count);
    } else {
      setCartCount(0);
    }
  }, [user, data]);

  useEffect(() => {
    if (userData) {
      if (userData?.data.user.isEmailVerified) {
        console.log("LAYOUT ===========", "User is verified");
      } else {
        router.replace("/email/verify");
      }
    }
  }, [userData]);

  return (
    <>
      {/* Bottom navigation for mobile screens */}
      <div
        className="border-t-2 text-white h-16 sm:hidden z-20 p-1 w-full flex 
        justify-around fixed bottom-0 bg-gradient-to-r from-[#24246C] to-[#5A43AF]"
      >
        {/* Home Icon (Always Active) */}
        <Link
          href="/"
          className="flex flex-col items-center gap-1 cursor-pointer p-1"
        >
          <div
            className={`relative ${
              pathname === "/" ? "text-purple-500" : "text-white"
            }`}
          >
            <RiHome6Line size={25} />
          </div>
          <span className="text-sm">Home</span>
        </Link>

        {/* Product Icon */}
        <Link
          href="/product"
          className="flex flex-col items-center gap-1 cursor-pointer p-1"
        >
          <div
            className={`relative ${
              pathname === "/product" ? "text-purple-500" : "text-white"
            }`}
          >
            <MdShoppingBag size={25} />
          </div>
          <span className="text-sm">Product</span>
        </Link>

        {/* Gallery Icon */}
        <Link
          href="/gallery"
          className="flex flex-col items-center gap-1 cursor-pointer p-1"
        >
          <div
            className={`relative ${
              pathname === "/gallery" ? "text-purple-500" : "text-white"
            }`}
          >
            <MdPhotoLibrary size={25} />
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
              pathname === "/cart" ? "text-purple-500" : "text-white"
            }`}
          >
            <FaShoppingCart size={25} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-sm">Cart</span>
        </Link>

        {/* Account Icon */}
        <Link
          href="/profile"
          className="flex flex-col items-center gap-1 cursor-pointer p-1"
        >
          <div
            className={`relative ${
              pathname === "/profile" ? "text-purple-500" : "text-white"
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
