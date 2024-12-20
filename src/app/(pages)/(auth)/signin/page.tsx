"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useLoginUser } from "@/api/auth/queries/authQuery";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/auth";
import ForgotPasswordModal from "@/Components/ForgotPasswordModal/ForgotPasswordModal";
import { AiOutlineLoading } from "react-icons/ai";

const initialState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formData, setFormData] = useState(initialState);
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: loginUser } = useLoginUser();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const isButtonDisabled = !formData.email || !formData.password || isLoading;

  const handleSignIn = () => {
    setIsLoading(true);
    loginUser(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: (data) => {
          if (data.data?.user) {
            setUser(data.data.user);
            if (data.data.user.isEmailVerified) {
              router.push("/");
            } else {
              router.push("/email/verify");
            }
            toast.success("User logged in successfully!");
          }
        },
        onError: (error) => {
          setIsLoading(false);
          toast.error("Invalid email or password please enter correct details");
        },
      }
    );
  };

  useEffect(() => {
    if (user) {
      if (user.isEmailVerified) {
        router.push("/");
      } else {
        router.push("/email/verify");
      }
    }
  }, [router, user]);

  return (
    <div className="min-h-screen flex items-center justify-center m-4 p-4 lg:p-8 bg-gradient-to-r from-[#131132] to-[#605AC5] rounded-lg lg:rounded-[15px]">
      <div className="flex flex-col lg:grid lg:grid-cols-2 ">
        {/* Left Side - Logo, Text, and Image */}
        <div className="flex flex-col justify-center items-center lg:items-start w-full text-white p-6 lg:p-10 lg:rounded-l-lg">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1734635400/uvjxigxjnrkylhrl6chh.png"
            alt="Afro Metaliq Logo"
            width={150}
            height={150}
          />
          <h1 className="text-3xl lg:text-4xl font-bold mt-6 text-center lg:text-left">
            Sign in to Afrometaliq
          </h1>
          <p className="mt-4 text-base lg:text-lg text-center lg:text-left">
            Join Afrometaliq, your gateway to limitless possibilities! Sign up
            now to access exclusive features, stay updated with the latest
            trends, and connect with a thriving community. It’s quick, easy, and
            opens the door to personalized experiences designed to meet your
            unique needs. Don’t wait—get started today!
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
            Enter your username or email or mobile number{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
            placeholder="Username or email or Mobile number +258 xxx xxx xxx"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Field */}
          <label className="block mt-4 text-gray-600">
            Enter your Password{" "}
            <span>
              <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
            placeholder="Password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Forgot Password */}
          <div className="mt-2 text-right">
            <p
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setForgotPasswordModalOpen(true)}
            >
              Forgot Password
            </p>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            disabled={isButtonDisabled}
            className={`w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white py-2 rounded-lg text-lg font-semibold flex justify-center items-center ${
              isButtonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 hover:opacity-90"
            }`}
          >
            {isLoading ? (
              <AiOutlineLoading className="animate-spin text-xl" />
            ) : (
              "Sign in"
            )}
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

      {isForgotPasswordModalOpen && (
        <ForgotPasswordModal
          onClose={() => setForgotPasswordModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SignIn;
