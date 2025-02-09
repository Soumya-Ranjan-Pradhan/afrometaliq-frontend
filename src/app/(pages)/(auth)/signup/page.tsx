"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  useCreateUser,
  useSendOtp,
  useVerifyOtp,
} from "@/api/auth/queries/authQuery";
import { AiFillCheckCircle, AiOutlineLoading } from "react-icons/ai";
import { useAuthStore } from "@/store/auth";
import { FaSpinner } from "react-icons/fa";

const initialState = {
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isOtpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: createUser } = useCreateUser();
  const { mutate: verifyOtp } = useVerifyOtp();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const isButtonDisabled =
    !formData.email ||
    !formData.password ||
    !formData.username ||
    !formData.phoneNumber ||
    !formData.confirmPassword ||
    isLoading;

  // Handle sending OTP

  const handleVerifyOtp = () => {
    if (!formData.email || !formData.otp) {
      toast.error("Email and OTP are required");
      return;
    }

    verifyOtp(
      { email: formData.email, otp: formData.otp },
      {
        onSuccess: () => {
          toast.success("OTP verified successfully");
          setOtpVerified(true);
        },
        onError: (error: any) => {
          toast.error("Invalid OTP");
          setOtpVerified(false);
        },
      }
    );
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          setIsLoading(false);
          if (data.data.user) {
            setUser(data.data.user);
          }
          console.log(data.data.user);
          toast.success("User registered and logged in successfully!");
          router.push("/email/verify");
        },
        onError: (error) => {
          setIsLoading(false);
          toast.error("Failed to register user Try again");
        },
      }
    );
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center m-4 p-4 lg:p-8 bg-gradient-to-r from-[#131132] to-[#605AC5] rounded-lg lg:rounded-[15px]">
        <div className="flex flex-col lg:grid lg:grid-cols-2 ">
          {/* Left Side - Logo, Text, and Illustration */}
          <div  className="hidden lg:flex md:flex flex-col justify-center items-center lg:items-start w-full text-white p-6 lg:p-10 lg:rounded-l-lg">
            <Image
              src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1734635400/uvjxigxjnrkylhrl6chh.png"
              alt="Afro Metaliq Logo"
              width={150}
              height={150}
            />
            <h1 className="text-3xl lg:text-4xl font-bold mt-6 text-center lg:text-left">
              Sign Up to Afrometaliq
            </h1>
            <p className="mt-4 text-base lg:text-lg text-center lg:text-left">
              Welcome to Afrometaliq! Join our community to explore a world of
              possibilities. Sign up today and enjoy exclusive benefits,
              personalized experiences, and seamless access to everything
              Afrometaliq has to offer. Your journey starts here!
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

            <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
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
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm password"
                  className="w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Sign Up Button */}
              <button
                // onClick={handleSignUp}
                disabled={isButtonDisabled}
                className={`w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white py-2 rounded-lg text-lg font-semibold flex justify-center items-center ${
                  isButtonDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 hover:opacity-90"
                }`}
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin text-white text-lg" />
                ) : (
                  " Send OTP and Password"
                )}
              </button>
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

            <label className="block mt-4 text-gray-600">Verify OTP</label>
            <div className="flex items-center relative">
              <input
                type="text"
                placeholder="Enter 6 digit OTP"
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
                className="w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {isOtpVerified && (
                <AiFillCheckCircle
                  size={25}
                  className="ml-2 text-green-500 absolute right-0"
                />
              )}
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] mt-4 text-white py-2 rounded-lg"
            >
              Verify OTP
            </button>

            {/* <button
              onClick={handleSignUp}
              className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] mt-4 text-white py-2 rounded-lg"
            >
              Register With Verify Email
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
