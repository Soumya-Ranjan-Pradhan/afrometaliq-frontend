import axios from "axios";

import { BASE_URL } from "@/contants";

// define cart type
export interface Cart {
  cartItemId: string;
  product: {
    _id: string;
    product_name: string;
    product_code: string;
    category: {
      _id: string;
      category_name: string;
    }[];
    product_unit: {
      _id: string;
      unit_name: string;
      createdAt: string;
      updatedAt: string;
    };
    product_price: number;
    product_discount: number;
    product_images: {
      url: string;
      public_id: string;
      _id: string;
    }[];
    product_selling_price: number;
    product_description: string;
    product_size: string;
    product_theme_size: string[];
    product_grade: string;
    product_thickness: string;
    product_uom: string;
    product_length: string;
    product_width: string;
    createdAt: string;
    updatedAt: string;
  };
  quantity: number;
}

// define response type
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// get cart
export const getCart = async (): Promise<ApiResponse<{ cart: Cart[] }>> => {
  const token = localStorage.getItem("accessToken")?.replace(/"/g, "");

  const response = await axios.get<ApiResponse<{ cart: Cart[] }>>(
    `${BASE_URL}/cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// add to cart
export const addToCart = async (data: {
  productId: string;
  quantity: number;
}): Promise<ApiResponse<{ cart: Cart[] }>> => {
  // Get the token and remove extra quotes if necessary
  const token = localStorage.getItem("accessToken")?.replace(/"/g, "");

  if (!token) {
    throw new Error("Unauthorized: Token not found");
  }

  const response = await axios.post<ApiResponse<{ cart: Cart[] }>>(
    `${BASE_URL}/cart`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// delete from cart
export const deleteFromCart = async (
  cartItemId: string
): Promise<ApiResponse<{ cart: Cart[] }>> => {
  const token = localStorage.getItem("accessToken")?.replace(/"/g, "");

  if (!token) {
    throw new Error("Unauthorized: Token not found");
  }

  const response = await axios.delete<ApiResponse<{ cart: Cart[] }>>(
    `${BASE_URL}/cart/${cartItemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// update by quantity
export const updateCartQuantity = async (
  cartItemId: string,
  data: { quantity: number }
): Promise<ApiResponse<{ cart: Cart[] }>> => {
  const token = localStorage.getItem("accessToken")?.replace(/"/g, "");

  if (!token) {
    throw new Error("Unauthorized: Token not found");
  }

  const response = await axios.put<ApiResponse<{ cart: Cart[] }>>(
    `${BASE_URL}/cart/${cartItemId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
