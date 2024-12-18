"use client";

import {
  useGetLoggedUserDetails,
  useSendOtp,
  useVerifyOtp,
} from "@/api/auth/queries/authQuery";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AiFillCheckCircle } from "react-icons/ai";
import { useAuthStore } from "@/store/auth";

const initialState = {
  email: "",
  otp: "",
};

const Verify = () => {
  const { data, refetch } = useGetLoggedUserDetails();
  const { mutate: sendOtpEmail } = useSendOtp();
  const { mutateAsync: verifyOtp } = useVerifyOtp();
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isOtpVerified, setOtpVerified] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (data?.data.user.isEmailVerified) {
      router.push("/");
    }
    if (data?.data?.user) {
      setFormData({
        ...formData,
        email: data?.data.user.email,
      });
      setUser(data?.data.user);
    }
  }, [data]);

  const handleSendOtp = () => {
    const email = data?.data?.user?.email;

    if (!email) {
      toast.error("Email is required to send OTP");
      return;
    }

    sendOtpEmail(
      { email: email },
      {
        onSuccess: () => {
          toast.success("OTP sent to your email");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to send OTP");
        },
      }
    );

    setEmailModalOpen(true);
  };

  const handleVerifyOtp = async () => {
    if (!formData.email || !formData.otp) {
      toast.error("Email and OTP are required");
      return;
    }

    await verifyOtp(
      { email: formData.email, otp: formData.otp },
      {
        onSuccess: () => {
          toast.success("OTP verified successfully");
          setOtpVerified(true);
          router.replace("/");
        },
        onError: (error) => {
          toast.error(error.message || "Invalid OTP");
          setOtpVerified(false);
        },
      }
    );

    refetch();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Please Verify Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          Click the button below to send an OTP to your registered email.
        </p>
        <button
          onClick={handleSendOtp}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
        >
          Verify Email
        </button>
      </div>

      {/* OTP Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Verify OTP
            </h2>
            <label className="block text-gray-600 text-sm mb-2">
              Enter the 6-digit OTP sent to your email:
            </label>
            <div className="flex items-center relative">
              <input
                type="text"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {isOtpVerified && (
                <AiFillCheckCircle
                  size={25}
                  className="ml-2 text-green-500 absolute right-3 top-3"
                />
              )}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-2 rounded-lg hover:opacity-90 mt-4 transition duration-300"
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;
