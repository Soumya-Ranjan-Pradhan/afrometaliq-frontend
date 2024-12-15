import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import {
  ApiResponse,
  createUser,
  fetchUsers,
  getLoggedInUser,
  loginUser,
  sendOtp,
  User,
  verifyOtp,
} from "../authApi";

// get all users
export const useUsers = () => {
  return useQuery<ApiResponse<{ users: User[] }>, Error>({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });
};

// create user
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<{ user: User; accessToken: string; refreshToken: string }>,
    Error,
    Partial<User>
  >({
    mutationFn: createUser,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("User created successfully and logged in:", data);
    },
    onError: (error: Error) => {
      console.error("Error creating user:", error);
    },
  });
};

export const useGetLoggedUserDetails = (options?: Partial<UseQueryOptions<any>>) => {
  return useQuery<ApiResponse<{ user: User }>, Error>({
    queryKey: ["user", "me"],
    queryFn: () => getLoggedInUser(),
    ...options
  });
}

// login user
export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ user: User; accessToken: string; refreshToken: string }>,
    Error,
    { email: string; password: string }
  >({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// send otp in the mail
export const useSendOtp = () => {
  return useMutation<
    ApiResponse<{ message: string }>,
    Error,
    { email: string }
  >({
    mutationFn: sendOtp,
  });
};

// verify otp
export const useVerifyOtp = () => {
  return useMutation<
    ApiResponse<{ message: string }>,
    Error,
    { email: string; otp: string }
  >({
    mutationFn: verifyOtp,
  });
};
