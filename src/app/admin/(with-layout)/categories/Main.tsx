"use client";

import React, { useEffect, useState } from "react";
import {
  useCategories,
  useCategoryById,
  useDeleteCategory,
  useSearchCategory,
} from "@/api/category/queries/useCategoryQuery";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CategoryForm from "./CategoryForm";
import { Category } from "@/api/category/categoryApi";
import { AiOutlineLoading } from "react-icons/ai";

const AddCategory = () => {
  const [parentId, setParentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);

  const [editableData, setEditableData] = useState<Category | null>(null);

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
  const { mutate: deleteCategory } = useDeleteCategory();
  const { data: searchData } = useSearchCategory(searchQuery);

  useEffect(() => {
    if (parent) {
      setParentId(parent);
    }
  }, [parent]);

  // Handle delete category
  const confirmDelete = () => {
    setIsLoading(true);
    if (!deleteId) {
      setIsLoading(false);
      return;
    }

    deleteCategory(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        refetch();
        toast.success("Category deleted successfully!");
      },
      onError: () => {
        setIsLoading(false);
        toast.error("Failed to delete category");
      },
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (data: Category) => {
    setEditableData(data);
  };

  const handleCancelEdit = () => {
    setEditableData(null);
  };

  const handleDeleteId = (id: string) => {
    setDeleteId(id);
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
          <div className="bg-gray-50 flex items-center justify-center px-4 ">
            <div className="bg-white w-full max-w-6xl rounded-lg shadow-lg p-8">
              <h1 className="text-2xl font-semibold text-gray-800">
                <p>
                  Parent Category: {parentDetails?.data.category.category_name}
                </p>
              </h1>
            </div>
          </div>
        )}
      </div>

      {/* Add Category */}
      {editableData ? (
        <CategoryForm
          mode="edit"
          parentId={parentId}
          data={editableData}
          handleCancelEdit={handleCancelEdit}
        />
      ) : (
        <CategoryForm mode="add" parentId={parentId} />
      )}

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
                    <Row
                      key={category._id}
                      category={category}
                      handleEdit={handleEdit}
                      handleDeleteId={handleDeleteId}
                    />
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
                  {isLoading ? (
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                      <AiOutlineLoading className="animate-spin" />
                    </button>
                  ) : (
                    <button
                      onClick={confirmDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}

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
    </>
  );
};

export default AddCategory;

const Row = ({
  category,
  handleEdit,
  handleDeleteId,
}: {
  category: Category;
  handleEdit: (data: Category) => void;
  handleDeleteId: (id: string) => void;
}) => {
  const handleEditClick = () => {
    handleEdit(category);
  };

  const handleDeleteClick = () => {
    handleDeleteId(category._id);
  };

  return (
    <tr key={category._id} className="hover:bg-gray-50">
      <td className="border px-4 py-2 text-gray-700">
        <>{category.category_name}</>
      </td>
      <td className="border px-4 py-2 text-center">
        <div className="flex items-center justify-center space-x-4">
          <FaEdit
            onClick={handleEditClick}
            className="text-green-500 cursor-pointer hover:scale-110 transition"
          />

          <FaTrash
            onClick={handleDeleteClick}
            className="text-red-500 cursor-pointer hover:scale-110 transition"
          />
          <Link
            href={`/admin/categories?parent=${category._id}`}
            className="text-blue-500 cursor-pointer hover:scale-110 transition"
          >
            View
          </Link>
        </div>
      </td>
    </tr>
  );
};
