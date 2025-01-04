"use client";

import { Order } from "@/api/orders/ordersApi";
import { useOrdersQuery } from "@/api/orders/queries/useOrdersQuery";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFileExport } from "react-icons/fa";
import { TbEyeSearch } from "react-icons/tb";

const ProductOrdersTable = () => {
  const { data, isLoading, isError, refetch } = useOrdersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // Convert the date string to a Date object
  const orders: Order[] = data?.data.orders || [];
  return (
    <div className="bg-gray-50  flex flex-col items-center justify-center px-4 md:px-10">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search here..."
            className="border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full md:w-1/3"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:backdrop-blur-md flex items-center space-x-2 transition mt-4 md:mt-0">
            <FaFileExport className="text-white" />
            <span>Export all order</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Product
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Product_Code
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  PhoneNumber
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Quantity
                </th>

                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Product_Selling_Price
                </th>

                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  totalAmount
                </th>

                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  View Details
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) =>
                order.products.map((product, productIndex) => (
                  <tr
                    key={`${index}-${productIndex}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="border px-4 py-2 text-gray-700 text-sm flex items-center space-x-4">
                      <Image
                        width={150}
                        height={150}
                        src={
                          product.product?.product_images?.[0]?.url ||
                          "https://via.placeholder.com/150"
                        }
                        alt={product.product?.product_name || "Product"}
                        className="w-10 h-10 rounded-md"
                      />
                      <span>{product.product?.product_name || "N/A"}</span>
                    </td>
                    <td className="border px-4 py-2 text-gray-700 text-sm">
                      {product.product?.product_code || "N/A"}
                    </td>
                    <td className="border px-4 py-2 text-gray-700 text-sm">
                      {order.user.phoneNumber}
                    </td>
                    <td className="border px-4 py-2 text-gray-700 text-sm">
                      {product.quantity}
                    </td>
                    <td className="border px-4 py-2 text-gray-700 text-sm">
                      ${product.product?.product_selling_price || 0}
                    </td>
                    <td className="border px-4 py-2 text-gray-700 text-sm">
                      ${order.totalAmount}
                    </td>
                    <td className="border px-4 py-2 text-gray-700 text-sm cursor-pointer">
                      <Link href={`/admin/orderlists/${order._id}`}>
                        <TbEyeSearch className="text-blue-500" size={25} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing 1-10 of 50 entries</p>
          <div className="flex gap-2">
            <button className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300">
              &lt; Prev
            </button>
            <button className="bg-blue-500 text-white py-1 px-3 rounded-md">
              1
            </button>
            <button className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300">
              2
            </button>
            <button className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300">
              3
            </button>
            <button className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300">
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrdersTable;
