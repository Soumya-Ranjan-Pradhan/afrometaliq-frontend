import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponse,
  createUnits,
  deleteUnits,
  fetchUnits,
  searchUnits,
  Unit,
  updateUnits,
} from "../unitsApi";

// Fetch all categories
export const useUnits = () => {
  return useQuery<ApiResponse<{ units: Unit[] }>, Error>({
    queryKey: ["units"],
    queryFn: () => fetchUnits(),
  });
};

// create units
export const useCreateUnits = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ units: Unit[] }>,
    Error,
    { unit_name: string }
  >({
    mutationFn: createUnits,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
};

// update units
export const useUpdateUnits = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ units: Unit[] }>,
    Error,
    { id: string; data: { unit_name: string } }
  >({
    mutationFn: ({ id, data }) => updateUnits(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
};

// delete units
export const useDeleteUnits = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ units: Unit[] }>,
    Error,
    string //! Variables type (ID of the units)
  >({
    mutationFn: deleteUnits,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
};

// search units
export const useSearchUnits = (query: string) => {
  return useQuery<ApiResponse<{ units: Unit[] }>, Error>({
    queryKey: ["units", query],
    queryFn: () => searchUnits(query),
    enabled: !!query,
  });
};
