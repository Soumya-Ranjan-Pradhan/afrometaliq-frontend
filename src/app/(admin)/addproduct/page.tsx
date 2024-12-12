"use client";

import React, { useState } from "react";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import CategoriesInput, { Option } from "./CategoryInput";
import { useCreateProduct } from "@/api/product/queries/useProductQuery";
import { toast } from "react-toastify";
import { useSearchUnits } from "@/api/units/queries/useUnitsQuery";

const initialState = {
  product_name: "",
  product_code: "",
  product_unit: "",
  product_price: "",
  product_discount: "",
  product_images: "",
  product_selling_price: "",
  product_description: "",
  product_size: "",
  product_theme_size: "",
  product_grade: "",
  product_thickness: "",
  product_uom: "",
  product_length: "",
  product_width: "",
};

const AddProduct = () => {
  const [images, setImages] = useState<File[]>([]);
  const [product, setProduct] = useState(initialState);
  const [unitSearch, setUnitSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [categories, setCategories] = useState<{
    selectedCategory: Option | null;
    selectedSubcategory: Option | null;
    selectedSubcategory2: Option | null;
  }>({
    selectedCategory: null,
    selectedSubcategory: null,
    selectedSubcategory2: null,
  });

  const { data: unitData } = useSearchUnits(unitSearch);
  const { mutate: createProduct } = useCreateProduct();

  // create product
  const handleCreate = () => {
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("product_code", product.product_code);
    formData.append("product_unit", selectedUnit || "");
    formData.append("product_price", product.product_price);
    formData.append("product_discount", product.product_discount);
    formData.append("product_selling_price", product.product_selling_price);
    formData.append("product_description", product.product_description);
    formData.append("product_size", product.product_size);
    formData.append("product_theme_size", product.product_theme_size);
    formData.append("product_grade", product.product_grade);
    formData.append("product_thickness", product.product_thickness);
    formData.append("product_uom", product.product_uom);
    formData.append("product_length", product.product_length);
    formData.append("product_width", product.product_width);

    // check if all category is selected
    if (
      !categories.selectedCategory ||
      !categories.selectedSubcategory ||
      !categories.selectedSubcategory2
    ) {
      toast.error("Please select all categories");
      return;
    }

    // append categories array
    formData.append(
      "product_categories",
      JSON.stringify([
        categories.selectedCategory.value,
        categories.selectedSubcategory.value,
        categories.selectedSubcategory2.value,
      ])
    );

    for (let i = 0; i < images.length; i++) {
      formData.append("product_images", images[i]);
    }

    createProduct(formData, {
      onSuccess: () => {
        setProduct(initialState);
        setImages([]);
        setSelectedUnit(null);
        toast.success("Product created successfully!");
      },
      onError: () => {
        toast.error("Failed to create product");
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleUnitSelect = (unitId: string) => {
    setSelectedUnit(unitId);
  };

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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Search Unit <span className="text-red-500">*</span>
                </label>
                <input
                  value={unitSearch}
                  onChange={(e) => setUnitSearch(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {unitData?.data?.units && unitData.data.units.length > 0 && (
                  <ul className="bg-white border rounded-md mt-2">
                    {unitData.data.units.map((unit) => (
                      <li
                        key={unit._id}
                        className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                          selectedUnit === unit._id ? "bg-blue-200" : ""
                        }`}
                        onClick={() => handleUnitSelect(unit._id)}
                      >
                        {unit.unit_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Selling Price{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.product_selling_price}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_selling_price: e.target.value,
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
                Add product
              </button>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition">
                Save product
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                Schedule
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
                <input
                  type="text"
                  name=""
                  id=""
                  value={product.product_size}
                  onChange={(e) =>
                    setProduct({ ...product, product_size: e.target.value })
                  }
                  placeholder="6m"
                  className="border rounded-md px-2 py-1 text-sm hover:bg-blue-100"
                />

                <input
                  type="text"
                  name=""
                  id=""
                  value={product.product_size}
                  onChange={(e) =>
                    setProduct({ ...product, product_size: e.target.value })
                  }
                  placeholder="9m"
                  className="border rounded-md px-2 py-1 text-sm hover:bg-blue-100"
                />

                <input
                  type="text"
                  name=""
                  id=""
                  value={product.product_size}
                  onChange={(e) =>
                    setProduct({ ...product, product_size: e.target.value })
                  }
                  placeholder="13m"
                  className="border rounded-md px-2 py-1 text-sm hover:bg-blue-100"
                />

                <input
                  type="text"
                  name=""
                  id=""
                  value={product.product_size}
                  onChange={(e) =>
                    setProduct({ ...product, product_size: e.target.value })
                  }
                  placeholder="NA"
                  className="border rounded-md px-2 py-1 text-sm hover:bg-blue-100"
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Size <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.product_theme_size}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_theme_size: e.target.value,
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
