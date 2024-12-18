"use client";

import React, { useState } from "react";
import {
  useCreateBanner,
  useDeleteBanner,
  useGetAllBanner,
  useUpdateBanner,
} from "@/api/banner/queries/useBannerQuery";
import { FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

const BannerUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  // React Query hooks
  const { data, isLoading, error } = useGetAllBanner();
  const { mutate: createBanner } = useCreateBanner();
  const { mutate: updateBanner } = useUpdateBanner();
  const { mutate: deleteBanner } = useDeleteBanner();

  // Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadedImage(file);
    }
  };

  // Create Banner
  const handleCreate = () => {
    if (!uploadedImage) return toast.error("Please upload an image!");

    const form = new FormData();
    form.append("banner_images", uploadedImage);
    createBanner(form, {
      onSuccess: () => {
        toast.success("Banner created successfully!");
        setUploadedImage(null);
      },
      onError: () => toast.error("Failed to create banner."),
    });
  };

  // Edit Banner
  const handleEdit = (banner: any) => {
    setSelectedBanner(banner);
    setShowEditModal(true);
  };
  const handleUpdate = () => {
    if (!formData) return toast.error("Please upload a new image!");
    updateBanner(
      { id: selectedBanner._id, data: formData },
      {
        onSuccess: () => {
          toast.success("Banner updated successfully!");
          setShowEditModal(false);
        },
        onError: () => toast.error("Failed to update banner."),
      }
    );
  };

  const handleDelete = (banner: any) => {
    setSelectedBanner(banner);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteBanner(selectedBanner._id, {
      onSuccess: () => {
        toast.success("Banner deleted successfully!");
        setShowDeleteModal(false);
      },
      onError: () => toast.error("Failed to delete banner."),
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching banners</div>;

  return (
    <div className="bg-gray-50 flex flex-col justify-center px-4 md:px-10">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Banner Management</h2>
        </div>

        {/* Upload Section */}
        <div className="mb-6">
          <div className="flex gap-4">
            <label
              htmlFor="banner-upload"
              className="w-32 h-32 flex items-center justify-center rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition"
            >
              <FaUpload className="text-gray-500" size={24} />
              <input
                id="banner-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <button
            onClick={handleCreate}
            className="bg-blue-500 mt-2 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Upload Banner
          </button>
        </div>

        {/* Banner Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">No</th>
                <th className="border px-4 py-2 text-left">Image</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.banners.map((banner: any, index: number) => (
                <tr key={banner._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={banner.banner_images[0]?.url}
                      alt="Banner"
                      className="w-20 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        className="text-yellow-500 hover:scale-110 transition"
                        onClick={() => handleEdit(banner)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:scale-110 transition"
                        onClick={() => handleDelete(banner)}
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
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Banner</h2>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                const form = new FormData();
                form.append("banner_images", file!);
                setFormData(form);
              }}
              className="w-full p-2 mb-4 border rounded-md"
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 py-2 px-4 rounded-md"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to delete this banner?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 py-2 px-4 rounded-md"
                onClick={() => setShowDeleteModal(false)}
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
    </div>
  );
};

export default BannerUpload;
