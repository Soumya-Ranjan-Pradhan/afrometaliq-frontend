import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  ApiResponse,
  Product,
  ProductQuery,
} from "../productApi";

// Fetch all products

export const useProducts = (query?: ProductQuery) => {
  return useQuery<ApiResponse<{ products: Product[] }>, Error>({
    queryKey: ["products"],
    queryFn: () => getAllProducts(query),
  });
};

// Create product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<unknown>, Error, FormData>({
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
    { id: string; data: unknown }
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
  return useMutation<ApiResponse<unknown>, Error, string>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
