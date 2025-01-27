import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  ApiResponse,
  Product,
  ProductQuery,
  getProductById,
  PopulatedProduct,
  fetchRelatedProducts,
} from "../productApi";

// Fetch all products

export const useProducts = (query?: ProductQuery) => {
  return useQuery<ApiResponse<{ products: Product[] }>, Error>({
    queryKey: ["products", query],
    queryFn: () => getAllProducts(query),
    enabled: !!query,
  });
};

// get all products
export const useAllProducts = (query?: ProductQuery) => {
  return useQuery<ApiResponse<{ products: Product[] }>, Error>({
    queryKey: ["products", query],
    queryFn: () => getAllProducts(query),
  });
};

// Get product by id
export const useProductById = (id: string) => {
  return useQuery<ApiResponse<{ product: PopulatedProduct }>, Error>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
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
    { id: string; data: FormData }
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

// used the related product
export const useRelatedProducts = (
  categories: string[],
  strict: boolean = true
) => {
  return useQuery<ApiResponse<{ products: Product[] }>, Error>({
    queryKey: ["relatedProducts", categories, strict],
    queryFn: () => fetchRelatedProducts(categories, strict),
  });
};
