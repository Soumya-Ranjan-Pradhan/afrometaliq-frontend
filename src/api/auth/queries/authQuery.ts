import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, createUser, fetchUsers, loginUser, sendOtp, Users, verifyOtp } from "../authApi";


// get all users
export const useUsers = () => {
    return useQuery<ApiResponse<{ users: Users[] }>, Error>({
        queryKey: ["users"],
        queryFn: () => fetchUsers(),
    });
};

// create user
export const useCreateUser = () => {
    const queryClient = useQueryClient();
  
    return useMutation<ApiResponse<{ user: Users }>, Error, any>({
      mutationFn: createUser,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        console.log("User created successfully:", data);
      },
      onError: (error: Error) => {
        console.error("Error creating user:", error);
      },
    });
  };

// send verify otp
export const useSendOtp = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{ user: Users }>, Error, any>({
    mutationFn: sendOtp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// verify otp
export const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{ user: Users }>, Error, any>({
    mutationFn: verifyOtp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// login user
export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{ user: Users; accessToken: string }>, Error, any>({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};