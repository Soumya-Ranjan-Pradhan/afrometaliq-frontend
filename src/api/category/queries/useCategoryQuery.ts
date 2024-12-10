import { useMutation, useQuery, useQueryClient,UseQueryOptions } from "@tanstack/react-query";
import {
  ApiResponse,
  Category,
  createCategory,
  deleteCategory,
  fetchCategories,
  getCategoryById,
  searchCategory,
  updateCategory,
} from "../categoryApi";


// Fetch all categories
export const useCategories = ({parent}: {parent: string | null}) => {
  return useQuery<ApiResponse<{ categories: Category[] }>, Error>({
    queryKey: ["categories", parent],
    queryFn: () => fetchCategories(parent),
  });
};
// get category by id
export const useCategoryById = ({id}: {id: string }, options?: Partial<UseQueryOptions<any>>) => {
  return useQuery<ApiResponse<{ category: Category }>, Error>({
    queryKey: ["categories", "id", id],
    queryFn: () => getCategoryById(id),
    ...options
  });
};

// Create a new category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ categories: Category[] }>,
    Error,
    { category_name: string, parent: string | null } //! Variables type passed to the mutation
  >({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }); //! Refresh categories
    },
  });
};

// Update a category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ category: Category }>, //! Return type
    Error, // Error type
    { id: string; data: { category_name: string } } //! Variables type
  >({
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// Delete a category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ category: Category }>, //! Return type
    Error, //! Error type
    string //! Variables type (ID of the category)
  >({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useSearchCategory = (query: string) => {
  return useQuery<ApiResponse<{ categories: Category[] }>, Error>({
    queryKey: ["categories", query], //! Unique query key with the search query
    queryFn: () => searchCategory(query),
    enabled: !!query, //! Only run the query if `query` is not empty
  });
};
