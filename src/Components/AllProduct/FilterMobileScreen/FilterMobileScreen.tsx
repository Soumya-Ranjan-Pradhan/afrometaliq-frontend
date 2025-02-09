import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; 
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/Components/ui/drawer";
import { useCategoriesByLevel } from "@/api/category/queries/useCategoryQuery";

interface FilterProductProps {
 
  clearFilters: () => void;
  selectedFilter: string | null;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string | null>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}
const FilterMobileScreen: React.FC<FilterProductProps> = ({
  clearFilters,
  selectedFilter,
  setSelectedFilter,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useCategoriesByLevel({ level: 1 });

  const categories = data?.data.categories || [];
  const topCategories = categories.slice(0, 4);
  const remainingCategories = categories.slice(4);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <div className="block sm:hidden">
      {/* Filter Button */}
      <div className="flex justify-end">
        <button
          onClick={toggleDrawer}
          className="bg-gradient-to-r from-[#24246C] to-[#5A43AF] px-2 py-2 rounded-full"
        >
          <FaFilter color="white" size={15} />
        </button>
      </div>

      {/* Drawer Component */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="fixed bottom-0 left-0 w-full h-[80vh] bg-white rounded-t-lg shadow-lg flex flex-col">
          {/* Drawer Header */}
          <DrawerHeader className="p-4 flex justify-between items-center border-b">
            <DrawerTitle className="text-lg font-semibold">Filters</DrawerTitle>
            <DrawerClose>
              <button className="text-gray-500 hover:text-gray-800">
                <IoClose size={24} />
              </button>
            </DrawerClose>
          </DrawerHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Filter by Type */}
            <h3 className="font-sm font-bold text-blue-700">Filter by Type</h3>
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

            {/* Filter by Category */}
            <h3 className="font-sm font-bold text-blue-700 mt-4">
              Filter by Category
            </h3>
            <div className="mt-2">
              {/* Top Categories */}
              {isLoading && <p>Loading categories...</p>}
              {error && (
                <p className="text-red-500">Failed to load categories</p>
              )}
              {!isLoading && !error && (
                <>
                  {topCategories.map((category) => (
                    <label
                      key={category._id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="checkbox"
                        value={category._id}
                        checked={selectedCategories.includes(
                          category.category_name
                        )}
                        onChange={() =>
                          setSelectedCategories((prev) =>
                            prev.includes(category._id)
                              ? prev.filter(
                                  (item) => item !== category._id
                                )
                              : [...prev, category._id]
                          )
                        }
                        className="form-checkbox"
                      />
                      <span>{category.category_name}</span>
                    </label>
                  ))}

                  {/* Remaining Categories */}
                  {remainingCategories.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-bold">More Categories</h4>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {remainingCategories.map((category) => (
                          <label
                            key={category._id}
                            className="flex items-center space-x-2"
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
                                        (item) =>
                                          item !== category.category_name
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
                  )}
                </>
              )}
            </div>
          </div>

          {/* Fixed Footer with Buttons */}
          <DrawerFooter className="p-4 border-t">
            <div className="flex items-center gap-2">
              {/* <button
                onClick={() => {
              
                  toggleDrawer();
                }}
                className="bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-md px-4 py-2 w-full"
              >
                Apply Filter
              </button> */}
              <button
                onClick={() => {
                  clearFilters();
                  toggleDrawer();
                }}
                className="bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white px-4 py-2 rounded-md w-full"
              >
                Clear Filter
              </button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FilterMobileScreen;
