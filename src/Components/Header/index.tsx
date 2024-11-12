"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import SearchForSmallScreen from "./SearchForSmallScreen";
import { SlMenu } from "react-icons/sl";
import { IoCloseCircleOutline } from "react-icons/io5";
import ProfileTooltip from "./ProfileTooltip/index";
import Link from "next/link";

import { IoMenu } from "react-icons/io5";
import { RiBallPenLine } from "react-icons/ri";
import { MdLockOutline } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import Categories from "../Categories";

const Header = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState<boolean>(false);

  return (
    <>
      {/* For the Large Screen */}
      <header className="w-full flex items-center justify-between p-1 bg-white shadow-md">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <Image
              src="https://res.cloudinary.com/dndq25au1/image/upload/v1729361117/d6zwh0crdjjhmrtzfzkj.jpg"
              alt="Arfo Metaliq Logo"
              width={190}
              height={190}
            />
          </Link>
        </div>

        {/* Center - Search bar large screen */}
        <div className="hidden lg:flex items-center w-full max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search Products, Categories, Brands and More"
            className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none"
          />
          <button className="px-4 py-2 bg-[#605AC5] text-white rounded-r-full">
            <IoIosSearch className="text-2xl" />
          </button>
        </div>

        {/* Right side - Register and Login large screen */}
        <div className=" flex items-center space-x-4 text-blue-600 mr-3">
          <Link href="/signup" className="flex items-center space-x-1">
            <RiBallPenLine className="text-2xl" />
            <span className="text-sm">Register</span>
          </Link>
          <Link href="/signin" className="flex items-center space-x-1">
            <MdLockOutline className="text-2xl" />
            <span className="text-sm">Log in</span>
          </Link>
        </div>
      </header>

      {/* For The Large Screen */}
      <nav
        className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] lg:h-[4rem] md:h-[4rem] sm:h-[3rem] h-[64px] flex justify-between 
    items-center  sm:gap-5 gap-2 sticky top-0 z-50"
      >
        {/* Category Section */}
        <div className="hidden lg:flex items-center gap-3 cursor-pointer bg-[#141334] pl-3 pr-3 pt-1 pb-1 ml-4  ">
          <IoMenu className="text-white text-4xl" />

          <p className="text-white font-semibold text-md">Shope by Category</p>
        </div>

        {/* Navigation Links for large screens */}
        <nav className="hidden lg:flex items-center gap-8 text-white p-4">
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
          <Link href="/product" className="relative group hover:text-gray-300">
            Product
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
          </Link>

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
            <Link href="/cart">
              <FaShoppingCart size={20} className="text-white" />
            </Link>
            <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-xs rounded-full text-white h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
        </nav>

        {/* Search for small and medium screens - Hidden on lg screens */}
        <div className="text-white w-full flex items-center justify-between  lg:hidden ml-6">
          {openSearch && (
            <SearchForSmallScreen
              open={openSearch}
              setOpenSearch={setOpenSearch}
            />
          )}

          <div className="text-white  mr-3">
            <SlMenu size={24} onClick={() => setToggleMenu((prev) => !prev)} />
          </div>
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
            {showProfileTooltip && <ProfileTooltip />}
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

          <CiSearch
            size={30}
            fontWeight={"bold"}
            onClick={() => setOpenSearch((prev) => !prev)}
            className="text-white mr-7"
          />
        </div>

        {/* Sidebar for small and medium screens */}
        <div
          className={`fixed top-0 right-0 h-screen w-[100%] bg-gradient-to-r from-[#24246C] to-[#5A43AF] 
        z-50 transform ${
          toggleMenu ? "translate-x-0" : "-translate-x-full"
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
          <div className="text-white p-3">
            <Categories />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
