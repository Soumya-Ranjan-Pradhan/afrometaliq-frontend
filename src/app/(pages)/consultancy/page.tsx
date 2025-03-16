"use client";
import React from "react";
import { FaLaptopCode, FaMobileAlt, FaServer, FaCloud } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const Consultancy = () => {
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
          Professional Software Consultancy
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          We build scalable and modern web & mobile applications with
          cutting-edge technology.
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
          <h3 className="text-xl font-semibold mt-4">Web Development</h3>
          <p className="text-gray-400 mt-2">
            Modern and responsive websites built with Next.js, React, and
            TypeScript.
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <FaMobileAlt className="text-blue-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Mobile Development</h3>
          <p className="text-gray-400 mt-2">
            Cross-platform mobile apps using React Native and Angular.
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <FaServer className="text-blue-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Backend Development</h3>
          <p className="text-gray-400 mt-2">
            Robust and scalable backend with Node.js, Express.js, Nest.js &
            MongoDB.
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
          <FaCloud className="text-blue-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Cloud & DevOps</h3>
          <p className="text-gray-400 mt-2">
            AWS, Docker, Kubernetes solutions for seamless deployment and
            scaling.
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
        <h2 className="text-3xl font-bold text-blue-500">Get in Touch</h2>
        <p className="mt-2 text-gray-300">
          Let’s build your next big project together.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          Contact Us
        </Link>
      </motion.div>
    </div>
  );
};

export default Consultancy;
