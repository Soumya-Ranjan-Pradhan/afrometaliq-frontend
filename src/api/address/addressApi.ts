import axios from "axios";
// import { BASE_URL } from "@/contants";
const BASE_URL = "http://localhost:3001/api/v1";

//// Define Address Type interface
export interface Address {
  _id: string;
  user: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  country: string;
  phone_number: number;
  createdAt: string;
  updatedAt: string;
}
// define API response type
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// get all address

export const getAddress = async (): Promise<ApiResponse<Address[]>> => {
  const token = localStorage.getItem("accessToken")?.replace(/"/g, "");

  const response = await axios.get<ApiResponse<Address[]>>(
    `${BASE_URL}/address`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// create address
export const createAddress = async (data: {
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  country: string;
  phone_number: number;
}): Promise<ApiResponse<{ address: Address[] }>> => {
  const token = localStorage.getItem("accessToken")?.replace(/"/g, "");

  const response = await axios.post<ApiResponse<{ address: Address[] }>>(
    `${BASE_URL}/address`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// update address
export const updateAddress = async (
  id: string,
  data: {
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    country: string;
    phone_number: number;
  }
): Promise<ApiResponse<{ address: Address[] }>> => {
  const token = localStorage.getItem("accessToken")?.replace(/"/g, "");

  const response = await axios.put<ApiResponse<{ address: Address[] }>>(
    `${BASE_URL}/address/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};


export const deleteAddress = async (id: string): Promise<ApiResponse<{}>> => {
  const token = localStorage.getItem("accessToken")?.replace(/"/g, "");

  if (!token) {
    throw new Error("Unauthorized: Token not found");
  }

  const response = await axios.delete<ApiResponse<{ address: Address[] }>>(
    `${BASE_URL}/address/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
