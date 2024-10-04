"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import SearchForSmallScreen from "./SearchForSmallScreen";
import { SlMenu } from "react-icons/sl";
import { IoCloseCircleOutline } from "react-icons/io5";

const Header = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <header className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50">
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
      <div className="relative flex-1 max-w-xl hidden sm:block mx-4">
        <input
          type="text"
          placeholder="Search Products, Categories, Brands and More"
          className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none focus:border-gray-500 text-sm"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none">
          <FaSearch size={20} />
        </button>
      </div>

      {/* Search for small screens */}
      <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
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

      {/* Hamburger for smaller screens */}
      <div className="sm:hidden block">
        <div className="text-white ">
          <SlMenu size={24} onClick={() => setToggleMenu((prev) => !prev)} />
        </div>
      </div>

      {/* Side bar for smaller screens */}
      <div
        className={`fixed top-0 right-0 h-screen w-[80%] bg-gradient-to-r from-[#24246C] to-[#5A43AF] z-50 transform ${
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

        {/* Navbar items for mobile devices */}
        <div className="flex flex-col justify-between h-full py-5 px-3">
          {/* Add your navigation or other content for mobile here */}
        </div>
      </div>

      {/* Navigation Links for large screens */}
      <nav className="hidden md:flex items-center gap-8 text-white">
        <a href="#" className="relative group hover:text-gray-300">
          Home
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </a>
        <a href="#" className="relative group hover:text-gray-300">
          About
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </a>
        <a href="#" className="relative group hover:text-gray-300">
          Product
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </a>
        <a href="#" className="relative group hover:text-gray-300">
          Processing
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </a>
        <a href="#" className="relative group hover:text-gray-300">
          Fencing
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
        </a>

        {/* Wishlist Icon */}
        <div className="relative">
          <FaHeart size={20} className="text-white" />
          <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-xs rounded-full text-white h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* Cart Icon */}
        <div className="relative">
          <FaShoppingCart size={20} className="text-white" />
          <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-xs rounded-full text-white h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
