"use client";

import React, { useEffect, useState } from "react";
import {
  useCategories,
  useCategoryById,
  useCreateCategory,
  useDeleteCategory,
  useSearchCategory,
  useUpdateCategory,
} from "@/api/category/queries/useCategoryQuery";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // get parent from serach url query
  const searchParams = useSearchParams();
  const parent: string | null = searchParams.get("parent")
    ? searchParams.get("parent")
    : null;

  // get parent details
  const { data: parentDetails } = useCategoryById(
    { id: parent as string },
    {
      enabled: !!parent,
    }
  );

  // React Query hooks
  const { data, isLoading, error, refetch } = useCategories({ parent });
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { data: searchData } = useSearchCategory(searchQuery);

  useEffect(() => {
    if (parent) {
      setParentId(parent);
    }
  }, [parent]);

  // Handle create category
  const handleCreate = () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }
    createCategory(
      { category_name: categoryName, parent: parentId },
      {
        onSuccess: () => {
          setCategoryName("");
          refetch();
          toast.success("Category created successfully!");
        },
        onError: () => {
          toast.error("Failed to create category");
        },
      }
    );
  };

  // Handle save update
  const handleSaveUpdate = () => {
    if (!editingId || !updatedName.trim()) {
      toast.error("Category name is required");
      return;
    }
    updateCategory(
      { id: editingId, data: { category_name: updatedName } },
      {
        onSuccess: () => {
          setEditingId(null);
          setUpdatedName("");
          refetch();
          toast.success("Category updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update category");
        },
      }
    );
  };

  // Handle delete category
  const confirmDelete = () => {
    if (!deleteId) return;
    deleteCategory(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        refetch();
        toast.success("Category deleted successfully!");
      },
      onError: () => {
        toast.error("Failed to delete category");
      },
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const categories = searchQuery
    ? searchData?.data.categories
    : data?.data.categories;

  return (
    <>
      {/* Toast Container */}
      <div>
        {/* show parent Category name */}
        {parentDetails?.data.category.category_name && (
          <div className="bg-gray-50 flex items-center justify-center px-4 md:px-10">
            <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                <p>Category - {parentDetails?.data.category.ancestors}</p>
                <p>
                  Sub Category: {parentDetails?.data.category.category_name}
                </p>
              </h1>
            </div>
          </div>
        )}
      </div>

      {/* Add Category */}
      <div className="bg-gray-50 flex items-center justify-center px-4 mt-5 md:px-10">
        <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Add Category
          </h1>
          <div className="mb-4">
            <label
              htmlFor="category-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="category-name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter Category name"
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            onClick={handleCreate}
            className="w-full bg-blue-500 text-white text-lg font-medium py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      </div>

      {/* Table Units */}
      <div className="bg-gray-50 mt-8 flex flex-col items-center justify-center px-4 md:px-10">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
          {/* Search */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={handleSearch}
              className="border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Table */}
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error fetching categories</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Category Name
                    </th>

                    <th className="border px-4 py-2 text-center text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2 text-gray-700">
                        {editingId === category._id ? (
                          <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            className="border rounded-lg px-2 py-1 w-full focus:outline-none"
                          />
                        ) : (
                          <>
                            {category.category_name} + " " {category._id}
                          </>
                        )}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div className="flex items-center justify-center space-x-4">
                          {editingId === category._id ? (
                            <button
                              onClick={handleSaveUpdate}
                              className="text-blue-500"
                            >
                              Save
                            </button>
                          ) : (
                            <FaEdit
                              onClick={() => {
                                setEditingId(category._id);
                                setUpdatedName(category.category_name);
                              }}
                              className="text-green-500 cursor-pointer hover:scale-110 transition"
                            />
                          )}
                          <FaTrash
                            onClick={() => setDeleteId(category._id)}
                            className="text-red-500 cursor-pointer hover:scale-110 transition"
                          />
                          <Link
                            href={`/categories?parent=${category._id}`}
                            className="text-blue-500 cursor-pointer hover:scale-110 transition"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteId && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded shadow-lg">
                <p>Are you sure you want to delete this category?</p>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleteId(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

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

      <div className="bg-white rounded-lg shadow-md mt-10  p-4 w-64">
        <h1 className="text-center my-2">Category</h1>
        <input
          type="text"
          placeholder="search category"
          className=" border rounded-sm my-2 px-6 py-1 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none "
        />
        <div className=" flex items-center justify-between">
          <p>category name</p>
          <div className="flex items-center gap-2">
            <FaEdit
              size={15}
              className="text-green-500 cursor-pointer hover:scale-110 transition"
            />

            <FaTrash
              size={15}
              className="text-red-500 cursor-pointer hover:scale-110 transition"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
