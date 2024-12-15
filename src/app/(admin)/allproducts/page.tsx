import React from "react";
import { useProducts } from "@/api/product/queries/useProductQuery";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

const AllProducts = () => {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  const products = data?.data.products || [];

  return (
    <div className="bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-6xl">
        <h1 className="text-xl p-4 mt-4 font-semibold">Product Inventory</h1>

        {/* Search and Add */}
        <div className="p-4 bg-gray-100 border-b flex items-center justify-between">
          <div className="mt-4 flex gap-4">
            <input
              type="text"
              placeholder="Search by Product Name"
              className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Search by Product ID"
              className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            + Add New
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4">Image</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Product Code</th>
                <th className="p-4">Categories</th>
                <th className="p-4">Unit</th>
                <th className="p-4">Price</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Selling Price</th>
                <th className="p-4">Description</th>
                <th className="p-4">Size</th>
                <th className="p-4">Thickness</th>
                <th className="p-4">Length</th>
                <th className="p-4">Width</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <img
                      src={product.product_images[0]?.url}
                      alt={product.product_name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 truncate">{product.product_name}</td>
                  <td className="p-4">{product.product_code}</td>
                  <td className="p-4">
                    {product.category
                      .map((cat: any) => cat.category_name)
                      .join(", ")}
                  </td>
                  <td className="p-4">
                    {product.product_unit?.unit_name || "N/A"}
                  </td>
                  <td className="p-4">{product.product_price}</td>
                  <td className="p-4">{product.product_discount}%</td>
                  <td className="p-4">{product.product_selling_price}</td>
                  <td className="p-4">{product.product_description}</td>
                  <td className="p-4">{product.product_size}</td>
                  <td className="p-4">{product.product_thickness}</td>
                  <td className="p-4">{product.product_length}</td>
                  <td className="p-4">{product.product_width}</td>
                  <td className="p-4 flex justify-center gap-3">
                    <button className="text-blue-500">
                      <FaEye />
                    </button>
                    <button className="text-green-500">
                      <FaEdit />
                    </button>
                    <button className="text-red-500">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {products.length} entries
          </p>
          <div className="flex gap-2">
            <button className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300">
              &lt; Prev
            </button>
            <button className="bg-blue-500 text-white py-1 px-3 rounded-md">
              1
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

export default AllProducts;
