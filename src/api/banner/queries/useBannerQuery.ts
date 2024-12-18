import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponse,
  Banner,
  createBanner,
  deleteBanner,
  getAllBanners,
  updateBanner,
} from "../bannerApi";

// get all banners
export const useGetAllBanner = () => {
  return useQuery<ApiResponse<{ banners: Banner[] }>, Error>({
    queryKey: ["banners"],
    queryFn: getAllBanners,
  });
};

// create banner
export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{}>, Error, FormData>({
    mutationFn: createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
};

// update banner
export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{}>, Error, { id: string; data: FormData }>({
    mutationFn: ({ id, data }) => updateBanner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
};

// delete banner
export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{}>, Error, string>({
    mutationFn: deleteBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
};
