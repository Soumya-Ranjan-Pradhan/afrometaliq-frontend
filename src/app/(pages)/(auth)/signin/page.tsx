import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center m-8 bg-gradient-to-r from-[#131132] to-[#605AC5] rounded-[15px]">
      <div className="flex  ">
        {/* Left Side - Logo, Text, and Image */}
        <div className="hidden md:flex flex-col justify-center items-start w-1/2  text-white p-10 rounded-l-lg">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1726587467/mbly5bbfcpwdut9kn4be.png" // Update the path to your logo
            alt="Afro Metaliq Logo"
            width={150}
            height={150}
          />
          <h1 className="text-4xl font-bold mt-6">Sign in to</h1>
          <p className="mt-4 text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <Image
            src="https://res.cloudinary.com/datf6laqn/image/upload/v1728416890/iswplufn9enslgj7uctn.png" // Update the path to your image
            alt="Rocket Illustration"
            width={300}
            height={300}
            className="mt-10"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2  mt-6 rounded-r-lg">
          <div className="bg-white rounded-[20px] p-6 pl-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome to <span className="text-blue-500">AFRO METALIQ</span>
            </h2>
            <h3 className="mt-2 text-2xl font-semibold text-gray-600">
              Sign in
            </h3>

            {/* Google Sign-In Button */}
            <button className=" px-4 mt-6 bg-gray-100 border border-gray-300 text-gray-600 rounded-lg  flex items-center justify-center">
              <FcGoogle className="m-3" />
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
              <a href="#" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
