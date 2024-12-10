import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  ApiResponse,
  Product,
} from "../productApi";

// Fetch all products
export const useProducts = () => {
  return useQuery<ApiResponse<{ products: Product[] }>, Error>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

// Create product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{}>, Error, FormData>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Update product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ product: Product }>,
    Error,
    { id: string; data: any }
  >({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{}>, Error, string>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
