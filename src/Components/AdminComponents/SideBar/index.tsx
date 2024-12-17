"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiHome,
  FiShoppingBag,
  FiTag,
  FiLifeBuoy,
  FiChevronUp,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";
import Image from "next/image";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdAcUnit } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { FaFirstOrder } from "react-icons/fa";
import { LuListOrdered } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { TfiGallery } from "react-icons/tfi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FiAlertOctagon } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineCloudUpload } from "react-icons/md";

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [isContentOpen, setIsContentOpen] = useState<boolean>(false);
  const [ordersOpen, setOrdersOpen] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(false);
  const [galleryOpen, setGalleryOpen] = useState<boolean>(false);

  return (
    <>
      {/* Navbar for mobile view */}
      <nav className="lg:hidden  text-white bg-white w-full h-20 fixed  z-50 flex items-center">
        <button className="border-0" onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={30} color="black" className="ml-4" />
        </button>

        <Image
          alt="Arfo Metaliq Logo"
          width={250}
          height={120}
          src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1732213762/tv99udrhtcywxvly42lx.png"
          className="object-contain rounded-full mx-auto pr-4"
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
                  href="/products/add"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <FiTag className="mr-3" /> Products
                </Link>

                <Link
                  href="/units"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <MdAcUnit className="mr-3" /> Add Units
                </Link>

                {/* <Link
                  href="/productcodes"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <RiCodeSSlashFill className="mr-3" /> Product Codes
                </Link> */}

                <Link
                  href="/allproducts"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <MdOutlineProductionQuantityLimits className="mr-3" /> All
                  Products
                </Link>
              </div>
            </div>

            {/* Category Menu */}
            <button
              onClick={() => setIsContentOpen(!isContentOpen)}
              className="w-full flex items-center justify-between p-2 text-black hover:bg-green-300 rounded"
            >
              <span className="flex items-center">
                <MdOutlineCategory className="mr-3" /> Categories
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
                  href="/categories"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <BiCategoryAlt className="mr-3" /> Add Categories
                </Link>
                <Link
                  href="/subcategory"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <TbCategoryPlus className="mr-3" />
                  Add SubCategory
                </Link>
              </div>
            </div>

            {/* Orders Menu */}
            <button
              onClick={() => setOrdersOpen(!ordersOpen)}
              className="w-full flex items-center justify-between p-2 text-black hover:bg-green-300 rounded"
            >
              <span className="flex items-center">
                <FaFirstOrder className="mr-3" /> Orders
              </span>
              <span>{ordersOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
            </button>
            <div
              className={`transition-all overflow-hidden ${
                ordersOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } duration-300`}
            >
              <div className="ml-4">
                <Link
                  href="/orderlists"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <LuListOrdered className="mr-3" /> Order List
                </Link>
              </div>
            </div>

            {/* Users Menu */}
            <button
              onClick={() => setUser(!user)}
              className="w-full flex items-center justify-between p-2 text-black hover:bg-green-300 rounded"
            >
              <span className="flex items-center">
                <FaUserCheck className="mr-3" /> All Users
              </span>
              <span>{user ? <FiChevronUp /> : <FiChevronDown />}</span>
            </button>
            <div
              className={`transition-all overflow-hidden ${
                user ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } duration-300`}
            >
              <div className="ml-4">
                <Link
                  href="/users"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <FaUserCog className="mr-3" /> Users
                </Link>
              </div>

              <div className="ml-4">
                <Link
                  href="/aboutus"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <FiAlertOctagon className="mr-3" /> About Us
                </Link>
              </div>

              <div className="ml-4">
                <Link
                  href="/userscontact"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <RiContactsBook3Line className="mr-3" /> Contact No
                </Link>
              </div>

              <div className="ml-4">
                <Link
                  href="/customer"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <TbListDetails className="mr-3" /> Costumer Details
                </Link>
              </div>
            </div>

            {/* Gallery Section */}
            <button
              onClick={() => setGalleryOpen(!galleryOpen)}
              className="w-full flex items-center justify-between p-2 text-black hover:bg-green-300 rounded"
            >
              <span className="flex items-center">
                <TfiGallery className="mr-3" /> Add Gallery
              </span>
              <span>{galleryOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
            </button>

            <div
              className={`transition-all overflow-hidden ${
                galleryOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } duration-300`}
            >
              <div className="ml-4">
                <Link
                  href="/uploadgallery"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <IoCloudUploadOutline className="mr-3" /> Gallery
                </Link>
              </div>

              <div className="ml-4">
                <Link
                  href="/banner"
                  className="flex items-center p-2 text-black hover:bg-green-300 rounded"
                >
                  <MdOutlineCloudUpload className="mr-3" /> Upload Banner
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
