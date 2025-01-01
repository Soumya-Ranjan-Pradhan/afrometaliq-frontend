// use get address

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Address,
  ApiResponse,
  createAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../addressApi";

// get user address
export const useCartQuery = () => {
  return useQuery<ApiResponse<Address[]>, Error>({
    queryKey: ["address"],
    queryFn: () => getAddress(),
  });
};

// create address
export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ address: Address[] }>,
    Error,
    {
      address_line_1: string;
      address_line_2: string;
      city: string;
      state: string;
      country: string;
      phone_number: number;
    }
  >({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });
};

// update address
export const useUpdateAddress = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ address: Address[] }>,
    Error,
    {
      address_line_1: string;
      address_line_2: string;
      city: string;
      state: string;
      country: string;
      phone_number: number;
    }
  >({
    mutationFn: (data) => updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });
};

// delete address
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{}>, Error, string>({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });
};
