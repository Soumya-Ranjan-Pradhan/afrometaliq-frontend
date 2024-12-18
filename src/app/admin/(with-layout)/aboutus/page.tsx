"use client";

import React, { useState } from "react";
import {
  useAbout,
  useDeleteAbout,
  useGetAbout,
  useUpdateAbout,
} from "@/api/about/query/useAboutQuery";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

const AdminFaqPage: React.FC = () => {
  const [about, setAbout] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useGetAbout();
  const { mutate: createAbout } = useAbout();
  const { mutate: updateAbout } = useUpdateAbout();
  const { mutate: deleteAbout } = useDeleteAbout();

  const handleCreate = () => {
    if (!about.trim() || !description.trim()) {
      toast.error("Both title and description are required");
      return;
    }
    createAbout(
      { about_title: about, about_description: description },
      {
        onSuccess: () => {
          setAbout("");
          setDescription("");
          refetch();
          toast.success("About created successfully!");
        },
        onError: () => {
          toast.error("Failed to create about");
        },
      }
    );
  };

  const handleSaveUpdate = () => {
    if (!editingId || !about.trim() || !description.trim()) {
      toast.error("Both title and description are required");
      return;
    }
    updateAbout(
      {
        id: editingId,
        data: { about_title: about, about_description: description },
      },
      {
        onSuccess: () => {
          setEditingId(null);
          setAbout("");
          setDescription("");
          refetch();
          toast.success("About updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update about");
        },
      }
    );
  };

  const handleEdit = (id: string, title: string, desc: string) => {
    setEditingId(id);
    setAbout(title);
    setDescription(desc);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteAbout(deleteId, {
      onSuccess: () => {
        setShowModal(false);
        setDeleteId(null);
        refetch();
        toast.success("About deleted successfully!");
      },
      onError: () => {
        toast.error("Failed to delete about");
      },
    });
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">
        MANAGE{" "}
        <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
          AboutUs
        </span>
      </h2>

      {/* Form Section */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter the title"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter the description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            ></textarea>
          </div>
        </div>
        <button
          onClick={editingId ? handleSaveUpdate : handleCreate}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          {editingId ? "Save Changes" : "Add AboutUs"}
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                #
              </th>
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                Title
              </th>
              <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                Description
              </th>
              <th className="border px-4 py-2 text-center text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.about.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-gray-700 text-sm">
                  {index + 1}
                </td>
                <td className="border px-4 py-2 text-gray-700 text-sm">
                  {item.about_title}
                </td>
                <td className="border px-4 py-2 text-gray-700 text-sm">
                  {item.about_description}
                </td>
                <td className="border px-4 py-2 text-center text-sm">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(item._id, item.about_title, item.about_description)}
                      className="text-yellow-500 hover:scale-110 transition"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => openDeleteModal(item._id)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this item?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFaqPage;
