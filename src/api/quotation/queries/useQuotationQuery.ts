import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, createQuotation, Quotation } from "../quotationApi";

export const useCreateQuotation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<Quotation>,
    Error,
    { products: { product: string; quantity: number }[]; message?: string }
  >({
    mutationFn: createQuotation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotations"] });
    },
  });
};
