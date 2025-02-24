"use client";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  adminLogin,
  ApiResponse,
  createUser,
  editProfile,
  fetchUsers,
  getLoggedInUser,
  loginUser,
  logout,
  sendForgotPasswordOTPEmail,
  sendOtp,
  User,
  verifyOtp,
  verifyOtpAndResetPassword,
} from "../authApi";
import { useAuthStore } from "@/store/auth";
import { clearLS, getFromLS, storeToLS } from "@/lib/storage";

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
      // localStorage.setItem("accessToken", accessToken);
      // localStorage.setItem("refreshToken", refreshToken);
      storeToLS("accessToken", accessToken);
      storeToLS("refreshToken", refreshToken);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("User created successfully and logged in:", data);
    },
    onError: (error: Error) => {
      console.error("Error creating user:", error);
    },
  });
};

export const useGetLoggedUserDetails = (
  options?: Partial<UseQueryOptions<any>>
) => {
  const setUser = useAuthStore((state) => state.setUser);
  // const accessToken = getFromLS("accessToken");
  const accessToken = getFromLS("accessToken");

  return useQuery<ApiResponse<{ user: User }>, Error>({
    queryKey: ["user", "me", accessToken],
    queryFn: () => getLoggedInUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 0,
    select: (data) => {
      if (data?.data?.user) {
        setUser(data.data.user);
      }
      return data;
    },
    enabled: !!accessToken,

    ...options,
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
      // localStorage.setItem("accessToken", accessToken);
      // localStorage.setItem("refreshToken", refreshToken);
      storeToLS("accessToken", accessToken);
      storeToLS("refreshToken", refreshToken);
      queryClient.invalidateQueries({ queryKey: ["user"] });
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

// Send Forgot Password OTP Email
export const useSendForgotPasswordOTPEmail = () => {
  return useMutation<
    ApiResponse<{ message: string }>,
    Error,
    { email: string }
  >({
    mutationFn: (data) => sendForgotPasswordOTPEmail(data.email),
    onError: (error) => {
      console.error("Error sending OTP email:", error);
    },
  });
};

export const useVerifyOtpAndResetPassword = () => {
  return useMutation<
    ApiResponse<{ message: string }>,
    Error,
    { email: string; otp: string; newPassword: string; confirmPassword: string }
  >({
    mutationFn: verifyOtpAndResetPassword,
    onError: (error) => {
      console.error("Error resetting password:", error);
    },
  });
};

// Login Admin
export const useAdminLogin = () => {
  return useMutation<
    ApiResponse<{ user: User; accessToken: string; refreshToken: string }>,
    Error,
    { email: string; password: string }
  >({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data?.data;
      // localStorage.setItem("accessToken", accessToken);
      // localStorage.setItem("refreshToken", refreshToken);
      storeToLS("accessToken", accessToken);
      storeToLS("refreshToken", refreshToken);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: async () => {
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");
      clearLS();
      setUser(null);
      // window.location.reload();
      queryClient.invalidateQueries();
      return true;
    },
  });
};

// edit profile
export const useEditProfile = () => {
  return useMutation<ApiResponse<{ message: string }>, Error, Partial<User>>({
    mutationFn: editProfile,
  });
};

// export const useLogout = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: logout,
//     onSuccess: () => {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       queryClient.invalidateQueries({ queryKey: ["user", "me"] });
//       queryClient.clear();
//     },
//   });
// };
