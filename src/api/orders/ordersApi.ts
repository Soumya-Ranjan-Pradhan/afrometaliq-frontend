// import { BASE_URL } from "@/contants";
import axios from "axios";
import { BASE_URL } from "@/contants";

// API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Order Interfaces
export interface Order {
  _id: string;
  user: User;
  products: OrderProduct[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress: Address | null;
  billingAddress: Address | null;
  createdAt: string;
  updatedAt: string;
  paymentIntentId?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber: number;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export interface OrderProduct {
  product: Product | null;
  quantity: number;
  _id: string;
}

export interface Product {
  _id: string;
  product_name: string;
  product_code: string;
  product_price: number;
  product_discount: number;
  product_selling_price: number;
  product_description: string;
  product_size: string;
  product_images: { url: string; public_id: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  country: string;
  phone_number: number;
}

// Helper function to get Authorization header
const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken")?.replace(/"/g, "");
  if (!token) {
    throw new Error("Unauthorized: Token not found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Create Order
export const createOrder = async (orderData: {
  products: { product: string; quantity: number }[];
  totalAmount: number;
  shippingAddress: string;
  billingAddress: string;
}): Promise<
  ApiResponse<{
    order: Order;
    paymentIntent: { id: string; clientSecret: string };
  }>
> => {
  const response = await axios.post<
    ApiResponse<{
      order: Order;
      paymentIntent: { id: string; clientSecret: string };
    }>
  >(`${BASE_URL}/order`, orderData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Get All Orders
export const fetchAllOrders = async (): Promise<
  ApiResponse<{ orders: Order[] }>
> => {
  const response = await axios.get<ApiResponse<{ orders: Order[] }>>(
    `${BASE_URL}/order`,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

// Get Order by ID
export const fetchOrderById = async (
  orderId: string
): Promise<ApiResponse<{ order: Order }>> => {
  console.log("Fetching order by ID:", orderId);

  const response = await axios.get<ApiResponse<{ order: Order }>>(
    `${BASE_URL}/order/${orderId}`,
    {
      headers: getAuthHeader(),
    }
  );

  return response.data;
};

// Update Order
export const updateOrder = async (
  orderId: string,
  orderData: Partial<Order>
): Promise<ApiResponse<{ order: Order }>> => {
  const response = await axios.put<ApiResponse<{ order: Order }>>(
    `${BASE_URL}/order/${orderId}`,
    orderData,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};
