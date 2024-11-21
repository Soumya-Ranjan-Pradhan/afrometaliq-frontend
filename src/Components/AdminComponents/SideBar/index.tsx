"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiHome,
  FiShoppingBag,
  FiTag,
  FiUser,
  FiRefreshCcw,
  FiPlus,
  FiFileText,
  FiCreditCard,
  FiBook,
  FiTrendingUp,
  FiUsers,
  FiMessageCircle,
  FiSettings,
  FiLogOut,
  FiLifeBuoy,
  FiChevronUp,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";
import Image from "next/image";

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [isContentOpen, setIsContentOpen] = useState<boolean>(false);

  return (
    <>
      {/* Navbar for mobile view */}
      <nav className="lg:hidden  text-white bg-red-500 w-full h-20 fixed top-0 left-0 right-0 z-50 flex items-center">
        <button className="border-0" onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={30} color="black" className="ml-4" />
        </button>

        <Image
          alt="Arfo Metaliq Logo"
          width={200}
          height={120}
          src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1732213762/tv99udrhtcywxvly42lx.png"
          className="object-contain rounded-full mx-auto absolute"
        />
      </nav>

      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="w-64 relative bg-gray-100 h-full shadow-md flex flex-col z-50">
          <div className="flex items-center   justify-center p-4">
            <Image
              src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1732213762/tv99udrhtcywxvly42lx.png"
              alt="Arfo Metaliq Logo"
              width={300}
              height={120}
              className="absolute mt-14 object-contain rounded-full mx-auto"
            />
          </div>
          <nav className="flex-grow px-4 pb-4 mt-20 overflow-y-auto">
            <Link
              href="/dashboard"
              className="flex items-center p-2 text-black hover:bg-green-300 rounded"
            >
              <FiHome className="mr-3" /> Home
            </Link>

            {/* Shop Menu */}
            <button
              onClick={() => setIsShopOpen(!isShopOpen)}
              className="w-full flex items-center justify-between p-2 text-black hover:bg-green-300 rounded"
            >
              <span className="flex items-center">
                <FiShoppingBag className="mr-3" /> Shop
              </span>
              <span>{isShopOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
            </button>
            <div
              className={`transition-all overflow-hidden ${
                isShopOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } duration-300`}
            >
              <div className="ml-4">
                <Link
                  href="/product"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <FiTag className="mr-3" /> Products
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <FiFileText className="mr-3" /> Orders
                </Link>
                <Link
                  href="/coupons"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <FiTag className="mr-3" /> Coupons
                </Link>
              </div>
            </div>

            {/* Content Menu */}
            <button
              onClick={() => setIsContentOpen(!isContentOpen)}
              className="w-full flex items-center justify-between p-2 text-black hover:bg-green-300 rounded"
            >
              <span className="flex items-center">
                <FiFileText className="mr-3" /> Content
              </span>
              <span>{isContentOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
            </button>
            <div
              className={`transition-all overflow-hidden ${
                isContentOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } duration-300`}
            >
              <div className="ml-4">
                <Link
                  href="/media"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <FiFileText className="mr-3" /> Media
                </Link>
                <Link
                  href="/article"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <FiFileText className="mr-3" /> Article
                </Link>
              </div>
            </div>

            <Link
              href="/support"
              className="flex items-center p-2 text-black hover:bg-green-300 rounded"
            >
              <FiLifeBuoy className="mr-3" /> Support
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
