import axios from "axios";

import { BASE_URL } from "@/contants";

// Define Unit Type
export type Unit = {
  _id: string;
  unit_name: string;
  createdAt: string;
  updatedAt: string;
};

// Define API Response Type
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type UnitFilters = {
  page?: number;
  limit?: number;
  search?: string;
};

export type UnitResponse = {
  units: Unit[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};

export const fetchUnits = async (
  query?: UnitFilters
): Promise<ApiResponse<UnitResponse>> => {
  const response = await axios.get<ApiResponse<UnitResponse>>(
    `${BASE_URL}/units`,
    { params: query }
  );
  return response.data;
};

// create units
export const createUnits = async (data: {
  unit_name: string;
}): Promise<ApiResponse<{ units: Unit[] }>> => {
  const response = await axios.post<ApiResponse<{ units: Unit[] }>>(
    `${BASE_URL}/units`,
    data
  );
  return response.data;
};

// update units
export const updateUnits = async (
  id: string,
  data: { unit_name: string }
): Promise<ApiResponse<{ units: Unit[] }>> => {
  const response = await axios.put<ApiResponse<{ units: Unit[] }>>(
    `${BASE_URL}/units/${id}`,
    data
  );
  return response.data;
};

// delete units
export const deleteUnits = async (
  id: string
): Promise<ApiResponse<{ units: Unit[] }>> => {
  const response = await axios.delete<ApiResponse<{ units: Unit[] }>>(
    `${BASE_URL}/units/${id}`
  );
  return response.data;
};

// search units
export const searchUnits = async (
  query: string
): Promise<ApiResponse<{ units: Unit[] }>> => {
  const response = await axios.get<ApiResponse<{ units: Unit[] }>>(
    `${BASE_URL}/units/search?search=${query}`
  );
  return response.data;
};
