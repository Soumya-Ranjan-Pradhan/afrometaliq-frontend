import axios from "axios";
import { BASE_URL } from "@/contants";

// Define Banner Type
export interface Banner {
  banner_images: {
    url: string;
    public_id: string;
  }[];
}

// response type
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Get all banners
export const getAllBanners = async (): Promise<
  ApiResponse<{ banners: Banner[] }>
> => {
  const response = await axios.get<ApiResponse<{ banners: Banner[] }>>(
    `${BASE_URL}/banners`
  );
  return response.data;
};

// create banner
export const createBanner = async (
  data: FormData
): Promise<ApiResponse<{}>> => {
  const response = await axios.post<ApiResponse<{}>>(
    `${BASE_URL}/banners`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// update banner
export const updateBanner = async (
  id: string,
  data: FormData
): Promise<ApiResponse<{}>> => {
  const response = await axios.put<ApiResponse<{}>>(
    `${BASE_URL}/banners/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// delete banner
export const deleteBanner = async (id: string): Promise<ApiResponse<{}>> => {
  const response = await axios.delete<ApiResponse<{}>>(
    `${BASE_URL}/banners/${id}`
  );
  return response.data;
};
