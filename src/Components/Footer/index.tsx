"use client";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaDiscord,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaThreads,
} from "react-icons/fa6";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white py-10 mt-auto relative">
      <div className=" mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* About Us Section */}
        <div className="lg:px-7 border border-gray-300 lg:py-5 md:px-6 md:py-4 px-5 py-4 flex flex-col h-full">
          <h3 className="text-xl font-bold mb-4">{t("menu.about")}</h3>
          <p className="text-gray-300 mb-6 flex-grow">{t("about_des")}</p>
          <div className="flex space-x-4">
            {/* <a href="#" aria-label="Discord"><FaDiscord size={24} /></a> */}
            <Link href="#" aria-label="Instagram">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61575614413438" target="_blank" aria-label="Facebook">
              <FaFacebook size={24} />
            </Link>
            <Link href="#" aria-label="Twitter">
              <FaTwitter size={24} />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </Link>
            <Link href="#" aria-label="Threads">
              <FaThreads size={24} />
            </Link>
          </div>
        </div>

        {/* Product Section */}
        <div className="lg:px-7 border border-gray-300 lg:py-5 md:px-6 md:py-4 px-5 py-4 flex flex-col h-full">
          <h3 className="text-xl font-bold mb-4">Afro MetaliQ</h3>
          <ul className="space-y-2 flex-grow">
            <li>
              <Link href="/about" className="hover:underline">
                {t("menu.about")}
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:underline">
                {t("menu.gallery")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                {t("menu.contact_us")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Construction Section */}
        <div className="lg:px-7 border border-gray-300 lg:py-5 md:px-6 md:py-4 px-5 py-4 flex flex-col h-full">
          <h3 className="text-xl font-bold mb-4">{t("construction")}</h3>
          <ul className="space-y-2 flex-grow">
            <li>
              <Link href="/fabrication" className="hover:underline">
                {t("industrial")}
              </Link>
            </li>
            <li>
              <Link href="/fabrication" className="hover:underline">
                {t("commercial_building")}
              </Link>
            </li>
            <li>
              <Link href="/fabrication" className="hover:underline">
                {t("residential_building")}
              </Link>
            </li>
            <li>
              <Link href="/fabrication" className="hover:underline">
                {t("pre-Fab_structure")}
              </Link>
            </li>
            <li>
              <Link href="/fabrication" className="hover:underline">
                {t("turnkey_project")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Consultancy Section */}
        <div className="lg:px-7 border border-gray-300 lg:py-5 md:px-6 md:py-4 px-5 py-4 flex flex-col h-full">
          <h3 className="text-xl font-bold mb-4">{t("consultancy")}</h3>
          <ul className="space-y-2 flex-grow">
            <li>
              <Link href="/consultancy" className="hover:underline">
                {t("it_solution")}
              </Link>
            </li>
            <li>
              <Link href="/consultancy" className="hover:underline">
                {t("expatriate_management")}
              </Link>
            </li>
            <li>
              <Link href="/consultancy" className="hover:underline">
                {t("accountancy")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section - Fixing Visibility */}
      <div className="border-t border-gray-400 text-center text-sm text-gray-300 py-4 mt-6 pb-6 lg:pb-4">
        &copy; {new Date().getFullYear()} Afro MetaliQ.{" "}
        {t("all_rights_reserved")}
      </div>
    </footer>
  );
};

export default Footer;
