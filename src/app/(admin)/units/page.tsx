"use client";
import {
  useCreateUnits,
  useDeleteUnits,
  useSearchUnits,
  useUnits,
  useUpdateUnits,
} from "@/api/units/queries/useUnitsQuery";
import React, { use, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Units = () => {
  const [units, setUnits] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // React Query hooks
  const { data, isLoading, error, refetch } = useUnits();
  const { mutate: createUnits } = useCreateUnits();
  const { mutate: updateUnits } = useUpdateUnits();
  const { mutate: deleteUnits } = useDeleteUnits();
  const { data: searchData } = useSearchUnits(searchQuery);

  // Handle create category
  const handleCreate = () => {
    if (!units.trim()) {
      toast.error("Units name is required");
      return;
    }
    createUnits(
      { unit_name: units },
      {
        onSuccess: () => {
          setUnits("");
          refetch();
          toast.success("Units created successfully!");
        },
        onError: () => {
          toast.error("Failed to create Units");
        },
      }
    );
  };

  // Handle save update
  const handleSaveUpdate = () => {
    if (!editingId || !updatedName.trim()) {
      toast.error("Units name is required");
      return;
    }
    updateUnits(
      { id: editingId, data: { unit_name: updatedName } },
      {
        onSuccess: () => {
          setEditingId(null);
          setUpdatedName("");
          refetch();
          toast.success("Units updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update Units");
        },
      }
    );
  };

  // Handle delete category
  const confirmDelete = () => {
    if (!deleteId) return;
    deleteUnits(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        refetch();
        toast.success("Units deleted successfully!");
      },
      onError: () => {
        toast.error("Failed to delete units");
      },
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const categories = searchQuery ? searchData?.data.units : data?.data.units;

  return (
    <>
      {/* Toast Container */}
      <div className="bg-gray-50 flex items-center justify-center px-4 mt-5 md:px-10">
        <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Add Units
          </h1>

          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="product-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Units Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="units-name"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              placeholder="Enter units name"
              className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Save Button */}
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
          {/* Search and Dropdown */}
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Showing</span>
              <select className="border rounded-lg px-2 py-1 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={handleSearch}
                className="border rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
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
                      Units Name
                    </th>

                    <th className="border px-4 py-2 text-center text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((units) => (
                    <tr key={units._id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2 text-gray-700">
                        {editingId === units._id ? (
                          <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            className="border rounded-lg px-2 py-1 w-full focus:outline-none"
                          />
                        ) : (
                          <>{units.unit_name}</>
                        )}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div className="flex items-center justify-center space-x-4">
                          {editingId === units._id ? (
                            <button
                              onClick={handleSaveUpdate}
                              className="text-blue-500"
                            >
                              Save
                            </button>
                          ) : (
                            <FaEdit
                              onClick={() => {
                                setEditingId(units._id);
                                setUpdatedName(units.unit_name);
                              }}
                              className="text-green-500 cursor-pointer hover:scale-110 transition"
                            />
                          )}
                          <FaTrash
                            onClick={() => setDeleteId(units._id)}
                            className="text-red-500 cursor-pointer hover:scale-110 transition"
                          />
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
                <p>Are you sure you want to delete this units?</p>
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
    </>
  );
};

export default Units;
