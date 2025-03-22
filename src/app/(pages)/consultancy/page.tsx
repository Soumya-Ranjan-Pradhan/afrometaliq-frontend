"use client";
import React from "react";
import { FaLaptopCode, FaMobileAlt, FaServer, FaCloud } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Consultancy = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <motion.div
        className="text-center max-w-4xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-blue-500 lg:mt-0 md:mt-12 mt-8 animate-bounce">
         {t("professional_software_consultancy")}
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          {t("professional_software_consultancy_desc")}
        </p>
      </motion.div>

      {/* Services Section */}
      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <FaLaptopCode className="text-blue-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">{t("web_development")}</h3>
          <p className="text-gray-400 mt-2">
           {t("web_development_desc")}
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <FaMobileAlt className="text-blue-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">{t("mobile_development")}</h3>
          <p className="text-gray-400 mt-2">
            {t("mobile_development_desc")}
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <FaServer className="text-blue-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">{t("backend_development")}</h3>
          <p className="text-gray-400 mt-2">
           {t("backend_development_desc")}
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <FaCloud className="text-blue-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">{t("cloud_devops")}</h3>
          <p className="text-gray-400 mt-2">
            {t("cloud_devops_desc")}
          </p>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-blue-500">{t("get_in_touch")}</h2>
        <p className="mt-2 text-gray-300">
          {t("get_in_touch_desc")}
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          {t("contact_us")}
        </Link>
      </motion.div>
    </div>
  );
};

export default Consultancy;
