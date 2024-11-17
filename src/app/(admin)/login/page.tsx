"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LogInPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-gray-100 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dppfr1gjx/image/upload/v1731780156/gralxkgxm165na1msfx8.webp')",
      }}
    >
      <div className="bg-white p-8 shadow-lg mx-5 rounded-lg w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <Image
            src="https://res.cloudinary.com/dndq25au1/image/upload/v1729361117/d6zwh0crdjjhmrtzfzkj.jpg"
            alt="Arfo Metaliq Logo"
            width={160}
            height={160}
            className=" mx-auto"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <div className="relative mt-1">
            <FaEnvelope className="absolute top-2.5 left-3 text-gray-400" />
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <div className="relative mt-1">
            <FaLock className="absolute top-2.5 left-3 text-gray-400" />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10 py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sign In Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
          Sign In
        </button>

        {/* Forgot Password */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Forgot Password?
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Sign In with Google */}
        <button className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200">
          <FcGoogle className="mr-2" />
          Sign In with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
