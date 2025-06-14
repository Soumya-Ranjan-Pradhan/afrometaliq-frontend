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
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { storeToLS } from "@/lib/storage";
import { BASE_URL } from "@/contants";
import { FaSpinner } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      setIsLoading(true);
      setErrorMessage(""); // Clear previous errors

      const idToken = credentialResponse.credential;

      // "https://afrometaliq-backend.onrender.com/api/v1/users/google-login",
      const res = await axios.post(`${BASE_URL}/users/google-login`, {
        idToken,
      });

      if (res.data.success) {
        const { user, accessToken, refreshToken } = res.data.data;

        // Store tokens and user info
        storeToLS("accessToken", accessToken);
        storeToLS("refreshToken", refreshToken);

        toast.success("Google Sign-In successful!");
        router.push("/");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMessage(
          "Unauthorized: Please register with this email before logging in."
        );
      } else {
        setErrorMessage(
          error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
        );
      }
      // console.error("Google Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLoginFailure = (error: any) => {
    console.error("Google Sign-In Failed:", error);
    toast.error("Google Sign-In failed. Please try again.");
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
    <GoogleOAuthProvider
      clientId={
        "370223363923-ljndt6ipaogo398ronja4riednet1h3b.apps.googleusercontent.com"
      }
    >
      <div className="min-h-screen flex items-center justify-center m-4 p-4 lg:p-8 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] rounded-lg lg:rounded-[15px]">
        <div className="flex flex-col lg:grid lg:grid-cols-2 ">
          {/* Left Side - Logo, Text, and Image */}
          <div className="hidden lg:flex md:flex flex-col justify-center items-center lg:items-start w-full text-white p-6 lg:p-10 lg:rounded-l-lg">
            <Image
              src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1741001860/gg2m37yby4apt0febngh.png"
              alt="Afro Metaliq Logo"
              width={200}
              height={200}
            />
            {/* <h1 className="text-[1rem] lg:text-4xl font-bold mt-6 text-center lg:text-left">
              to Afrometaliq
            </h1> */}
            <h1 className="text-3xl lg:text-4xl font-bold mt-6 text-center lg:text-left">
              Sign in to AfroMetaliQ
            </h1>
            <p className="mt-4 text-base lg:text-lg text-center lg:text-left">
              Join Afrometaliq, your gateway to limitless possibilities! Sign up
              now to access exclusive features, stay updated with the latest
              trends, and connect with a thriving community. It’s quick, easy,
              and opens the door to personalized experiences designed to meet
              your unique needs. Don’t wait—get started today!
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
            <h2 className="text-[1rem] flex items-center justify-center lg:text-3xl font-bold text-gray-800 text-center lg:text-left">
              Welcome to{" "}
              <span className="text-blue-500 ml-2"> AfroMetaliQ</span>
            </h2>
            {/* <h3 className="mt-2 text-xl lg:text-2xl font-semibold text-gray-600 text-center lg:text-left">
              Sign in
            </h3> */}

            {/* Google Sign-In Button */}

            {/* <FcGoogle className="m-2" /> */}
            <div className="flex items-center justify-center my-2">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                  console.error("Google Sign-In Failed");
                  toast.error("Google Sign-In failed. Please try again.");
                }}
                shape="pill"
                theme="filled_black"
                text="continue_with"
                size="large"
                useOneTap
              />
            </div>

            {/* Divider */}
            <div className="my-6 text-center text-gray-500">OR</div>

            {/* Username or Email Field */}
            <label className="block text-gray-600">
              {t("login")}
              {""}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              placeholder="+258 xxx xxx xxx"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password Field */}
            <label className="block mt-4 text-gray-600">
              {t("password")}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
                placeholder="Password"
                className="w-full mt-2 p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </div>
            </div>

            {/* Forgot Password */}
            <div className="mt-2 text-right">
              <p
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setForgotPasswordModalOpen(true)}
              >
                {t("forgot_password")}
              </p>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSignIn}
              disabled={isButtonDisabled}
              className={`w-full bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white py-2 rounded-lg text-lg font-semibold flex justify-center items-center ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 hover:opacity-90"
              }`}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin text-white text-lg" />
              ) : (
                "Sign in"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="mt-4 text-center text-gray-600">
              {t("No_Account?")}
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
    </GoogleOAuthProvider>
  );
};

export default SignIn;
