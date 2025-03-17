// components/Footer.tsx

import Link from "next/link";
import React from "react";
import { FaDiscord, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white py-10">
      <div className="max-w-[85rem] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Us Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About us</h3>
          <p className="text-gray-300 mb-6">
            Your success is our goal. Your satisfaction is our motivation, we
            will try our best to provide the best of us. We are always trying to
            be up to date and observe market developments, we look forward to
            hearing from you!
          </p>
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
        <div>
          <h3 className="text-xl font-bold mb-4">Afro MetaliQ</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:underline">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact Us
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
        <div>
          <h3 className="text-xl font-bold mb-4">Fabrication</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/fabrication" className="hover:underline">
                Industrial shed
              </Link>
            </li>
            <li>
              <Link href="/fabrication" className="hover:underline">
                Commercial Building
              </Link>
            </li>
            <li>
              <Link href="/fabrication" className="hover:underline">
                Residential Building
              </Link>
            </li>
            <li>
              <Link href="/fabrication" className="hover:underline">
                Pre- Fav Structure
              </Link>
            </li>
            <li>
              <Link href="/fabrication" className="hover:underline">
                Turnkey Project
              </Link>
            </li>
          </ul>
        </div>

        {/* Fencing Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Consultancy</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/consultancy" className="hover:underline">
                IT Solution
              </Link>
            </li>
            <li>
              <Link href="/consultancy" className="hover:underline">
                Legal Documentation
              </Link>
            </li>
            <li>
              <Link href="/consultancy" className="hover:underline">
                Expatriate & visa Management
              </Link>
            </li>
            <li>
              <Link href="/consultancy" className="hover:underline">
                Accountancy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
