import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponse,
  createUser,
  fetchUsers,
  loginUser,
  User,
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
