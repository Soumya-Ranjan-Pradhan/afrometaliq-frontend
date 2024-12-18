"use client";

import React, { useState } from "react";
import { useSendForgotPasswordOTPEmail, useVerifyOtpAndResetPassword } from "@/api/auth/queries/authQuery";
import { toast } from "react-toastify";

interface ForgotPasswordModalProps {
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isOtpSent, setOtpSent] = useState(false);

  const { mutate: sendOtpEmail } = useSendForgotPasswordOTPEmail();
  const { mutate: resetPassword } = useVerifyOtpAndResetPassword();

  const handleSendOtp = () => {
    sendOtpEmail(
      { email },
      {
        onSuccess: () => {
          setOtpSent(true);
          toast.success("OTP sent successfully!");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to send OTP");
        },
      }
    );
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    resetPassword(
      { email, otp, newPassword, confirmPassword },
      {
        onSuccess: () => {
          toast.success("Password reset successfully!");
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to reset password");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Forgot Password
        </h2>
        {!isOtpSent ? (
          <>
            <label className="block text-gray-600">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg"
              placeholder="Enter your email"
            />
            <button
              onClick={handleSendOtp}
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <label className="block text-gray-600">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg"
              placeholder="Enter OTP"
            />

            <label className="block mt-4 text-gray-600">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg"
              placeholder="New Password"
            />

            <label className="block mt-4 text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg"
              placeholder="Confirm Password"
            />

            <button
              onClick={handleResetPassword}
              className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg"
            >
              Reset Password
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
