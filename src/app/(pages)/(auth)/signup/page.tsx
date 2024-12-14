"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCreateUser, useLoginUser } from "@/api/auth/queries/authQuery";

const initialState = {
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const { mutate: createUser } = useCreateUser();
  const { mutate: loginUser } = useLoginUser();
  const router = useRouter();

  const handleSignUp = () => {
    if (!formData.username || !formData.email || !formData.phoneNumber) {
      toast.error("All fields are required");
      return;
    }

    if (!formData.password || formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    createUser(
      {
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      },
      {
        onSuccess: (data) => {
         router.push("/");
          toast.success("User registered and logged in successfully!");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to register user");
        },
      }
    );
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center m-4 p-4 lg:p-8 bg-gradient-to-r from-[#131132] to-[#605AC5] rounded-lg lg:rounded-[15px]">
        <div className="flex flex-col lg:grid lg:grid-cols-2 ">
          {/* Left Side - Logo, Text, and Illustration */}
          <div className="flex flex-col justify-center items-center lg:items-start w-full text-white p-6 lg:p-10 lg:rounded-l-lg">
            <Image
              src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1726587467/mbly5bbfcpwdut9kn4be.png"
              alt="Afro Metaliq Logo"
              width={150}
              height={150}
            />
            <h1 className="text-3xl lg:text-4xl font-bold mt-6 text-center lg:text-left">
              Sign up to
            </h1>
            <p className="mt-4 text-base lg:text-lg text-center lg:text-left">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s.
            </p>

            <Image
              src="https://res.cloudinary.com/datf6laqn/image/upload/v1728416890/iswplufn9enslgj7uctn.png"
              alt="Rocket Illustration"
              width={250}
              height={250}
              className="mt-10"
            />
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full bg-white rounded-lg p-6 lg:p-10 shadow-md mt-6 lg:mt-0">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center lg:text-left">
              Welcome to <span className="text-blue-500">AFRO METALIQ</span>
            </h2>
            <h3 className="mt-2 text-xl lg:text-2xl font-semibold text-gray-600 text-center lg:text-left">
              Sign up
            </h3>

            <form className="mt-6 space-y-4">
              <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                {/* Name Field */}
                <div className="w-full lg:w-1/2">
                  <label className="block text-gray-600">
                    User Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter user name"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone Number Field */}
                <div className="w-full lg:w-1/2">
                  <label className="block text-gray-600">
                    Mobile number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    placeholder="Enter mobile number +258 xxx xxx xxx"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-600">
                  Enter your email address{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email address"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Sign Up Button */}
              <div
                onClick={() => setEmailModalOpen(true)}
                className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] flex items-center justify-center text-white py-2 rounded-lg text-lg font-semibold cursor-pointer"
              >
                Send OTP and Password
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-4 text-center text-gray-600">
              Have an account?{" "}
              <Link href="/signin" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isEmailModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-gray-800">Register</h2>
            <div>
              <label className="block mt-4 text-gray-600">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                className="w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="Confirm password"
                className="w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSignUp}
              className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] mt-4 text-white py-2 rounded-lg"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
