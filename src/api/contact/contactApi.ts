import axios from "axios";
import { BASE_URL } from "@/contants";

export type Contact = {
  // _id: string; 
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  message: string;
};

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// create contact
export const createContact = async (
  data: Contact
): Promise<ApiResponse<{ contact: Contact[] }>> => {
  const response = await axios.post<ApiResponse<{ contact: Contact[] }>>(
    `${BASE_URL}/contacts`,
    data
  );
  return response.data;
};

// get all contact
export const getAllContact = async (): Promise<
  ApiResponse<{ contact: Contact[] }>
> => {
  const response = await axios.get<ApiResponse<{ contact: Contact[] }>>(
    `${BASE_URL}/contacts`
  );
  return response.data;
};

// get contact by id
export const getContactById = async (
  id: string
): Promise<ApiResponse<{ contact: Contact[] }>> => {
  const response = await axios.get<ApiResponse<{ contact: Contact[] }>>(
    `${BASE_URL}/contacts/${id}`
  );
  return response.data;
};

// update contact
export const updateContact = async (
  id: string,
  data: Contact
): Promise<ApiResponse<{ contact: Contact[] }>> => {
  const response = await axios.put<ApiResponse<{ contact: Contact[] }>>(
    `${BASE_URL}/contacts/${id}`,
    data
  );
  return response.data;
};

// delete contact
export const deleteContact = async (id: string): Promise<ApiResponse<{}>> => {
  const response = await axios.delete<ApiResponse<{}>>(
    `${BASE_URL}/contacts/${id}`
  );
  return response.data;
};

// search contact
// search contact
export const searchContact = async (
  query: string
): Promise<ApiResponse<{ contact: Contact[] }>> => {
  const response = await axios.get<ApiResponse<{ contact: Contact[] }>>(
    `${BASE_URL}/contacts/search?query=${query}` 
  );
  return response.data;
};

