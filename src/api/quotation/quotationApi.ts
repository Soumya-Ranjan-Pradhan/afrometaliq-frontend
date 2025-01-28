import axios from "axios";

import { BASE_URL } from "@/contants";
import { getFromLS } from "@/lib/storage";

// Define the product interface
export interface Product {
  _id: string;
  product_name: string;
  product_code: string;
  product_price: number;
  product_discount?: number;
  product_images: {
    url: string;
    public_id: string;
    _id: string;
  }[];
  product_selling_price: number;
  product_description: string;
  product_size?: string;
  product_theme_size?: string[];
  product_grade?: string;
  product_thickness?: string;
  product_uom?: string;
  product_length?: string;
  product_width?: string;
  createdAt: string;
  updatedAt: string;
}

// Define the user interface
export interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber: number;
}

// Define the quotation interface
export interface Quotation {
  _id: string;
  products: {
    product: Product;
    quantity: number;
  }[];
  user: User;
  message: string;
  createdAt: string;
  updatedAt: string;
}

// Define the API response type
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// API Calls

// Create a new quotation
export const createQuotation = async (data: {
  products: { product: string; quantity: number }[];
  message?: string;
}): Promise<ApiResponse<Quotation>> => {
  const token = getFromLS("accessToken");

  if (!token) {
    throw new Error("Unauthorized: Token not found");
  }

  const response = await axios.post<ApiResponse<Quotation>>(
    `${BASE_URL}/quotation`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// Get all quotations
export const getQuotations = async (): Promise<ApiResponse<Quotation[]>> => {
  const token = getFromLS("accessToken");

  if (!token) {
    throw new Error("Unauthorized: Token not found");
  }

  const response = await axios.get<ApiResponse<Quotation[]>>(
    `${BASE_URL}/quotation`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
