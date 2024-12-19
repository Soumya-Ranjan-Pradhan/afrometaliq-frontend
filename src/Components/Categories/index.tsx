"use client";

import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCategoryMenu } from "@/api/category/queries/useCategoryQuery";

type CategoryMenu = {
  _id: string;
  category_name: string;
  children: CategoryMenu[]; // Recursive structure
};

const Categories: React.FC<{ closeDrawer: () => void }> = ({ closeDrawer }) => {
  const { data, isLoading, error } = useCategoryMenu();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleSubcategories = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const categoryVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const subcategoryVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !data?.data?.menu) {
    return <p>Error loading categories</p>;
  }

  const renderSubcategories = (subcategories: CategoryMenu[]) =>
    subcategories.map((subcategory) => (
      <motion.div
        key={subcategory._id}
        className="flex items-center gap-2 py-2 cursor-pointer"
        variants={subcategoryVariants}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
      >
        <MdOutlineKeyboardArrowRight size={20} />
        <p className="font-semibold text-[1rem] md:text-[1.3rem]">
          {subcategory.category_name}
        </p>
      </motion.div>
    ));

  return (
    <motion.div
      className="p-4"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {data.data.menu.map((category: CategoryMenu) => (
        <motion.div
          key={category._id}
          className="overflow-hidden mb-4"
          variants={categoryVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div
            className="p-1 flex items-center gap-2 cursor-pointer"
            onClick={() => toggleSubcategories(category._id)}
          >
            <MdOutlineKeyboardArrowRight
              size={30}
              className={`transition-transform ${
                expandedCategories.includes(category._id)
                  ? "rotate-90"
                  : "rotate-0"
              }`}
            />
            <p className="text-[1.1rem] md:text-[1.8rem] font-semibold">
              {category.category_name}
            </p>
          </div>

          <AnimatePresence>
            {expandedCategories.includes(category._id) && (
              <motion.div
                className="ml-8"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {renderSubcategories(category.children)}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <motion.div
        className="p-1 flex items-center gap-2 cursor-pointer"
        variants={categoryVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <MdOutlineKeyboardArrowRight size={30} className="rotate-0" />
        <Link href="/contact" onClick={closeDrawer}>
          <p className="text-[1.2rem] md:text-[1.8rem] font-semibold">
            Contact
          </p>
        </Link>
      </motion.div>

      <motion.div
        className="p-1 flex items-center gap-2 cursor-pointer"
        variants={categoryVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <MdOutlineKeyboardArrowRight size={30} className="rotate-0" />
        <Link href="/fabrication" onClick={closeDrawer}>
          <p className="text-[1.2rem] md:text-[1.8rem] font-semibold">
            Fabrication
          </p>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Categories;
