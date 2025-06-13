import axios from "axios";
import { BASE_URL } from "@/contants";

export interface Testimonial {
  _id: string;
  name: string;
  testimonial_images: { url: string; public_id: string }[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ✅ Create testimonial API
export const createTestimonial = async (
  data: FormData
): Promise<ApiResponse<{ testimonials: Testimonial[] }>> => {
  const response = await axios.post<
    ApiResponse<{ testimonials: Testimonial[] }>
  >(`${BASE_URL}/testimonials`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// ✅ Get all testimonials
export const fetchTestimonials = async (): Promise<
  ApiResponse<{ testimonials: Testimonial[] }>
> => {
  const response = await axios.get<
    ApiResponse<{ testimonials: Testimonial[] }>
  >(`${BASE_URL}/testimonials`);
  return response.data;
};

// update testimonial

export const updateTestimonial = async (
  id: string,
  data: FormData
): Promise<ApiResponse<{ testimonials: Testimonial[] }>> => {
  const response = await axios.put<
    ApiResponse<{ testimonials: Testimonial[] }>
  >(`${BASE_URL}/testimonials/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
