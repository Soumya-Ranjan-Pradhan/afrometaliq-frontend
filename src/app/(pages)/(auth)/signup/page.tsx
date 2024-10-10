import React from "react";
import Image from "next/image";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center m-8 bg-gradient-to-r from-[#131132] to-[#605AC5] rounded-[15px]">
      <div className="flex w-full max-w-6xl">
        {/* Left Side - Logo, Text, and Illustration */}
        <div className="hidden md:flex flex-col justify-center items-start w-1/2 text-white p-10">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1726587467/mbly5bbfcpwdut9kn4be.png" // Replace with the actual path to your logo
            alt="Afro Metaliq Logo"
            width={150}
            height={150}
          />
          <h1 className="text-4xl font-bold mt-6">Sign up to</h1>
          <p className="mt-4 text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
          <Image
            src="https://res.cloudinary.com/datf6laqn/image/upload/v1728416890/iswplufn9enslgj7uctn.png" // Replace with the actual path to your image
            alt="Rocket Illustration"
            width={300}
            height={300}
            className="mt-10"
          />
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 p-6 bg-white rounded-[20px] m-6 ">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to <span className="text-blue-500">AFRO METALIQ</span>
          </h2>
          <h3 className="mt-2 text-2xl font-semibold text-gray-600">Sign up</h3>

          <form className="mt-6 space-y-4">
            <div className="flex space-x-4">
              {/* Name Field */}
              <div className="w-1/2">
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Username Field */}
              <div className="w-1/2">
                <label className="block text-gray-600">Username</label>
                <input
                  type="text"
                  placeholder="User Name"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm mt-1">
                  Username already used
                </p>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-600">
                Enter your email address
              </label>
              <input
                type="email"
                placeholder="Username or email address"
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-600">Confirm password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#141e30] to-[#243b55] text-white py-2 rounded-lg text-lg font-semibold"
            >
              Sign up
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-4 text-center text-gray-600">
            Have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
