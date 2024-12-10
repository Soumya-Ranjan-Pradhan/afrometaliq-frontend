import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchGalleries,
  createGallery,
  deleteGallery,
  getGalleryById,
  updateGallery,
  ApiResponse,
  Gallery,
} from "../galleryApi";

// Fetch all galleries
export const useGalleries = () => {
  return useQuery<ApiResponse<{ gallery: Gallery[] }>, Error>({
    queryKey: ["galleries"],
    queryFn: fetchGalleries,
  });
};

// Create gallery
export const useCreateGallery = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{}>, Error, FormData>({
    mutationFn: createGallery,
    onSuccess: () => {
      // Corrected invalidateQueries call
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
    },
  });
};

// Get single gallery
export const useGalleryById = (id: string) => {
  return useQuery<ApiResponse<{ gallery: Gallery }>, Error>({
    queryKey: ["gallery", id],
    queryFn: () => getGalleryById(id),
  });
};

// Update gallery
export const useUpdateGallery = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ gallery: Gallery }>,
    Error,
    { id: string; data: { title: string; description: string } }
  >({
    mutationFn: ({ id, data }) => updateGallery(id, data),
    onSuccess: () => {
      // Corrected invalidateQueries call
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
    },
  });
};

// Delete gallery
export const useDeleteGallery = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{}>, Error, string>({
    mutationFn: deleteGallery,
    onSuccess: () => {
      // Corrected invalidateQueries call
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
    },
  });
};
