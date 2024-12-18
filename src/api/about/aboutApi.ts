import axios from "axios";
import { BASE_URL } from "@/contants";

export type About = {
  _id: string;
  about_title: string;
  about_description: string;
  createdAt: string;
  updatedAt: string;
};

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// get all about
export const fetchAbout = async (): Promise<
  ApiResponse<{ about: About[] }>
> => {
  const response = await axios.get<ApiResponse<{ about: About[] }>>(
    `${BASE_URL}/about`
  );
  return response.data;
};

// create about
export const createAbout = async (data: {
  about_title: string;
  about_description: string;
}): Promise<ApiResponse<{ about: About[] }>> => {
  const response = await axios.post<ApiResponse<{ about: About[] }>>(
    `${BASE_URL}/about`,
    data
  );
  return response.data;
};

// update about
export const updateAbout = async (
  id: string,
  data: { about_title: string; about_description: string }
): Promise<ApiResponse<{ about: About[] }>> => {
  const response = await axios.put<ApiResponse<{ about: About[] }>>(
    `${BASE_URL}/about/${id}`,
    data
  );
  return response.data;
};

// delete about
export const deleteAbout = async (id: string): Promise<ApiResponse<{}>> => {
  const response = await axios.delete<ApiResponse<{}>>(
    `${BASE_URL}/about/${id}`
  );
  return response.data;
};
