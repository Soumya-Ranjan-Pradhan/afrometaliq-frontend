import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";

export interface Gallery {
  _id: string;
  image: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Fetch all galleries
export const fetchGalleries = async (): Promise<
  ApiResponse<{ gallery: Gallery[] }>
> => {
  const response = await axios.get<ApiResponse<{ gallery: Gallery[] }>>(
    `${BASE_URL}/gallery`
  );
  return response.data;
};

// Create gallery
export const createGallery = async (
  data: FormData
): Promise<ApiResponse<{}>> => {
  const response = await axios.post<ApiResponse<{}>>(
    `${BASE_URL}/gallery`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Get single gallery
export const getGalleryById = async (
  id: string
): Promise<ApiResponse<{ gallery: Gallery }>> => {
  const response = await axios.get<ApiResponse<{ gallery: Gallery }>>(
    `${BASE_URL}/gallery/${id}`
  );
  return response.data;
};

// Update gallery
export const updateGallery = async (
  id: string,
  data: { title: string; description: string }
): Promise<ApiResponse<{ gallery: Gallery }>> => {
  const response = await axios.patch<ApiResponse<{ gallery: Gallery }>>(
    `${BASE_URL}/gallery/${id}`,
    data
  );
  return response.data;
};

// Delete gallery
export const deleteGallery = async (id: string): Promise<ApiResponse<{}>> => {
  const response = await axios.delete<ApiResponse<{}>>(
    `${BASE_URL}/gallery/${id}`
  );
  return response.data;
};
