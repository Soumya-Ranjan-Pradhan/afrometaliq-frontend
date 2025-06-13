import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponse,
  createTestimonial,
  fetchTestimonials,
  Testimonial,
} from "../testimonialsApi";

export const useAllTestimonials = () => {
  return useQuery<ApiResponse<{ testimonials: Testimonial[] }>, Error>({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{ testimonials: Testimonial[] }>, Error, FormData>({
    mutationFn: createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }); // ✅ Refresh list
    },
  });
};
