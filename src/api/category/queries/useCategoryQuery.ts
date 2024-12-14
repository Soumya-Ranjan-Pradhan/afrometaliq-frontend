/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  ApiResponse,
  Category,
  CategoryMenu,
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchCategoriesByLevel,
  fetchCategoryMenu,
  getCategoryById,
  searchCategory,
  updateCategory,
} from "../categoryApi";

// Fetch all categories
export const useCategories = (
  { parent }: { parent: string | null },
  options?: Partial<UseQueryOptions<any>>
) => {
  return useQuery<ApiResponse<{ categories: Category[] }>, Error>({
    queryKey: ["categories", parent],
    queryFn: () => fetchCategories(parent),
    ...options,
  });
};

// Fetch all categories by level
export const useCategoriesByLevel = (
  { level }: { level: number },
  options?: Partial<UseQueryOptions<any>>
) => {
  return useQuery<ApiResponse<{ categories: Category[] }>, Error>({
    queryKey: ["categories", "level", level],
    queryFn: () => fetchCategoriesByLevel(level),
    ...options,
  });
};
// get category by id
export const useCategoryById = (
  { id }: { id: string },
  options?: Partial<UseQueryOptions<any>>
) => {
  return useQuery<ApiResponse<{ category: Category }>, Error>({
    queryKey: ["categories", "id", id],
    queryFn: () => getCategoryById(id),
    ...options,
  });
};

// Create a new category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ categories: Category[] }>,
    Error,
    FormData //! Variables type passed to the mutation
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
    { id: string; data: FormData } //! Variables type
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

export const useCategoryMenu = () => {
  return useQuery<ApiResponse<{ menu: CategoryMenu[] }>, Error>({
    queryKey: ["categories", "menu"],
    queryFn: () => fetchCategoryMenu(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
