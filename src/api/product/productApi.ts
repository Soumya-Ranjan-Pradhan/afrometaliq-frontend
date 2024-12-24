// import axios from "axios";

// export interface Product {
//   product_name: string;
//   product_code: string;
//   product_unit: string;
//   product_price: number;
//   product_discount: number;
//   product_images: { url: string; public_id: string }[];
//   product_selling_price: number;
//   product_description: string;
//   product_size: string[];
//   product_theme_size: string;
//   product_grade: string;
//   product_thickness: string;
//   product_uom: string;
//   product_length: string;
//   product_width: string;
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
// }

import axios from "axios";

import { BASE_URL } from "@/contants";

export interface Product {
  _id: string;
  product_name: string;
  product_code: string;
  category: { _id: string; category_name: string }[];
  product_unit: { _id: string; unit_name: string };
  product_price: number;
  product_discount: number;
  product_images: { url: string; public_id: string }[];
  product_selling_price: number;
  product_description: string;
  product_size: string[];
  product_theme_size: string[];
  product_grade: string;
  product_thickness: string;
  product_uom: string;
  product_length: string;
  product_width: string;
  createdAt: string;
  updatedAt: string;
}
export interface PopulatedProduct {
  product_name: string;
  product_code: string;
  category: {
    _id: string;
    category_name: string;
  }[];
  product_unit: {
    _id: string;
    unit_name: string;
  };
  product_price: number;
  product_discount: number;
  product_images: { _id: string; url: string; public_id: string }[]; // Array of image objects
  product_selling_price: number;
  product_description: string;
  product_size: string;
  product_theme_size: string[];
  product_grade: string;
  product_thickness: string;
  product_uom: string; // Unit of Measurement
  product_length: string;
  product_width: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export type ProductQuery = {
  discount?: number;
};

// Get all products
export const getAllProducts = async (
  query?: ProductQuery
): Promise<ApiResponse<{ products: Product[] }>> => {
  const response = await axios.get<ApiResponse<{ products: Product[] }>>(
    `${BASE_URL}/product`,
    { params: query }
  );
  return response.data;
};

// Get product by ID
export const getProductById = async (
  id: string
): Promise<ApiResponse<{ product: PopulatedProduct }>> => {
  const response = await axios.get<ApiResponse<{ product: PopulatedProduct }>>(
    `${BASE_URL}/product/${id}`
  );
  return response.data;
};

// Create a product
export const createProduct = async (
  data: FormData
): Promise<ApiResponse<unknown>> => {
  const response = await axios.post<ApiResponse<unknown>>(
    `${BASE_URL}/product`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Update a product
export const updateProduct = async (
  id: string,
  data: unknown
): Promise<ApiResponse<{ product: Product }>> => {
  const response = await axios.put<ApiResponse<{ product: Product }>>(
    `${BASE_URL}/product/${id}`,
    data
  );
  return response.data;
};

// Delete a product
export const deleteProduct = async (
  id: string
): Promise<ApiResponse<unknown>> => {
  const response = await axios.delete<ApiResponse<unknown>>(
    `${BASE_URL}/product/${id}`
  );
  return response.data;
};
