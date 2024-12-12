import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";

export interface Product {
  _id: string;
  product_name: string;
  product_code: string;
  product_unit: string;
  product_price: number;
  product_discount: number;
  product_images: { url: string; public_id: string }[];
  product_selling_price: number;
  product_description: string;
  product_size: string[];
  product_theme_size: string;
  product_grade: string;
  product_thickness: string;
  product_uom: string;
  product_length: string;
  product_width: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Get all products
export const getAllProducts = async (): Promise<
  ApiResponse<{ products: Product[] }>
> => {
  const response = await axios.get<ApiResponse<{ products: Product[] }>>(
    `${BASE_URL}/product`
  );
  return response.data;
};

// Get product by ID
export const getProductById = async (
  id: string
): Promise<ApiResponse<{ product: Product }>> => {
  const response = await axios.get<ApiResponse<{ product: Product }>>(
    `${BASE_URL}/product/${id}`
  );
  return response.data;
};

// Create a product
export const createProduct = async (
  data: FormData
): Promise<ApiResponse<{}>> => {
  const response = await axios.post<ApiResponse<{}>>(
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
  data: any
): Promise<ApiResponse<{ product: Product }>> => {
  const response = await axios.put<ApiResponse<{ product: Product }>>(
    `${BASE_URL}/products/${id}`,
    data
  );
  return response.data;
};

// Delete a product
export const deleteProduct = async (id: string): Promise<ApiResponse<{}>> => {
  const response = await axios.delete<ApiResponse<{}>>(
    `${BASE_URL}/products/${id}`
  );
  return response.data;
};
