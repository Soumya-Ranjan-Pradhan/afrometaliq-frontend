"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { RiEnglishInput } from "react-icons/ri";
import SearchForSmallScreen from "./SearchForSmallScreen";
import { SlMenu } from "react-icons/sl";
import { IoCloseCircleOutline } from "react-icons/io5";
import Link from "next/link";

// import { IoMenu } from "react-icons/io5";
import { RiBallPenLine } from "react-icons/ri";
import { MdLockOutline } from "react-icons/md";
import Categories from "../Categories";
import CategoryMenu from "./CategoryMenu";
import { useTranslation } from "react-i18next";
import { LanguagesIcon } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import UserMenu from "./Sidebar/UserMenu";
import UserMobileMenu from "./Sidebar/UserMobileMenu";
import { useCartQuery } from "@/api/cart/query/useCartQuery";
import SearchProduct from "./SearchProduct";
import { useGlobalStore } from "@/store/global";
import { useGetLoggedUserDetails } from "@/api/auth/queries/authQuery";
import { useRouter } from "next/navigation";

const Header = () => {
  const { t, i18n } = useTranslation();

  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const { data, refetch } = useCartQuery();
  const user = useAuthStore((state) => state.user);
  const { isComingSoon, setIsComingSoon } = useGlobalStore();
  const { data: userData } = useGetLoggedUserDetails({});
  const router = useRouter();

  // Handle search submission
  useEffect(() => {
    if (user?._id) {
      refetch();
    }
  }, [user, refetch]);

  // check the cart count
  useEffect(() => {
    if (user?._id && data?.data?.cart) {
      setCartCount(data.data.cart.length);
    } else {
      setCartCount(0);
    }
  }, [data, user]);

  useEffect(() => {
    if (userData) {
      if (userData?.data.user.isEmailVerified) {
        // console.log("LAYOUT ===========", "User is verified");
      } else {
        router.replace("/email/verify");
      }
    }
  }, [userData]);

  const closeDrawer = () => {
    setToggleMenu(false);
  };

  const changeLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("pt");
    } else {
      i18n.changeLanguage("en");
    }
  };

  return (
    <>
      {/* For the Large Screen */}
      <header className="w-full flex items-center justify-between h-[5rem]  bg-white shadow-md">
        {/* Left side - Logo */}
        <div className="flex lg:p-6 md:p-6 items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1741001860/gg2m37yby4apt0febngh.png"
              alt="Arfo Metaliq Logo"
              width={250} // Set responsive width
              height={120} // Default height
              sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 200px"
              className="w-[170px] sm:w-[250px] md:w-[150px] lg:w-[200px] h-auto"
              priority
            />
          </Link>
        </div>

        {/* Center - Search bar large screen */}
        <div className="hidden lg:flex items-center w-full max-w-lg mx-auto ">
          {/* <input
            type="text"
            placeholder={t("menu.search_palceholder")}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none"
          />
          <button className="px-4 py-2 bg-[#605AC5] text-white rounded-r-full">
            <IoIosSearch className="text-2xl" />
          </button> */}
          <SearchProduct />
        </div>

        {/* Right side - Register and Login large screen */}
        <div className=" flex items-center  lg:p-6  md:p-6 md:gap-4 lg:gap-4 gap-2 p-4 text-blue-600 ">
          {/* dropdown to change language */}
          <div className="hidden md:flex items-center space-x-1">
            <button onClick={changeLanguage} className="flex items-center">
              <span>
                <LanguagesIcon />
              </span>
              {i18n.language === "en" ? <RiEnglishInput /> : "Pt"}
            </button>
          </div>

          {user?._id ? (
            <>
              <div className="block md:hidden">
                <UserMobileMenu />
              </div>
            </>
          ) : (
            <>
              <Link href="/signup" className="flex items-center space-x-1">
                <RiBallPenLine className="text-2xl" />
                <span className="text-sm">{t("menu.sign_up")}</span>
              </Link>
              <Link href="/signin" className="flex items-center space-x-1">
                <MdLockOutline className="text-2xl" />
                <span className="text-sm">{t("menu.login")}</span>
              </Link>
            </>
          )}

          <div className="hidden md:flex items-center space-x-1">
            <UserMenu />
          </div>
        </div>
      </header>

      {/* For The Large Screen */}
      {/* bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] */}
      <nav
        className="w-full bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] lg:h-[4rem] md:h-[4rem] sm:h-[3rem] h-[64px] flex justify-between 
    items-center  sm:gap-5 gap-2 sticky top-0 z-40"
      >
        <div>
          <CategoryMenu />
        </div>

        {/* Navigation Links for large screens */}
        <nav className="hidden lg:flex items-center gap-8 text-white p-4">
          <Link href="/" className="relative group hover:text-gray-300">
            {t("menu.home")}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link href="/about" className="relative group hover:text-gray-300">
            {t("menu.about")}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link href="/gallery" className="relative group hover:text-gray-300">
            {t("menu.gallery")}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link
            href="/fabrication"
            className="relative group hover:text-gray-300"
          >
            {t("menu.fabrication")}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
          </Link>
          <Link href="/product" className="relative group hover:text-gray-300">
            {t("menu.products")}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
          </Link>

          <Link
            href="/consultancy"
            className="relative group hover:text-gray-300"
          >
            {/* {t("menu.products")} */} {t("consultancy")}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
          </Link>

          {/* Cart Icon */}
          <div className="relative hidden lg:block">
            <Link href="/cart">
              <FaShoppingCart size={24} className="text-white" />
              {user?._id && cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-xs rounded-full text-white h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
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

          <div className="flex md:hidden items-center space-x-3">
            <button onClick={changeLanguage} className="flex items-center">
              <span>
                <LanguagesIcon />
              </span>
              {i18n.language === "en" ? <RiEnglishInput /> : "Pt"}
            </button>
          </div>
        </div>

        {/* Hamburger for small and medium screens - Hidden on lg screens */}
        <div className="lg:hidden flex items-center gap-7">
          {/* Products Link */}
          <Link
            href="/product"
            className="hidden md:inline-block relative text-white group hover:text-gray-300"
          >
            {t("menu.products")}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
          </Link>

          {/* Consultancy Link */}
          <Link
            href="/consultancy"
            className="hidden md:inline-block relative group text-white hover:text-gray-300"
          >
            Consultancy
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
          </Link>
          {/* <div
            className="relative hidden sm:block"
            onMouseEnter={() => setShowProfileTooltip(true)}
            onMouseLeave={() => setShowProfileTooltip(false)}
          >
            <UserMenu />
          </div> */}
          {/* Cart Icon */}
          <div className="relative hidden sm:block">
            <Link href="/cart">
              <FaShoppingCart size={24} className="text-white" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-xs rounded-full text-white h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Search Icon */}
          <CiSearch
            size={30}
            fontWeight={"bold"}
            onClick={() => setOpenSearch((prev) => !prev)}
            className="text-white mr-7"
          />
        </div>

        {/* Sidebar for small and medium screens */}
        <div
          className={`fixed top-0 right-0 h-screen w-[100%] bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] 
        z-50 transform ${
          toggleMenu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out`}
        >
          <div className="flex items-center justify-between h-[5.8rem] px-3 border-b text-black bg-white">
            <Image
              src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1741001860/gg2m37yby4apt0febngh.png"
              alt="logo"
              width={200}
              height={140}
            />
            <IoCloseCircleOutline
              size={35}
              onClick={() => setToggleMenu((prev) => !prev)}
            />
          </div>
          <div className="text-white p-3  h-[calc(100vh-70px)] overflow-auto">
            <Categories closeDrawer={closeDrawer} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
