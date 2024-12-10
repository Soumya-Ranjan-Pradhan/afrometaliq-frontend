import React from "react";
import { FaFileExport } from "react-icons/fa";

const ProductOrdersTable: React.FC = () => {
  const products = [
    {
      image:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      name: "Kristin Watson",
      orderId: "#7712309",
      price: "$1,452.500",
      quantity: "1,638",
      payment: "20",
      contactNumber: "1234567890",
    },
    {
      image:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      name: "Kristin Watson",
      orderId: "#7712309",
      price: "$1,452.500",
      quantity: "1,638",
      payment: "20",
      contactNumber: "1234567890",
    },
    {
      image:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      name: "Kristin Watson",
      orderId: "#7712309",
      price: "$1,452.500",
      quantity: "1,638",
      payment: "20",
      contactNumber: "1234567890",
    },
  ];

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
                  Order ID
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Contact
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Quantity
                </th>

                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Price
                </th>

                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-gray-700 text-sm flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-md"
                    />
                    <span>{product.name}</span>
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    {product.orderId}
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    {product.contactNumber}
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    {product.quantity}
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    {product.price}
                  </td>
                  <td className="border px-4 py-2 text-gray-700 text-sm">
                    ${product.payment}
                  </td>
                </tr>
              ))}
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
