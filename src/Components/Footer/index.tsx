// components/Footer.tsx

import React from "react";
import { FaDiscord, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white py-10">
      <div className="max-w-[85rem] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Us Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About us</h3>
          <p className="text-gray-300 mb-6">
            Open source is source code that is made freely available for
            possible modification and redistribution. Products include
            permission to use the source code, design documents, or content of
            the product.
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
          <h3 className="text-xl font-bold mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Product
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Processing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Fencing
              </a>
            </li>
          </ul>
        </div>

        {/* Processing Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Processing</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Tags
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                API
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Places
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Creative Markets
              </a>
            </li>
          </ul>
        </div>

        {/* Fencing Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Fencing</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Community
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Designers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
