"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import SearchForSmallScreen from "./SearchForSmallScreen";
import { SlMenu } from "react-icons/sl";
import { IoCloseCircleOutline } from "react-icons/io5";
import ProfileTooltip from "./ProfileTooltip/index"; 
import Link from "next/link";

const Header = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState<boolean>(false); 

  return (
    <header
      className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] flex justify-between 
      items-center p-4 sm:gap-5 gap-2 sticky top-0 z-50"
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 cursor-pointer">
        <Image
          src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1729019417/jh1hondltohvzscoynrf.png"
          alt="logo"
          width={150}
          height={150}
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
        <Link href="/" className="relative group hover:text-gray-300">
          Home
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </Link>
        <Link href="/about" className="relative group hover:text-gray-300">
          About
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </Link>
        <Link href="/gallery" className="relative group hover:text-gray-300">
          Gallery
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </Link>
        <Link href="#" className="relative group hover:text-gray-300">
          Fabrication
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </Link>
        <a href="#" className="relative group hover:text-gray-300">
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
        className={`fixed top-0 right-0 h-screen w-[80%] bg-gradient-to-r from-[#24246C] to-[#5A43AF] 
          z-50 transform ${
            toggleMenu ? "translate-x-0" : "translate-x-full"
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
      </div>
    </header>
  );
};

export default Header;
