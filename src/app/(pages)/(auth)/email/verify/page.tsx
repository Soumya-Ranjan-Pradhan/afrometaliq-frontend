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

const initialState = {
  email: "",
  otp: "",
};

const verify = () => {
  const { data, refetch } = useGetLoggedUserDetails();
  const { mutate: sendOtpEmail } = useSendOtp();
  const { mutateAsync: verifyOtp } = useVerifyOtp();
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isOtpVerified, setOtpVerified] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const router = useRouter();

  useEffect(() => {
    if (data?.data.user.isEmailVerified) {
      router.push("/");
    }
    if(data?.data?.user){
      setFormData({
        ...formData, email:data?.data.user.email 
      })
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
        onError: (error: any) => {
          toast.error(error.message || "Failed to send OTP");
        },
      }
    );

    setEmailModalOpen(true)
  };

  const handleVerifyOtp = async() => {
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
          router.replace('/')
        },
        onError: (error: any) => {
          toast.error(error.message || "Invalid OTP");
          setOtpVerified(false);
        },
      }
    );

    refetch()
  };

  return (
    <>
      <div className="grid max-w-screen-2xl">
        <div>
          <div>Please Verify Your Email to Proceed</div>
          <button className="" onClick={handleSendOtp}>
            Verify Email
          </button>
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
          </div>
        </div>
      )}
    </>
  );
};

export default verify;
