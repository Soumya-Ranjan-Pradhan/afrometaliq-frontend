"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { useAuthStore } from "@/store/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { useLogout } from "@/api/auth/queries/authQuery";
import Link from "next/link";
import { useGlobalStore } from "@/store/global";

const UserMenu = () => {
  const user = useAuthStore((state) => state.user);
  const { isComingSoon, setIsComingSoon } = useGlobalStore();

  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    user?._id && (
      <Popover>
        <PopoverTrigger>
          <Avatar className="w-10 h-10 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <Link href="/profile">
              <AvatarFallback>
                {user?.username
                  ? (user.username as string).charAt(0).toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Link>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className=" w-72  rounded-lg text-black z-50">
            {/* <p className="font-semibold">Welcome</p>
            <p className="text-sm text-gray-600 mb-2">
              To access account and manage orders
            </p> */}
            <p className="font-semibold text-lg ">{user?.username}</p>
            <p className=" text-sm mb-4">{user?.email}</p>
            <button
              className=" border border-blue-950 py-1 px-4 rounded-sm mb-2"
              onClick={handleLogout}
            >
              Logout
            </button>
            <ul className="text-sm">
              {/* <Link href="/orders" className="py-1 border-b cursor-pointer"> */}
                <p className="py-1 border-b cursor-pointer" onClick={() => setIsComingSoon(true)}>Orders</p>
              {/* </Link> */}
              <Link href="/contact" className="py-1 border-b">
                <p>Contact Us</p>
              </Link>

              {/* <li className="py-1">
          <a href="#">Myntra Insider</a>
          <span className="text-red-500 ml-2 text-xs">New</span>
        </li> */}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    )
  );
};

export default UserMenu;
