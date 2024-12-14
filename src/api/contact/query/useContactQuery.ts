import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponse,
  Contact,
  createContact,
  deleteContact,
  getAllContact,
  getContactById,
  updateContact,
} from "../contactApi";

// get all contact
export const useGetAllContact = () => {
  return useQuery<ApiResponse<{ contact: Contact[] }>, Error>({
    queryKey: ["contact"],
    queryFn: () => getAllContact(),
  });
};

// create contact
export const createContacts = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ contact: Contact[] }>,
    Error,
    {
      first_name: string;
      last_name: string;
      email: string;
      mobile_number: string;
      message: string;
    }
  >({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
};


// get contact by id
export const useGetContactById = (id: string) => {
  return useQuery<ApiResponse<{ contact: Contact[] }>, Error>({
    queryKey: ["contact", id],
    queryFn: () => getContactById(id),
  });
};

// update contact
export const useUpdateContact = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ contact: Contact[] }>,
    Error,
    {
      _id: string;
      first_name: string;
      last_name: string;
      email: string;
      mobile_number: string;
      message: string;
    }
  >({
    mutationFn: (data) => updateContact(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
};

// delete contact
export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{}>, Error, string>({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
};

// search contact first_name last_name and email
export const useSearchContact = () => {
  return useQuery<ApiResponse<{ contact: Contact[] }>, Error>({
    queryKey: ["contact"],
    queryFn: () => getAllContact(),
  });
};
