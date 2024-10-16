"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import SearchForSmallScreen from "./SearchForSmallScreen";
import { SlMenu } from "react-icons/sl";
import { IoCloseCircleOutline } from "react-icons/io5";
import ProfileTooltip from "./ProfileTooltip/index";

type TooltipData = Record<string, string[]>;

const tooltipData: TooltipData = {
  "ANGLES": ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
  "CHANNEL IRON": ["Item 6", "Item 7", "Item 8", "Item 9", "Item 10"],
  "FLAT BAR": ["Item 11", "Item 12", "Item 13", "Item 14", "Item 15"],
  // Add data for other products
};

const Header = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  console.log({ hoveredItem })

  return (
    <header
      className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] flex justify-between 
      items-center p-4 sm:gap-5 gap-2 sticky top-0 z-50"
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 cursor-pointer">
        <Image
          src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1726587467/mbly5bbfcpwdut9kn4be.png"
          alt="logo"
          width={100}
          height={100}
        />
      </div>

      {/* Search for large screens */}
      <div className="relative flex-1 max-w-xl hidden lg:block mx-4">
        <input
          type="text"
          placeholder="Search Products, Categories, Brands and More"
          className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none focus:border-gray-500 text-sm"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none">
          <FaSearch size={20} />
        </button>
      </div>

      {/* Navigation Links for large screens */}
      <nav className="hidden lg:flex items-center gap-8 text-white">
        <a href="#" className="relative group hover:text-gray-300">
          Home
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </a>
        <a href="#" className="relative group hover:text-gray-300">
          About
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </a>
        <a href="#" className="relative group hover:text-gray-300">
          Fencing
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </a>
        <a href="#" className="relative group hover:text-gray-300">
          Processing
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </a>
        <a href="#" className="relative group hover:text-gray-300" onMouseEnter={() => setToggleMenu((prev) => !prev)}>
          Product
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </a>

        {/* Profile Icon */}
        <div
          className="relative hidden lg:block"
          onMouseEnter={() => setShowProfileTooltip(true)}
          onMouseLeave={() => setShowProfileTooltip(false)}
        >
          <FaUser size={20} className="text-white" />
          {showProfileTooltip && <ProfileTooltip />} {/* Show Tooltip */}
        </div>

        {/* Wishlist Icon */}
        <div className="relative hidden lg:block">
          <FaHeart size={20} className="text-white" />
          <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-xs rounded-full text-white h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* Cart Icon */}
        <div className="relative hidden lg:block">
          <FaShoppingCart size={20} className="text-white" />
          <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-xs rounded-full text-white h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>
      </nav>

      {/* Search for small and medium screens - Hidden on lg screens */}
      <div className="text-white w-full  inline-flex justify-end lg:hidden pr-1">
        <CiSearch
          size={30}
          fontWeight={"bold"}
          onClick={() => setOpenSearch((prev) => !prev)}
        />
        {openSearch && (
          <SearchForSmallScreen
            open={openSearch}
            setOpenSearch={setOpenSearch}
          />
        )}
      </div>

      {/* Hamburger for small and medium screens - Hidden on lg screens */}
      <div className="lg:hidden flex items-center gap-7">
        {/* Profile Icon */}
        <div
          className="relative hidden  sm:block"
          onMouseEnter={() => setShowProfileTooltip(true)}
          onMouseLeave={() => setShowProfileTooltip(false)}
        >
          <FaUser size={20} className="text-white" />
          {showProfileTooltip && <ProfileTooltip />} {/* Show Tooltip */}
        </div>
        {/* Wishlist Icon */}
        <div className="relative hidden sm:block">
          <FaHeart size={20} className="text-white" />
          <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-xs rounded-full text-white h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* Cart Icon */}
        <div className="relative hidden sm:block">
          <FaShoppingCart size={20} className="text-white" />
          <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-xs rounded-full text-white h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>
        <div className="text-white ">
          <SlMenu size={24} onClick={() => setToggleMenu((prev) => !prev)} />
        </div>
      </div>

      {/* Sidebar for small and medium screens */}
      <div
        className={`fixed top-0 right-0 h-screen w-[80%] lg:w-[30%] bg-gradient-to-r from-[#24246C] to-[#5A43AF] 
          z-50 transform ${toggleMenu ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out`}
      >
        <div className="flex items-center justify-between h-[62px] px-3 border-b text-white">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1726587467/mbly5bbfcpwdut9kn4be.png"
            alt="logo"
            width={100}
            height={100}
          />
          <IoCloseCircleOutline
            size={35}
            onClick={() => setToggleMenu((prev) => !prev)}
          />
        </div>
        {/* Product sections */}
        <div className="px-4 py-4 overflow-y-scroll text-white h-[calc(100vh-62px)]">
          {/* Section 1: HOT-ROLLED STEEL SECTIONS */}
          <h2 className="font-bold text-lg">HOT-ROLLED STEEL SECTIONS</h2>
          <ul className="list-disc ml-5">
            {["ANGLES", "CHANNEL IRON", "FLAT BAR"].map((item) => (
              <li
                key={item}
                className="relative cursor-pointer"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item}
                {/* Tooltip */}
                {hoveredItem === item && (
                  <div className={`absolute top-0 
                    -translate-x-[-70%] w-48 
                    lg:-translate-x-[-50%] lg:w-40
                    p-2 bg-gradient-to-r from-[#353590] to-[#6A5EC8] 
                    text-white rounded-lg shadow-md transition-all 
                    duration-300 transform z-10`}>
                    <ul className="space-y-1">
                      {tooltipData[hoveredItem]
                        .map((tooltipItem: string, index: number) => {
                          console.log({ tooltipItem })
                          return (
                            <li key={index}>{tooltipItem}</li>
                          )
                        })}
                    </ul>
                    <button className="mt-2 text-blue-500 underline">
                      See More
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
