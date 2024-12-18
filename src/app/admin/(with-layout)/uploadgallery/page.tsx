"use client";

import {
  useCreateGallery,
  useDeleteGallery,
  useGalleries,
  useUpdateGallery,
} from "@/api/gallery/queries/useGalleryQuery";
import { Modal } from "@/Components/AdminComponents/ConformModal";
import React, { useState } from "react";
import { FaTrash, FaUpload, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";



const AdminGallery: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editGalleryId, setEditGalleryId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // React Query hooks
  const { data, isLoading, error, refetch } = useGalleries();
  const { mutate: createGallery } = useCreateGallery();
  const { mutate: updateGallery } = useUpdateGallery();
  const { mutate: deleteGallery } = useDeleteGallery();

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadedImage(file);
    }
  };

  // Handle create gallery
  const handleCreate = () => {
    if (!title.trim() || !description.trim() || !uploadedImage) {
      toast.error("Title, description, and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", uploadedImage);

    createGallery(formData, {
      onSuccess: () => {
        setTitle("");
        setDescription("");
        setUploadedImage(null);
        refetch();
        toast.success("Gallery created successfully!");
      },
      onError: () => {
        toast.error("Failed to create gallery");
      },
    });
  };

  // Handle update gallery
  const handleUpdate = () => {
    if (!editGalleryId || !title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (uploadedImage) {
      formData.append("image", uploadedImage);
    }

    updateGallery(
      { id: editGalleryId, data: { title, description } },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setUploadedImage(null);
          setEditGalleryId(null);
          setIsEditing(false);
          refetch();
          toast.success("Gallery updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update gallery");
        },
      }
    );
  };

  const handleDelete = () => {
    if (!deleteId) return;

    deleteGallery(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        setShowModal(false);
        refetch();
        toast.success("Gallery deleted successfully!");
      },
      onError: () => {
        toast.error("Failed to delete gallery");
      },
    });
  };

  const handleImageDelete = () => {
    setUploadedImage(null);
    setTitle("");
    setDescription("");
  };

  const handleEditClick = (gallery: {
    _id: string;
    title: string;
    description: string;
    image: string;
  }) => {
    setEditGalleryId(gallery._id);
    setTitle(gallery.title);
    setDescription(gallery.description);
    setUploadedImage(null); 
    setIsEditing(true);
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center px-4 md:px-10">
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />

      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Gallery Management</h2>
        </div>

        {/* Upload Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? "Edit Gallery" : "Upload Image"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Upload Image */}
            <div className="flex flex-col">
              {uploadedImage ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleImageDelete}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600 transition"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="w-32 h-32 flex items-center justify-center rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition"
                >
                  <FaUpload className="text-gray-500" size={24} />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button
            onClick={isEditing ? handleUpdate : handleCreate}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {isEditing ? "Update Gallery" : "Create Gallery"}
          </button>
        </div>

        {/* Gallery Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  No
                </th>
                <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Image
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
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                data?.data.gallery.map((gallery, index) => (
                  <tr key={gallery._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 text-gray-700 text-sm">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 text-gray-700 text-sm">
                      <img
                        src={gallery.image}
                        alt={gallery.title}
                        className="w-20 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="border px-4 py-2 text-gray-700 text-sm">
                      {gallery.title}
                    </td>
                    <td className="border px-4 py-2 text-gray-700 text-sm">
                      {gallery.description}
                    </td>
                    <td className="border px-4 py-2 text-center text-sm">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEditClick(gallery)}
                          className="text-yellow-500 hover:scale-110 transition"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(gallery._id);
                            setShowModal(true);
                          }}
                          className="text-red-500 hover:scale-110 transition"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
