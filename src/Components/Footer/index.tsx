// components/Footer.tsx
"use client";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaDiscord, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white py-10">
      <div className=" mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Us Section */}
        <div className="lg:px-7 border border-gray-300 lg:py-3 md:px-6 md:py-3 px-5 py-2">
          <h3 className="text-xl font-bold mb-4">{t("menu.about")}</h3>
          <p className="text-gray-300 mb-6 lg:w-[100%]">{t("about_des")}</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Discord">
              <FaDiscord size={24} />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

        {/* Product Section */}
        <div className=" lg:px-7 border border-gray-300 lg:py-3 md:px-6 md:py-3 px-5 py-2">
          <h3 className="text-xl font-bold mb-4">Afro MetaliQ</h3>
          <ul className="space-y-2">
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
            {/* <li>
              <Link href="/consultancy" className="hover:underline">
                IT Solution
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Processing Section */}
        <div className="lg:px-7 border border-gray-300 lg:py-3 md:px-6 md:py-3 px-5 py-2">
          <h3 className="text-xl font-bold mb-4"> {t("construction")}</h3>
          <ul className="space-y-2">
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

        {/* Fencing Section */}
        <div className="lg:px-7 border border-gray-300 lg:py-3 md:px-6 md:py-3 px-5 py-2">
          <h3 className="text-xl font-bold mb-4"> {t("consultancy")}</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/consultancy" className="hover:underline">
                {t("it_solution")}
              </Link>
            </li>
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
    </footer>
  );
};

export default Footer;
