import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";

// Define Category Type
export interface Category {
  _id: string;
  category_name: string;
  parent: string | null;
  ancestors: string | null;
  createdAt: string;
  updatedAt: string;
}

// Define API Response Type
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Fetch all categories
export const fetchCategories = async (
  parent: string | null
): Promise<ApiResponse<{ categories: Category[] }>> => {
  const response = await axios.get<ApiResponse<{ categories: Category[] }>>(
    `${BASE_URL}/category`,
    {
      params: { parent },
    }
  );
  return response.data;
};

export const getCategoryById = async (
  id: string
): Promise<ApiResponse<{ category: Category }>> => {
  const response = await axios.get<ApiResponse<{ category: Category }>>(
    `${BASE_URL}/category/${id}`
  );
  return response.data;
};

// Create a new category
export const createCategory = async (
  data: FormData
): Promise<ApiResponse<{ categories: Category[] }>> => {
  const response = await axios.post<ApiResponse<{ categories: Category[] }>>(
    `${BASE_URL}/category`,
    data
  );
  return response.data;
};

// Update a category
export const updateCategory = async (
  id: string,
  data: FormData
): Promise<ApiResponse<{ category: Category }>> => {
  const response = await axios.put<ApiResponse<{ category: Category }>>(
    `${BASE_URL}/category/${id}`,
    data
  );
  return response.data;
};

// Delete a category
export const deleteCategory = async (
  id: string
): Promise<ApiResponse<{ category: Category }>> => {
  const response = await axios.delete<ApiResponse<{ category: Category }>>(
    `${BASE_URL}/category/${id}`
  );
  return response.data;
};

export const searchCategory = async (
  query: string
): Promise<ApiResponse<{ categories: Category[] }>> => {
  const response = await axios.get<ApiResponse<{ categories: Category[] }>>(
    `${BASE_URL}/category/search?search=${query}`
  );
  return response.data;
};

export type CategoryMenu = {
  _id: string;
  category_name: string;
  parent: string | null;
  children: CategoryMenu[];
};

// fetch all categories with child
export const fetchCategoryMenu = async (): Promise<
  ApiResponse<{ menu: CategoryMenu[] }>
> => {
  const response = await axios.get<ApiResponse<{ menu: CategoryMenu[] }>>(
    `${BASE_URL}/category/menu`
  );
  return response.data;
};
