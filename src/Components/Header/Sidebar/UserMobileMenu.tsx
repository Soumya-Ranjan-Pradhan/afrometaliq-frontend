"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { useAuthStore } from "@/store/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

const UserMobileMenu = () => {
  const user = useAuthStore((state) => state.user);
  return (
    user?._id && (
      <Popover>
        <PopoverTrigger>
          <Avatar className="w-10 h-10 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
        </PopoverTrigger>
      </Popover>
    )
  );
};

export default UserMobileMenu;
