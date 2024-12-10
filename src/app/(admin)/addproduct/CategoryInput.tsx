import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { DATA } from "./fake";
import ComboBox from "./ComboBox";

interface Option {
  label: string;
  value: string;
}

// API Fetch Functions
const fetchCategories = async (): Promise<Option[]> => {
  //   const response = await axios.get("/api/categories");
  //   return response.data.map((category: { id: number; name: string }) => ({
  //     label: category.name,
  //     value: category.id,
  //   }));
  return DATA;
};

const fetchSubcategories = async (categoryId: number): Promise<Option[]> => {
  if (!categoryId) return [];
  //   const response = await axios.get(`/api/subcategories?category=${categoryId}`);
  //   return response.data.map((subcategory: { id: number; name: string }) => ({
  //     label: subcategory.name,
  //     value: subcategory.id,
  //   }));
  return DATA;
};

const fetchSubcategories2 = async (
  subcategoryId: number
): Promise<Option[]> => {
  if (!subcategoryId) return [];
  //   const response = await axios.get(
  //     `/api/subcategories2?subcategory=${subcategoryId}`
  //   );
  //   return response.data.map((subcategory2: { id: number; name: string }) => ({
  //     label: subcategory2.name,
  //     value: subcategory2.id,
  //   }));
  return DATA;
};

// Reusable Dropdown Component
interface SearchableDropdownProps {
  options: Option[];
  value: Option | null;
  onChange: (option: Option | null) => void;
  placeholder: string;
}

// Main Component
const MultiLevelDropdown: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Option | null>(
    null
  );
  const [selectedSubcategory2, setSelectedSubcategory2] =
    useState<Option | null>(null);

  // Fetch Categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Fetch Subcategories
  const { data: subcategories = [], isLoading: isLoadingSubcategories } =
    useQuery({
      queryKey: ["subcategories", selectedCategory?.value],
      queryFn: () => fetchSubcategories(Number(selectedCategory?.value)),
      enabled: !!selectedCategory, // Fetch only when a category is selected
    });

  // Fetch Subcategory2
  const { data: subcategories2 = [], isLoading: isLoadingSubcategories2 } =
    useQuery({
      queryKey: ["subcategories2", selectedSubcategory?.value],
      queryFn: () => fetchSubcategories2(Number(selectedSubcategory?.value)),
      enabled: !!selectedSubcategory, // Fetch only when a subcategory is selected
    });

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Multi-Level Dropdown</h1>

      {/* Category */}
      <div>
        <label className="block mb-2 text-sm font-medium">Category</label>
        {isLoadingCategories ? (
          <div>Loading categories...</div>
        ) : (
          <ComboBox
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        )}
      </div>

      {/* Subcategory */}
      <div>
        <label className="block mb-2 text-sm font-medium">Subcategory</label>
        {isLoadingSubcategories ? (
          <div>Loading subcategories...</div>
        ) : (
          <ComboBox
            options={subcategories}
            value={selectedSubcategory}
            onChange={setSelectedSubcategory}
          />
        )}
      </div>

      {/* Subcategory2 */}
      <div>
        <label className="block mb-2 text-sm font-medium">Subcategory 2</label>
        {isLoadingSubcategories2 ? (
          <div>Loading subcategories 2...</div>
        ) : (
          <ComboBox
            options={subcategories2}
            onChange={setSelectedSubcategory2}
            value={selectedSubcategory2}
          />
        )}
      </div>

      {/* Selected Values */}
      {/* <div className="mt-6">
        <h2 className="text-lg font-semibold">Selected Values</h2>
        <p>Category: {selectedCategory?.label || "None"}</p>
        <p>Subcategory: {selectedSubcategory?.label || "None"}</p>
        <p>Subcategory 2: {selectedSubcategory2?.label || "None"}</p>
      </div> */}
    </div>
  );
};

export default MultiLevelDropdown;
