import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  About,
  ApiResponse,
  createAbout,
  deleteAbout,
  fetchAbout,
  updateAbout,
} from "../aboutApi";

// get about
export const useGetAbout = () => {
  return useQuery<ApiResponse<{ about: About[] }>, Error>({
    queryKey: ["about"],
    queryFn: () => fetchAbout(),
  });
};

// create about

export const useAbout = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ about: About[] }>,
    Error,
    { about_title: string; about_description: string }
  >({
    mutationFn: createAbout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
    },
  });
};

// update about
export const useUpdateAbout = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ about: About[] }>,
    Error,
    { id: string; data: { about_title: string; about_description: string } }
  >({
    mutationFn: ({ id, data }) => updateAbout(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
    },
  });
};

// delete about
export const useDeleteAbout = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{}>, Error, string>({
    mutationFn: deleteAbout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
    },
  });
};