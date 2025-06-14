import axios from "axios";

import { BASE_URL } from "@/contants";
// import { BASE_URL } from "@/contants";
import { clearLS, getFromLS } from "@/lib/storage";
export interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  password: string;
  companyName: string;
  nuit: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignupResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface UsersResponse {
  users: User[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type AuthQuery = {
  page?: number;
  limit?: number;
};

export type AuthResponse = {
  users: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    totalUsers: number;
  };
};

// get all users
// export const getAllUsers = async (): Promise<
//   ApiResponse<{ users: User[] }>
// > => {
//   const response = await axios.get(`${BASE_URL}/users`);
//   return response.data;
// };

export const getAllUsers = async (
  query?: AuthQuery
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axios.get<ApiResponse<AuthResponse>>(
    `${BASE_URL}/users`,
    { params: query }
  );
  return response.data;
};

// gett logged in user
export const getLoggedInUser = async (): Promise<
  ApiResponse<{
    user: User;
  }>
> => {
  // const token = getFromLS("accessToken");
  const accessToken = getFromLS("accessToken");

  try {
    const response = await axios.get<ApiResponse<{ user: User }>>(
      `${BASE_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (e: any) {
    if (e.response?.status === 401) {
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");
      clearLS();
      window.location.reload();
    }
    throw e;
  }
};

export const createUser = async (
  data: Partial<User>
): Promise<
  ApiResponse<{ user: User; accessToken: string; refreshToken: string }>
> => {
  const response = await axios.post<
    ApiResponse<{ user: User; accessToken: string; refreshToken: string }>
  >(`${BASE_URL}/users/register`, data);
  return response.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<ApiResponse<LoginResponse>> => {
  const response = await axios.post<ApiResponse<LoginResponse>>(
    `${BASE_URL}/users/login`,
    data
  );
  return response.data;
};

// send otp in the mail
export const sendOtp = async (data: {
  email: string;
}): Promise<ApiResponse<{ message: string }>> => {
  const response = await axios.post<ApiResponse<{ message: string }>>(
    `${BASE_URL}/users/send-verify-otp`,
    data
  );
  return response.data;
};

// verify otp
export const verifyOtp = async (data: {
  email: string;
  otp: string;
}): Promise<ApiResponse<{ message: string }>> => {
  const response = await axios.post<ApiResponse<{ message: string }>>(
    `${BASE_URL}/users/verify-otp`,
    data
  );
  return response.data;
};

// forget password send otp in the mail
// Forgot Password: Send OTP Email
export const sendForgotPasswordOTPEmail = async (email: string) => {
  const response = await axios.post<ApiResponse<{ message: string }>>(
    `${BASE_URL}/users/forgot-password`,
    { email }
  );
  return response.data;
};

// Verify OTP and Reset Password
export const verifyOtpAndResetPassword = async (data: {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const response = await axios.post<ApiResponse<{ message: string }>>(
    `${BASE_URL}/users/reset-password`,
    data
  );
  return response.data;
};

// Admin Login
export const adminLogin = async (data: { email: string; password: string }) => {
  const response = await axios.post<ApiResponse<LoginResponse>>(
    `${BASE_URL}/users/admin-login`,
    data
  );
  return response.data;
};

// Logout
export const logout = async () => {
  const response = await axios.post<ApiResponse<{ message: string }>>(
    `${BASE_URL}/users/logout`
  );
  return response.data;
};

// edit profile
export const editProfile = async (data: Partial<User>) => {
  let token = getFromLS("accessToken"); // Get token properly

  if (!token) {
    throw new Error("No access token found. Please log in again.");
  }

  // Ensure "Bearer" is correctly formatted
  token = token.replace(/"/g, ""); // Removes extra quotes if present

  try {
    const response = await axios.put(`${BASE_URL}/users/edit-profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Correctly formatted token
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Invalid token, logging out...");
      clearLS(); // Remove stored tokens
      window.location.reload(); // Redirect to login
    }
    throw error;
  }
};

// search users

export const searchUsers = async (
  query: string
): Promise<ApiResponse<{ users: User[] }>> => {
  if (!query)
    return {
      success: false,
      message: "No search query",
      data: { users: [] },
    };
  const response = await axios.get<ApiResponse<{ users: User[] }>>(
    `${BASE_URL}/users/search?search=${query}`
  );
  return response.data;
};
