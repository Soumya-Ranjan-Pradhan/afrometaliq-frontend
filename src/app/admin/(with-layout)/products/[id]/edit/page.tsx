"use client";

import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import CategoriesInput, { Option } from "../../add/CategoryInput";
import {
  useCreateProduct,
  useProductById,
  useUpdateProduct,
} from "@/api/product/queries/useProductQuery";
import { toast } from "react-toastify";
import UnitInput from "../../add/UnitInput";
import { useParams } from "next/navigation";

const initialState = {
  product_name: "",
  product_code: "",
  product_price: "",
  product_discount: "0",
  product_description: "",
  product_size: "",
  product_grade: "",
  product_thickness: "",
  product_uom: "",
  product_length: "",
  product_width: "",
};

const AddProduct = () => {
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<
    {
      public_id: string;
      url: string;
      _id: string;
    }[]
  >([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const [product, setProduct] = useState(initialState);
  const [selectedUnit, setSelectedUnit] = useState<Option | null>(null);
  const [sizes, setSizes] = useState<string[]>([""]);
  const [categories, setCategories] = useState<{
    selectedCategory: Option | null;
    selectedSubcategory: Option | null;
    selectedSubcategory2: Option | null;
  }>({
    selectedCategory: null,
    selectedSubcategory: null,
    selectedSubcategory2: null,
  });

  const productId = useParams().id as string;

  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const { data: productData, isLoading, refetch } = useProductById(productId);

  useEffect(() => {
    if (productData) {
      const product = productData.data.product;
      setProduct({
        product_name: product?.product_name,
        product_code: product?.product_code,
        product_price: product?.product_price as unknown as string,
        product_discount: product?.product_discount?.toString() || "0",
        product_description: product?.product_description,
        product_size: product?.product_size,
        product_grade: product?.product_grade,
        product_thickness: product?.product_thickness,
        product_uom: product?.product_uom,
        product_length: product?.product_length,
        product_width: product?.product_width,
      });

      if (product.product_unit._id) {
        setSelectedUnit({
          value: product.product_unit._id,
          label: product.product_unit.unit_name,
        });
      }

      setCategories({
        selectedCategory: product?.category?.[0]
          ? {
              value: product.category[0]._id,
              label: product.category[0].category_name,
            }
          : null,

        selectedSubcategory: product?.category?.[1]
          ? {
              value: product.category[1]._id,
              label: product.category[1].category_name,
            }
          : null,

        selectedSubcategory2: product?.category?.[2]
          ? {
              value: product.category[2]._id,
              label: product.category[2].category_name,
            }
          : null,
      });

      if (product.product_theme_size) {
        setSizes(product.product_theme_size);
      }

      if (product.product_images.length > 0) {
        setExistingImages(product.product_images);
        setImages([]);
      }
    }
  }, [productData]);

  // update product
  const handleCreate = () => {
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("product_code", product.product_code);
    formData.append("product_unit", selectedUnit?.value || "");
    formData.append("product_price", product.product_price);
    formData.append("product_discount", product.product_discount);
    formData.append("product_description", product.product_description);
    formData.append("product_size", product.product_size);
    formData.append("product_grade", product.product_grade);
    formData.append("product_thickness", product.product_thickness);
    formData.append("product_uom", product.product_uom);
    formData.append("product_length", product.product_length);
    formData.append("product_width", product.product_width);
    formData.append("product_theme_size", JSON.stringify(sizes));

    // check if all category is selected
    if (!categories.selectedCategory || !categories.selectedSubcategory) {
      toast.error("Please select all categories");
      return;
    }

    if (categories.selectedSubcategory2) {
      // append categories array
      formData.append(
        "product_categories",
        JSON.stringify([
          categories.selectedCategory.value,
          categories.selectedSubcategory.value,
          categories.selectedSubcategory2.value,
        ])
      );
    } else {
      // append categories array
      formData.append(
        "product_categories",
        JSON.stringify([
          categories.selectedCategory.value,
          categories.selectedSubcategory.value,
        ])
      );
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("product_images", images[i]);
    }

    // deleted images
    if (deletedImages.length > 0) {
      formData.append("deleted_images", JSON.stringify(deletedImages));
    }

    updateProduct(
      {
        id: productId,
        data: formData,
      },
      {
        onSuccess: () => {
          // setProduct(initialState);
          // setImages([]);
          // setSelectedUnit(null);
          refetch();
          toast.success("Product created successfully!");
        },
        onError: () => {
          toast.error("Failed to create product");
        },
      }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (index: number | string) => {
    // if exists in existing images, add to deleted images
    if (typeof index === "string") {
      setDeletedImages([...deletedImages, index]);
      // remove from existing images
      setExistingImages(existingImages.filter((image) => image._id !== index));
    } else {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const handleSizesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // get value, and index from id
    const { value, id } = e.target;

    // update state
    setSizes((prevSizes) => {
      const updatedSizes = [...prevSizes];
      updatedSizes[parseInt(id)] = value;
      return updatedSizes;
    });
  };

  const handleAddSize = () => {
    setSizes((prev) => [...prev, ""]);
  };

  const handleRemoveSize = (index: number) => {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: Add Product Form */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Product name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                value={product.product_name}
                onChange={(e) =>
                  setProduct({ ...product, product_name: e.target.value })
                }
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Do not exceed 20 characters when entering the product name.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Code <span className="text-red-500">*</span>
                </label>
                <input
                  value={product.product_code}
                  onChange={(e) =>
                    setProduct({ ...product, product_code: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <UnitInput value={selectedUnit} onChange={setSelectedUnit} />
            </div>
            <CategoriesInput
              categories={categories}
              setCategories={setCategories}
            />

            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.product_price}
                    type="number"
                    onChange={(e) =>
                      setProduct({ ...product, product_price: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Discount % <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.product_discount}
                    type="number"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_discount: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Description"
                value={product.product_description}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    product_description: e.target.value,
                  })
                }
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">
                Do not exceed 100 characters when entering the product name.
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {isPending ? "Updating..." : "Update product"}
              </button>
            </div>
          </div>

          {/* Right Section: Upload Images */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Upload images
              </label>
              <div className="mt-2 flex flex-wrap gap-4">
                {existingImages.map((image) => (
                  <div
                    key={image._id}
                    className="relative w-24 h-24 border rounded-md overflow-hidden"
                  >
                    <img
                      src={image.url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      onClick={() => handleRemoveImage(image._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border rounded-md overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
                <label
                  className="w-24 h-24 flex flex-col items-center justify-center border border-dashed rounded-md cursor-pointer hover:bg-gray-100"
                  htmlFor="image-upload"
                >
                  <FaUpload className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload</span>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                You need to add at least 4 images. Pay attention to the quality
                of the pictures.
              </p>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Add size
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {sizes.map((size, index) => (
                  <div className="relative group " key={index}>
                    <input
                      type="text"
                      value={size}
                      id={`${index}`}
                      onChange={handleSizesChange}
                      placeholder="6m"
                      className="border rounded-md px-2 py-1 text-sm "
                    />
                    <button
                      className="absolute hidden group-hover:block top-1 right-1 text-red-400 hover:text-red-600  p-1 rounded-full hover:bg-white "
                      onClick={() => handleRemoveSize(index)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddSize}
                  className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Add size
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Size <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.product_size}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_size: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Grade <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.product_grade}
                    onChange={(e) =>
                      setProduct({ ...product, product_grade: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Thickness <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.product_thickness}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_thickness: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product UOM <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.product_uom}
                    onChange={(e) =>
                      setProduct({ ...product, product_uom: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Length <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.product_length}
                    onChange={(e) =>
                      setProduct({ ...product, product_length: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Width <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.product_width}
                    onChange={(e) =>
                      setProduct({ ...product, product_width: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
