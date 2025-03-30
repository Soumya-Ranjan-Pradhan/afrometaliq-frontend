"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useAllProducts,
  useDeleteProduct,
  useUpdateProduct,
  useSearchProducts,
} from "@/api/product/queries/useProductQuery";

const AllProducts: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 10;

  const { data, isLoading, error } = useAllProducts({
    page: pageNumber,
    limit,
  });
  const { data: searchResults } = useSearchProducts(searchQuery);

  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleNextPage = () => {
    if (
      data?.data?.pagination?.totalPages &&
      pageNumber < data.data.pagination.totalPages
    ) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const handleDelete = (product: any) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteProduct(selectedProduct._id);
    setDeleteModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  const displayedProducts =
    searchQuery && searchResults?.data?.products?.length
      ? searchResults.data.products
      : data?.data.products || [];

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center p-5">
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-6xl">
          <h1 className="text-xl p-4 mt-4 font-semibold">Product Inventory</h1>

          {/* Search and Add */}
          <div className="p-4 bg-gray-100 border-b flex items-center justify-between">
            <div className="mt-4 flex gap-4">
              <input
                type="text"
                placeholder="Search by Product Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" px-7 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* You can add search by ID here as well if needed */}
            </div>
            <Link
              href={"products/add"}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              + Add New
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-4 text-sm">Image</th>
                  <th className="p-4 text-sm">Product Name</th>
                  <th className="p-4 text-sm">Product Code</th>
                  <th className="p-4 text-sm">Unit</th>
                  <th className="p-4 text-sm">Price</th>
                  <th className="p-4 text-sm">Discount</th>
                  <th className="p-4 text-sm">Selling Price</th>
                  <th className="p-4 text-sm text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {displayedProducts.map((product: any) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      <img
                        src={
                          product.product_images?.[0]?.url || "/placeholder.png"
                        }
                        alt={product.product_name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-4 truncate">{product.product_name}</td>
                    <td className="p-4">{product.product_code}</td>
                    <td className="p-4">
                      {product.product_unit?.unit_name || "N/A"}
                    </td>
                    <td className="p-4">{product.product_price}</td>
                    <td className="p-4">{product.product_discount}%</td>
                    <td className="p-4">{product.product_selling_price}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="text-yellow-500 hover:scale-110 transition"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          className="text-red-500 hover:scale-110 transition"
                          onClick={() => handleDelete(product)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (hide if searchQuery is active) */}
          {!searchQuery && (
            <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
              <p className="text-sm text-gray-600">entries</p>
              <div className="flex gap-2">
                <button
                  className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handlePrevPage}
                  disabled={pageNumber === 1}
                >
                  &lt; Prev
                </button>
                <button
                  className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleNextPage}
                  disabled={
                    !data?.data?.pagination?.totalPages ||
                    pageNumber >= data.data.pagination.totalPages
                  }
                >
                  Next &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 py-2 px-4 rounded-md"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;

// "use client";

// import React, { useState } from "react";
// import {
//   useAllProducts,
//   useDeleteProduct,
//   useProducts,
//   useUpdateProduct,
// } from "@/api/product/queries/useProductQuery";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import Link from "next/link";

// const AllProducts: React.FC = () => {
//   const [pageNumber, setPageNumber] = useState<number>(1);
//   const limit = 10;
//   const { data, isLoading, error } = useAllProducts({
//     page: pageNumber,
//     limit: 10,
//   });
//   const { mutate: updateProduct } = useUpdateProduct();
//   const { mutate: deleteProduct } = useDeleteProduct();
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);

//   const handleNextPage = () => {
//     if (
//       data?.data?.pagination?.totalPages &&
//       pageNumber < data.data.pagination.totalPages
//     ) {
//       setPageNumber((prev) => prev + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (pageNumber > 1) {
//       setPageNumber((prev) => prev - 1);
//     }
//   };

//   // Handle Delete Confirmation
//   const handleDelete = (product: any) => {
//     setSelectedProduct(product);
//     setDeleteModalOpen(true);
//   };

//   const confirmDelete = () => {
//     deleteProduct(selectedProduct._id);
//     setDeleteModalOpen(false);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching products</div>;

//   return (
//     <>
//       <div className="bg-gray-100 flex items-center justify-center p-5">
//         <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-6xl">
//           <h1 className="text-xl p-4 mt-4 font-semibold">Product Inventory</h1>

//           {/* Search and Add */}
//           <div className="p-4 bg-gray-100 border-b flex items-center justify-between">
//             <div className="mt-4 flex gap-4">
//               <input
//                 type="text"
//                 placeholder="Search by Product Name"
//                 className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 placeholder="Search by Product ID"
//                 className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <Link
//               href={"products/add"}
//               className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//             >
//               + Add New
//             </Link>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full table-auto">
//               <thead>
//                 <tr className="bg-gray-100 border-b">
//                   <th className="p-4 text-sm">Image</th>
//                   <th className="p-4 text-sm whitespace-nowrap">ProductName</th>
//                   <th className="p-4 text-sm whitespace-nowrap">
//                     Product Code
//                   </th>
//                   {/* <th className="p-4 text-sm whitespace-nowrap">Categories</th> */}
//                   <th className="p-4 text-sm">Unit</th>
//                   <th className="p-4 text-sm">Price</th>
//                   <th className="p-4 text-sm">Discount</th>
//                   <th className="p-4 text-sm whitespace-nowrap">
//                     Selling Price
//                   </th>
//                   {/* <th className="p-4 text-sm">Description</th> */}
//                   {/* <th className="p-4 text-sm">Size</th>
//                   <th className="p-4 text-sm">Thickness</th> */}
//                   {/* <th className="p-4 text-sm">Length</th> */}
//                   {/* <th className="p-4 text-sm">Width</th> */}
//                   <th className="p-4 text-sm text-center">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {data?.data.products.map((product: any) => (
//                   <tr
//                     key={product._id}
//                     className="border-b hover:bg-gray-50 transition"
//                   >
//                     <td className="p-4">
//                       <img
//                         src={product.product_images[0]?.url}
//                         alt={product.product_name}
//                         className="w-12 h-12 object-cover rounded-md"
//                       />
//                     </td>
//                     <td className="p-4 truncate">{product.product_name}</td>
//                     <td className="p-4">{product.product_code}</td>
//                     {/* <td className="p-4">
//                       {product.category
//                         .map((cat: any) => cat.category_name)
//                         .join(", ")}
//                     </td> */}
//                     <td className="p-4">
//                       {product.product_unit?.unit_name || "N/A"}
//                     </td>
//                     <td className="p-4">{product.product_price}</td>
//                     <td className="p-4">{product.product_discount}%</td>
//                     <td className="p-4">{product.product_selling_price}</td>

//                     <td className="border px-4 py-2 text-center text-sm">
//                       <div className="flex justify-center space-x-2">
//                         <Link
//                           href={`/admin/products/${product._id}/edit`}
//                           className="text-yellow-500 hover:scale-110 transition"
//                         >
//                           <FaEdit />
//                         </Link>
//                         <button
//                           className="text-red-500 hover:scale-110 transition"
//                           onClick={() => handleDelete(product)}
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
//             <p className="text-sm text-gray-600">entries</p>
//             <div className="flex gap-2">
//               <button
//                 className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handlePrevPage}
//                 disabled={pageNumber === 1}
//               >
//                 &lt; Prev
//               </button>
//               <button
//                 className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleNextPage}
//                 disabled={
//                   !data?.data?.pagination?.totalPages ||
//                   pageNumber >= data.data.pagination.totalPages
//                 }
//               >
//                 Next &gt;
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-4">
//               Are you sure you want to delete this product?
//             </h2>
//             <div className="flex justify-end gap-4">
//               <button
//                 className="bg-gray-300 py-2 px-4 rounded-md"
//                 onClick={() => setDeleteModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-red-500 text-white py-2 px-4 rounded-md"
//                 onClick={confirmDelete}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AllProducts;
