import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";

export interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber: number;
  isEmailVerified: boolean;
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

export const createUser = async (
  data: Partial<User>
): Promise<ApiResponse<{ user: User }>> => {
  const response = await axios.post<ApiResponse<{ user: User }>>(
    `${BASE_URL}/users/register`,
    data
  );
  return response.data;
};

// send verify otp

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
