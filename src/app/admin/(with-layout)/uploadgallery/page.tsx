"use client";

import React, { useState } from "react";
import {
  useCreateGallery,
  useDeleteGallery,
  useGalleries,
  useUpdateGallery,
} from "@/api/gallery/queries/useGalleryQuery";
import { toast } from "react-toastify";
import { FaTrash, FaUpload, FaEdit } from "react-icons/fa";

// shadcn/ui imports
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Skeleton } from "@/Components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

const AdminGallery: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editGalleryId, setEditGalleryId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // React Query hooks
  const { data, isLoading, refetch } = useGalleries();
  const { mutate: createGallery, isPending: isCreating } = useCreateGallery();
  const { mutate: updateGallery, isPending: isUpdating } = useUpdateGallery();
  const { mutate: deleteGallery, isPending: isDeleting } = useDeleteGallery();

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedImage(event.target.files[0]);
    }
  };

  // Create gallery
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
        resetForm();
        refetch();
        toast.success("Gallery created successfully!");
      },
      onError: () => toast.error("Failed to create gallery"),
    });
  };

  // Update gallery
  const handleUpdate = () => {
    if (!editGalleryId || !title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    updateGallery(
      { id: editGalleryId, data: { title, description } },
      {
        onSuccess: () => {
          resetForm();
          refetch();
          toast.success("Gallery updated successfully!");
        },
        onError: () => toast.error("Failed to update gallery"),
      }
    );
  };

  // Delete gallery
  const handleDelete = () => {
    if (!deleteId) return;
    deleteGallery(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        setShowDeleteModal(false);
        refetch();
        toast.success("Gallery deleted successfully!");
      },
      onError: () => toast.error("Failed to delete gallery"),
    });
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

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUploadedImage(null);
    setIsEditing(false);
    setEditGalleryId(null);
  };

  return (
    <div className="bg-gray-50 flex flex-col mt-12 justify-center px-4 md:px-10">
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this gallery?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <h2 className="text-xl font-bold mb-6">Gallery Management</h2>

        {/* Upload Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? "Edit Gallery" : "Upload Image"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Upload Image */}
            <div className="flex flex-col">
              {uploadedImage ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => setUploadedImage(null)}
                  >
                    <FaTrash size={14} />
                  </Button>
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

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <Button
            className="mt-4"
            onClick={isEditing ? handleUpdate : handleCreate}
            disabled={isCreating || isUpdating}
          >
            {isEditing
              ? isUpdating
                ? "Updating..."
                : "Update Gallery"
              : isCreating
              ? "Creating..."
              : "Create Gallery"}
          </Button>
        </div>

        {/* Gallery Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? [...Array(5)].map((_, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Skeleton className="h-4 w-6" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-12 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-16" />
                      </TableCell>
                    </TableRow>
                  ))
                : data?.data.gallery.map(
                    (
                      gallery: {
                        _id: string;
                        title: string;
                        description: string;
                        image: string;
                      },
                      index: number
                    ) => (
                      <TableRow key={gallery._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <img
                            src={gallery.image}
                            alt={gallery.title}
                            className="w-20 h-12 object-cover rounded-md"
                          />
                        </TableCell>
                        <TableCell>{gallery.title}</TableCell>
                        <TableCell>{gallery.description}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-yellow-500"
                              onClick={() => handleEditClick(gallery)}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                              onClick={() => {
                                setDeleteId(gallery._id);
                                setShowDeleteModal(true);
                              }}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
