"use client";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-gray-100 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dppfr1gjx/image/upload/v1731780156/gralxkgxm165na1msfx8.webp')",
      }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-4">
        {/* Left Section: Content Block (Visible only on md/lg screens) */}
        <div className="hidden md:flex flex-col lg:w-1/2 space-y-4 text-white">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              AFROMETALIQ
            </span>{" "}
            <span className="text-gray-500">DASHBOARD</span>{" "}
            <span className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-transparent bg-clip-text">
              &
            </span>
            <span className="text-gray-500 mx-2">ADMIN PANEL</span>
          </h1>

          <p className="text-lg text-black">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the  standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.
          </p>
        </div>

        {/* Right Section: Register Form */}
        <div className="bg-white mx-4 lg:my-4 my-4 p-8 shadow-lg rounded-lg w-full max-w-lg">
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

          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <div className="relative mt-1">
              <FaUser className="absolute top-2.5 left-3 text-gray-400" />
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="pl-10 py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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

          {/* Phone Input */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone
            </label>
            <div className="relative mt-1">
              <FaPhone className="absolute top-2.5 left-3 text-gray-400" />
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone"
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
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-3 text-gray-400 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <div className="relative mt-1">
              <FaLock className="absolute top-2.5 left-3 text-gray-400" />
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="pl-10 py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-2.5 right-3 text-gray-400 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Sign Up Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Sign Up with Google */}
          <button className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200">
            <FcGoogle className="mr-2" />
            Sign Up With Google
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
