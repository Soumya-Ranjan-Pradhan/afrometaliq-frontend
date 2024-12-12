import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";

export interface Users {
    _id: string;
    name: string;
    email: string;
    phoneNumber: number;
    isEmailVerified: boolean;
    role: string;
    createdAt: string;
    updatedAt: string;
    
  }
  
  export interface SignupResponse {
    user: Users;
    accessToken: string;
    refreshToken: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }
  

// Get all users
export const fetchUsers = async (): Promise<
  ApiResponse<{ users: Users[] }>
> => {
  const response = await axios.get<ApiResponse<{ users: Users[] }>>(
    `${BASE_URL}/users`
  );
  return response.data;
};

// Create a new user
export const createUser = async (
  data: any
): Promise<ApiResponse<{ user: Users }>> => {
  const response = await axios.post<ApiResponse<{ user: Users }>>(
    `${BASE_URL}/users/register`,
    data
  );
  return response.data;
};

// send verify otp
export const sendOtp = async (
  data: any
): Promise<ApiResponse<{ user: Users }>> => {
  const response = await axios.post<ApiResponse<{ user: Users }>>(
    `${BASE_URL}/users/send-verify-otp`,
    data
  );
  return response.data;
};

// verify otp
export const verifyOtp = async (
  data: any
): Promise<ApiResponse<{ user: Users }>> => {
  const response = await axios.post<ApiResponse<{ user: Users }>>(
    `${BASE_URL}/users/verify-otp`,
    data
  );
  return response.data;
};

// login user
export const loginUser = async (
  data: any
): Promise<ApiResponse<{ user: Users; accessToken: string }>> => {
  const response = await axios.post<ApiResponse<{ user: Users; accessToken: string }>>(
    `${BASE_URL}/users/login`,
    data
  );
  return response.data;
};
