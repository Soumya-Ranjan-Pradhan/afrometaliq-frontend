import { Category } from "@/api/category/categoryApi";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/api/category/queries/useCategoryQuery";
import React, { useEffect, useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

type CategoryFormProps = {
  parentId: string | null;
  mode: "add" | "edit";
  data?: Category;
  handleCancelEdit?: () => void;
};

const CategoryForm = ({
  parentId,
  mode,
  data,
  handleCancelEdit,
}: CategoryFormProps) => {
  const [categoryName, setCategoryName] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null | string>(
    null
  );

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  // Handle create category
  const handleSubmit = () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    const formData = new FormData();

    formData.append("category_name", categoryName);

    if (parentId) {
      formData.append("parent", parentId);
    }

    if (uploadedImage && typeof uploadedImage !== "string") {
      formData.append("thumbnail", uploadedImage);
    }
    
    if (mode === "add") {
      createCategory.mutate(formData, {
        onSuccess: () => {
          setCategoryName("");
          // refetch();
          toast.success("Category created successfully!");
        },
        onError: () => {
          toast.error("Failed to create category");
        },
      });
    } else {
      if (!data?._id) return toast.error("Failed to update category");

      updateCategory.mutate(
        { id: data._id, data: formData },
        {
          onSuccess: () => {
            setCategoryName("");
            setUploadedImage(null);
            toast.success("Category updated successfully!");
          },
          onError: () => {
            toast.error("Failed to update category");
          },
        }
      );
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    console.log(file);
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  const handleCancelEditMode = () => {
    if (handleCancelEdit) {
      handleCancelEdit();
    }
  };

  useEffect(() => {
    if (mode === "edit" && data) {
      setCategoryName(data.category_name);

      if (data.thumbnail) {
        setUploadedImage(data.thumbnail.url);
      } else {
        setUploadedImage(null);
      }
    } else {
      setCategoryName("");
      setUploadedImage(null);
    }
  }, [mode, data]);

  return (
    <div className="bg-gray-50 flex items-center justify-center px-4 mt-5 md:px-10">
      <div className="bg-white w-full max-w-6xl rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Add Category
        </h1>

        <div className="flex flex-col md:flex-row gap-4 w-full ">
          {/* Upload Image */}
          <div className="flex  flex-col">
            {uploadedImage ? (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                {/*  eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    typeof uploadedImage === "string"
                      ? uploadedImage
                      : URL.createObjectURL(uploadedImage)
                  }
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600 transition">
                  <FaTrash size={14} onClick={handleRemoveImage} />
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
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Title Input */}
          <div className="w-full max-w-xs ">
            <label className="block  text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="category-name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter Category name"
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="flex gap-4 w-full justify-start items-start  mt-4">
              <button
                onClick={handleSubmit}
                className="w-full max-w-[10rem]  bg-blue-500  text-white text-lg font-medium py-1 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 "
                disabled={createCategory.isPending || updateCategory.isPending}
              >
                {createCategory.isPending || updateCategory.isPending
                  ? "Saving..."
                  : "Save"}
              </button>
              {mode === "edit" && (
                <button
                  onClick={handleCancelEditMode}
                  className="w-full mx-auto border border-blue-500 text-blue-500 text-lg font-medium py-1 rounded-lg transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
