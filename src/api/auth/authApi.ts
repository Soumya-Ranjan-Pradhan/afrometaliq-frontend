import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";

export interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  password: string;
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

// Get all users
export const fetchUsers = async (): Promise<ApiResponse<UsersResponse>> => {
  const response = await axios.get<ApiResponse<UsersResponse>>(
    `${BASE_URL}/users`
  );
  return response.data;
};

// gett logged in user
export const getLoggedInUser = async (): Promise<
  ApiResponse<{
    user: User;
  }>
> => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get<ApiResponse<{ user: User }>>(
    `${BASE_URL}/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
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
