"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useCreateUser,
  useLoginUser,
  useSendOtp,
  useVerifyOtp,
} from "@/api/auth/queries/authQuery";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  otp: "",
  isEmailVerified: false,
};

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const { mutate: sendOtpEmail } = useSendOtp();
  const { mutate: verifyOtp } = useVerifyOtp();
  const { mutate: createUser } = useCreateUser();
  const { mutate: loginUser } = useLoginUser();

  // Send OTP
  const handleSendOtp = () => {
    if (!formData.email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    sendOtpEmail(
      { email: formData.email },
      {
        onSuccess: () => {
          toast.success("OTP sent successfully!");
          setEmailModalOpen(true); // Open modal
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to send OTP.");
        },
      }
    );
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    verifyOtp(
      { email: formData.email, otp },
      {
        onSuccess: () => {
          toast.success("OTP verified successfully!");
          setEmailModalOpen(false); // Close modal
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Invalid OTP.");
        },
      }
    );
  };

  const handleRegister = () => {
    // e.preventDefault();
    if (!formData.isEmailVerified) {
      toast.error("Please verify your email address first.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    createUser(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      },
      {
        onSuccess: (response) => {
          toast.success("Registration successful!");
          // handleLogin();
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Registration failed.");
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

            <form className="mt-6 space-y-4" onSubmit={handleRegister}>
              <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                {/* Name Field */}
                <div className="w-full lg:w-1/2">
                  <label className="block text-gray-600">User Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Username Field */}
                <div className="w-full lg:w-1/2">
                  <label className="block text-gray-600">Mobile number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter mobile number +258 xxx xxx xxx"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-600">
                  Enter your email address <span className="text-red-500">*</span>
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
                onClick={handleSendOtp}
                className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] flex items-center justify-center text-white py-2 rounded-lg text-lg font-semibold"
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

      {/* OTP Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-gray-800">Verify OTP</h2>
            <input
              type="text"
              placeholder="Check Mobile Number For OTP"
              className="w-full mt-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {/* Password Field */}
            <div>
              <label className="block mt-4 text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-600">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] mt-4  text-white py-2 rounded-lg"
            >
              Verify OTP and Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
