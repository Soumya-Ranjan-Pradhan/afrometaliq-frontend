import React, { useMemo } from "react";
import ComboBox from "./ComboBox";
import { useCategories } from "@/api/category/queries/useCategoryQuery";

export interface Option {
  label: string;
  value: string;
}

type TCategories = {
  selectedCategory: Option | null;
  selectedSubcategory: Option | null;
  selectedSubcategory2: Option | null;
};

// Main Component
const CategoriesInput = ({
  categories,
  setCategories,
}: {
  categories: TCategories;
  setCategories: (props: TCategories) => void;
}) => {
  const handleCategoryChange = (
    option: Option | null,
    name: keyof TCategories
  ) => {
    if (name === "selectedCategory") {
      setCategories({
        selectedCategory: option,
        selectedSubcategory: null,
        selectedSubcategory2: null,
      });
      return;
    }

    if (name === "selectedSubcategory") {
      setCategories({
        ...categories,
        selectedSubcategory: option,
        selectedSubcategory2: null,
      });
      return;
    }

    setCategories({ ...categories, [name]: option });
  };

  return (
    <>
      {/* Category */}
      <CategoryInput
        label="Category"
        name="selectedCategory"
        parent={null}
        queryEnabled={true}
        value={categories.selectedCategory}
        onChange={handleCategoryChange}
      />

      {/* Subcategory */}
      <CategoryInput
        label="Subcategory"
        name="selectedSubcategory"
        parent={categories.selectedCategory?.value as string}
        queryEnabled={!!categories.selectedCategory}
        value={categories.selectedSubcategory}
        onChange={handleCategoryChange}
      />

      {/* Subcategory2 */}
      <CategoryInput
        label="Subcategory-2"
        name="selectedSubcategory2"
        parent={categories.selectedSubcategory?.value as string}
        queryEnabled={!!categories.selectedSubcategory}
        value={categories.selectedSubcategory2}
        onChange={handleCategoryChange}
      />
    </>
  );
};

export default CategoriesInput;

const CategoryInput = ({
  parent,
  name,
  queryEnabled,
  label,
  value,
  onChange,
}: {
  name: keyof TCategories;
  parent: string | null;
  label: string;
  queryEnabled: boolean;
  value: Option | null;
  onChange: (option: Option | null, name: keyof TCategories) => void;
}) => {
  const { data, isLoading: isLoadingCategories } = useCategories(
    { parent },
    { enabled: queryEnabled }
  );

  const options = useMemo(() => {
    return data?.data?.categories
      ? data?.data?.categories.map((category) => ({
          label: category.category_name,
          value: category._id,
        }))
      : [];
  }, [data]);

  const handleOnChange = (option: Option | null) => {
    onChange(option, name);
  };

  return (
    <div className="mt-4">
      <label className="block mb-2 text-sm text-gray-700 font-medium">
        {label}
      </label>
      {isLoadingCategories ? (
        <div>Loading categories...</div>
      ) : (
        <ComboBox
          options={options}
          value={value}
          onChange={handleOnChange}
          disabled={isLoadingCategories || !queryEnabled}
        />
      )}
    </div>
  );
};
