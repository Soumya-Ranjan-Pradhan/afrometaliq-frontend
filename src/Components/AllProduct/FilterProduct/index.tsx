"use client";

import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCategoriesByLevel } from "@/api/category/queries/useCategoryQuery";
import { IoCloseCircleOutline } from "react-icons/io5";

interface FilterProductProps {
  applyFilters: () => void;
  clearFilters: () => void;
  selectedFilter: string | null;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string | null>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterProduct: React.FC<FilterProductProps> = ({
  applyFilters,
  clearFilters,
  selectedFilter,
  setSelectedFilter,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [showCategory, setShowCategory] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch categories by level
  const { data, isLoading, error } = useCategoriesByLevel({ level: 1 });

  const categories = data?.data.categories || [];
  const topCategories = categories.slice(0, 4);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleApplyFilters = () => {
    applyFilters();
    closeModal();
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="p-4 bg-white border rounded-md hidden md:block lg:block">
      <h3 className="text-lg font-semibold mb-4">Filter by Type</h3>
      {/* Apply and Clear Buttons */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={applyFilters}
          className="w-full py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md"
        >
          Apply Filter
        </button>
        <button
          onClick={clearFilters}
          className="w-full py-2 bg-gray-400 text-white font-semibold rounded-md"
        >
          Clear Filter
        </button>
      </div>
      <div>
        {/* Discount Filter */}
        <div className="mt-2">
          <label className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              value="PromotionalProduct"
              checked={selectedFilter === "PromotionalProduct"}
              onChange={() => setSelectedFilter("PromotionalProduct")}
              className="form-radio"
            />
            <span>Promotional Products</span>
          </label>
          <label className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              value="BrowserProduct"
              checked={selectedFilter === "BrowserProduct"}
              onChange={() => setSelectedFilter("BrowserProduct")}
              className="form-radio"
            />
            <span>Browser Products</span>
          </label>
        </div>

        {/* Category Filter */}
        <div>
          <div
            className="flex items-center mt-4 justify-between cursor-pointer"
            onClick={() => setShowCategory(!showCategory)}
          >
            <h3 className="text-lg font-semibold">Filter by Category</h3>
            {showCategory ? (
              <FaMinus className="text-gray-600" />
            ) : (
              <FaPlus className="text-gray-600" />
            )}
          </div>
          {showCategory && (
            <div className="mt-2">
              {isLoading ? (
                <p>Loading categories...</p>
              ) : (
                <>
                  {topCategories.map((category) => (
                    <label
                      key={category._id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="checkbox"
                        value={category.category_name}
                        checked={selectedCategories.includes(
                          category.category_name
                        )}
                        onChange={() =>
                          setSelectedCategories((prev) =>
                            prev.includes(category.category_name)
                              ? prev.filter(
                                  (item) => item !== category.category_name
                                )
                              : [...prev, category.category_name]
                          )
                        }
                        className="form-checkbox"
                      />
                      <span>{category.category_name}</span>
                    </label>
                  ))}
                  {categories.length > 4 && (
                    <button
                      onClick={openModal}
                      className="text-blue-500 text-sm mt-2 underline"
                    >
                      + {categories.length - 4} more
                    </button>
                  )}
                </>
              )}
              {error && <p>Failed to fetch categories</p>}
            </div>
          )}
        </div>
      </div>

      {/* Custom Modal sub-Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Categories</h2>
              <div className="cursor-pointer" onClick={closeModal}>
                <IoCloseCircleOutline size={30} />
              </div>
            </div>

            <div className="flex  w-full items-center gap-2">
              <input
                type="text"
                placeholder="Search Categories"
                className=" my-5 border rounded-md p-2"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={handleApplyFilters}
                  className="px-5 py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md"
                >
                  Apply Filter
                </button>
                <button
                  onClick={clearFilters}
                  className="py-2 px-5 bg-gray-400 text-white font-semibold rounded-md"
                >
                  Clear Filter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto">
              {categories.map((category) => (
                <label
                  key={category._id}
                  className="flex items-center space-x-2 mb-2"
                >
                  <input
                    type="checkbox"
                    value={category.category_name}
                    checked={selectedCategories.includes(
                      category.category_name
                    )}
                    onChange={() =>
                      setSelectedCategories((prev) =>
                        prev.includes(category.category_name)
                          ? prev.filter(
                              (item) => item !== category.category_name
                            )
                          : [...prev, category.category_name]
                      )
                    }
                    className="form-checkbox"
                  />
                  <span>{category.category_name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterProduct;
