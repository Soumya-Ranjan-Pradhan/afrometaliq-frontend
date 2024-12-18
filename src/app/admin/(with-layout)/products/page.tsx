import Link from "next/link";
import React from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

const AllProducts = () => {
  const products = [
    {
      product: "Dog Food, Chicken & Liver Recipe",
      productId: "#7712309",
      productCode: "133",
      productUnit: "Kg",
      productCategory: "Dog",
      productSubCategory: "Dog Food",
      price: "$1,452.500",
      dis: "1,638",
      salePrice: "20",
      stock: "Out of stock",
      startDate: "$28,672.36",
      image: "https://via.placeholder.com/50",
      productDes:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia nemo vitae dolorem voluptate. Accusamus, fugiat enim! Sunt reprehenderit necessitatibus consequuntur.",
      size1: "6m",
      size2: "9m",
      size3: "13m",
      size4: "NA",
      productSize: "6m",
      productGrade: "A",
      productThickness: "0.5mm",
      productUOm: "Kg",
      productLength: "6m",
      productWidth: "9m",
    },

    {
      product: "Dog Food, Chicken & Liver Recipe",
      productId: "#7712309",
      productCode: "133",
      productUnit: "Kg",
      productCategory: "Dog",
      productSubCategory: "Dog Food",
      price: "$1,452.500",
      dis: "1,638",
      salePrice: "20",
      stock: "Out of stock",
      startDate: "$28,672.36",
      image: "https://via.placeholder.com/50",
      productDes:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia nemo vitae dolorem voluptate. Accusamus, fugiat enim! Sunt reprehenderit necessitatibus consequuntur.",
      size1: "6m",
      size2: "9m",
      size3: "13m",
      size4: "NA",
      productSize: "6m",
      productGrade: "A",
      productThickness: "0.5mm",
      productUOm: "Kg",
      productLength: "6m",
      productWidth: "9m",
    },
  ];

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-5">
      <div className=" bg-gray-100 shadow-md rounded-lg overflow-hidden w-full max-w-6xl">
        <h1 className="text-xl p-4 mt-4 font-semibold">Product Inventory</h1>
        {/* Header */}
        <div className="p-4  bg-gray-100 border-b lg:flex  md:flex items-center justify-between">
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
          <Link
            href={"/products/add"}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            + Add New
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto ">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4">Image</th>
                <th className="p-4">Product</th>
                <th className="p-4 whitespace-nowrap">Product ID</th>
                {/* <th className="p-4 whitespace-nowrap">Code</th> */}
                <th className="p-4">Unit</th>
                <th className="p-4">Category</th>
                <th className="p-4 whitespace-nowrap">Sub-Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Discount</th>
                <th className="p-4 whitespace-nowrap">Sale Price</th>
                <th className="p-4 whitespace-nowrap">size 1</th>
                <th className="p-4 whitespace-nowrap">size 2</th>
                <th className="p-4 whitespace-nowrap">size 3</th>
                <th className="p-4 whitespace-nowrap">size 4</th>
                <th className="p-4 whitespace-nowrap">Product Size</th>
                <th className="p-4 whitespace-nowrap">Product Grade</th>
                <th className="p-4 whitespace-nowrap">Product Thickness</th>
                <th className="p-4 whitespace-nowrap">Product UOm</th>
                <th className="p-4 whitespace-nowrap">Product Length</th>
                <th className="p-4 whitespace-nowrap">Product Width</th>
                <th className="p-4 whitespace-nowrap">Stock</th>
                <th className="p-4 whitespace-nowrap">Start Date</th>
                {/* <th className="p-4 whitespace-nowrap">Description</th> */}
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.product}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 truncate">{product.product}</td>
                  <td className="p-4 whitespace-nowrap">{product.productId}</td>
                  <td className="p-4 whitespace-nowrap">
                    {product.productUnit}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {product.productCategory}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {product.productSubCategory}
                  </td>
                  <td className="p-4 whitespace-nowrap">{product.price}</td>
                  <td className="p-4 whitespace-nowrap">{product.dis}</td>
                  <td className="p-4 whitespace-nowrap">{product.salePrice}</td>
                  <td className="p-4 whitespace-nowrap">{product.size1}</td>
                  <td className="p-4 whitespace-nowrap">{product.size2}</td>
                  <td className="p-4 whitespace-nowrap">{product.size3}</td>
                  <td className="p-4 whitespace-nowrap">{product.size4}</td>
                  <td className="p-4 whitespace-nowrap">
                    {product.productSize}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {product.productGrade}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {product.productThickness}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {product.productUOm}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {product.productLength}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {product.productWidth}
                  </td>
                  <td
                    className={`p-4 font-medium whitespace-nowrap ${
                      product.stock === "Out of stock"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {product.stock}
                  </td>
                  <td className="p-4 whitespace-nowrap">{product.startDate}</td>
                  {/* <td className="p-4 whitespace-nowrap">{product.productDes}</td> */}
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

export default AllProducts;
