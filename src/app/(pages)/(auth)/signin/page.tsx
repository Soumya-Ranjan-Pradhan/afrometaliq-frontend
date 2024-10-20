import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center m-4 p-4 lg:p-8 bg-gradient-to-r from-[#131132] to-[#605AC5] rounded-lg lg:rounded-[15px]">
      <div className="flex flex-col lg:grid lg:grid-cols-2 ">
        {/* Left Side - Logo, Text, and Image */}
        <div className="flex flex-col justify-center items-center lg:items-start w-full text-white p-6 lg:p-10 lg:rounded-l-lg">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1726587467/mbly5bbfcpwdut9kn4be.png"
            alt="Afro Metaliq Logo"
            width={150}
            height={150}
          />
          <h1 className="text-3xl lg:text-4xl font-bold mt-6 text-center lg:text-left">
            Sign in to
          </h1>
          <p className="mt-4 text-base lg:text-lg text-center lg:text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <Image
            src="https://res.cloudinary.com/datf6laqn/image/upload/v1728416890/iswplufn9enslgj7uctn.png"
            alt="Rocket Illustration"
            width={250}
            height={250}
            className="mt-10"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full bg-white rounded-lg p-6 lg:p-10 shadow-md mt-6 lg:mt-0">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center lg:text-left">
            Welcome to <span className="text-blue-500">AFRO METALIQ</span>
          </h2>
          <h3 className="mt-2 text-xl lg:text-2xl font-semibold text-gray-600 text-center lg:text-left">
            Sign in
          </h3>

          {/* Google Sign-In Button */}
          <button className="w-full mt-6 bg-gray-100 border border-gray-300 text-gray-600 rounded-lg flex items-center justify-center p-2">
            <FcGoogle className="m-2" />
            Sign in with Google
          </button>

          {/* Divider */}
          <div className="my-6 text-center text-gray-500">OR</div>

          {/* Username or Email Field */}
          <label className="block text-gray-600">
            Enter your username or email address
          </label>
          <input
            type="text"
            placeholder="Username or email address"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Field */}
          <label className="block mt-4 text-gray-600">
            Enter your Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Forgot Password */}
          <div className="mt-2 text-right">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password
            </a>
          </div>

          {/* Sign In Button */}
          <button className="w-full mt-6 bg-gradient-to-r from-[#141e30] to-[#243b55] text-white py-2 rounded-lg text-lg font-semibold">
            Sign in
          </button>

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-gray-600">
            No Account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
