"use client";

import React, { useState } from "react";
import { FaTrashAlt, FaUpload } from "react-icons/fa";

const AddProduct = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
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
                <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Search Unit <span className="text-red-500">*</span>
                </label>
                <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Search Category <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Search Subcategory <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Price <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Discount % <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                  <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product ID <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Description"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">
                Do not exceed 100 characters when entering the product name.
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
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
                  placeholder="6m"
                  className="border rounded-md px-2 py-1 text-sm hover:bg-blue-100"
                />

                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="9m"
                  className="border rounded-md px-2 py-1 text-sm hover:bg-blue-100"
                />

                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="13m"
                  className="border rounded-md px-2 py-1 text-sm hover:bg-blue-100"
                />

                <input
                  type="text"
                  name=""
                  id=""
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
                  <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Grade <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Thickness <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product UOM <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Length <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Width <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
