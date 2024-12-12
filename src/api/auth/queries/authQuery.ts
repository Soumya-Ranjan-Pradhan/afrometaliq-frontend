import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, createUser, fetchUsers, loginUser, } from "../authApi";


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