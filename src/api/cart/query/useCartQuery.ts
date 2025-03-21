import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  ApiResponse,
  Cart,
  deleteFromCart,
  getCart,
  updateCartQuantity,
} from "../cartApi";

export const useCartQuery = () => {
  return useQuery<ApiResponse<{cart: Cart[]}>, Error>({
    queryKey: ['cart'], // ✅ Fixed query key (previously 'carts')
    queryFn: getCart,
  });
};

// Add to cart mutation

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{cart: Cart[]}>,
    Error,
    {productId: string; quantity: number}
  >({
    mutationFn: ({productId, quantity}) => addToCart({productId, quantity}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['cart']}); // ✅ Refresh cart instantly
    },
  });
};

// ✅ Update Cart Quantity Mutation
export const useUpdateCartQuantityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<{ cart: Cart[] }>,
    Error,
    { cartItemId: string; quantity: number }
  >({
    mutationFn: ({ cartItemId, quantity }) =>
      updateCartQuantity(cartItemId, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // ✅ Refresh cart instantly
    },
  });
};

// Delete from cart mutation
export const useDeleteFromCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{ cart: Cart[] }>, Error, string>({
    mutationFn: (cartItemId) => deleteFromCart(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
