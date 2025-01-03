import { ApiResponse } from "@/api/cart/cartApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  fetchAllOrders,
  fetchOrderById,
  Order,
} from "../ordersApi";

// Fetch all orders
export const useOrdersQuery = () => {
  return useQuery<ApiResponse<{ orders: Order[] }>, Error>({
    queryKey: ["orders"],
    queryFn: () => fetchAllOrders(),
  });
};

// fetch order by id
export const useOrderIdQuery = (orderId: string) => {
  return useQuery<ApiResponse<{ order: Order }>, Error>({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderById(orderId),
  });
};
