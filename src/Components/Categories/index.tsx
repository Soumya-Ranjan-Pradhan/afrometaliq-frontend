"use client";

import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Subcategory = {
  _id: string;
  name: string;
  images: string;
};

type Category = {
  _id: string;
  name: string;
  images: string;
  subcategories: Subcategory[];
};

const categories: Category[] = [
  {
    _id: "66d6a7b393ebedc7d6bf6393",
    name: "Food",
    images:
      "https://soumyaranjanpradhan.s3.amazonaws.com/products/foodimg-BpHYlBvk.jpg",
    subcategories: [
      {
        _id: "66d6ac040962b108a7197b94",
        name: "Edible Oils",
        images: "https://soumyaranjanpradhan.s3.amazonaws.com/download.png",
      },
      {
        _id: "66d6ac690962b108a7197b97",
        name: "Essential Oils",
        images:
          "https://soumyaranjanpradhan.s3.amazonaws.com/image+30-Bpl4wfEI.png",
      },
      {
        _id: "66d6aca20962b108a7197b9a",
        name: "Jams & Spreads",
        images:
          "https://soumyaranjanpradhan.s3.amazonaws.com/image+151-Dx5InSbY.png",
      },
      {
        _id: "66d6ad520962b108a7197b9d",
        name: "Sauce & Dips",
        images:
          "https://soumyaranjanpradhan.s3.amazonaws.com/image+26-DgTY1ZnL.png",
      },
      {
        _id: "66d6aeba0962b108a7197ba0",
        name: "Sweets & Savouries",
        images:
          "https://soumyaranjanpradhan.s3.amazonaws.com/image+27-C-EmoI4c.png",
      },
      {
        _id: "66d6af4c0962b108a7197ba3",
        name: "Chocolates & Confectionaries",
        images:
          "https://soumyaranjanpradhan.s3.amazonaws.com/image+28-C_T2nZjS.png",
      },
    ],
  },
  {
    _id: "66d6a85393ebedc7d6bf6396",
    name: "Beverage",
    images:
      "https://soumyaranjanpradhan.s3.amazonaws.com/products/beverage-CzQf_ojF.jpg",
    subcategories: [
      {
        _id: "66d6b0460962b108a7197ba6",
        name: "Tea Powder",
        images:
          "https://soumyaranjanpradhan.s3.amazonaws.com/image+27-CvkRtWUf.png",
      },
      {
        _id: "66d6b08a0962b108a7197ba9",
        name: "Coffee Powder",
        images:
          "https://soumyaranjanpradhan.s3.amazonaws.com/image+28-B5UiOW67.png",
      },
    ],
  },
  {
    _id: "66d6a8b493ebedc7d6bf6399",
    name: "Home Care",
    images:
      "https://soumyaranjanpradhan.s3.amazonaws.com/products/homecare-Bkc7E7Gx.png",
    subcategories: [
      {
        _id: "66d6b0dd0962b108a7197bac",
        name: "Repellents",
        images:
          "https://soumyaranjanpradhan.s3.amazonaws.com/homecare-Bkc7E7Gx+(1).png",
      },
      {
        _id: "66f3eaa979491a8f46421055",
        name: "Laundry detergents",
        images:
          "https://res.cloudinary.com/djjfv1lmv/image/upload/v1727261299/products/wvl5ok99dtuhcoydinaq.avif",
      },
    ],
  },
  {
    _id: "66d6a92693ebedc7d6bf639c",
    name: "Beauty & Skin",
    images:
      "https://soumyaranjanpradhan.s3.amazonaws.com/products/beautyskin-DU_9rDVw.jpg",
    subcategories: [
      {
        _id: "66f3ed2e79491a8f46421059",
        name: "Face Wash",
        images:
          "https://res.cloudinary.com/djjfv1lmv/image/upload/v1727261964/products/quciyekfklvw4q3izeu4.jpg",
      },
      {
        _id: "66f3ee3179491a8f4642105d",
        name: "Eyelash Conditioner",
        images:
          "https://res.cloudinary.com/djjfv1lmv/image/upload/v1727262230/products/q4qcura4yj4yhih4xweq.jpg",
      },
    ],
  },
  {
    _id: "66d6a97e93ebedc7d6bf639f",
    name: "Health & Wellness",
    images:
      "https://soumyaranjanpradhan.s3.amazonaws.com/products/health-Bgrm3TRu.png",
    subcategories: [
      {
        _id: "66f3f02379491a8f46421061",
        name: "Protein Powder",
        images:
          "https://res.cloudinary.com/djjfv1lmv/image/upload/v1727262719/products/epor19jgjncnskjkkmrh.jpg",
      },
      {
        _id: "66f3f1d679491a8f46421065",
        name: "Immunity Booster",
        images:
          "https://res.cloudinary.com/djjfv1lmv/image/upload/v1727263143/products/mgds7ugut26wv7wb3537.jpg",
      },
    ],
  },
];

const Categories: React.FC<{ closeDrawer: () => void }> = ({ closeDrawer }) => {
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
      {categories.map((category) => (
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
              {category.name}
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
                {category.subcategories.map((subcategory) => (
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
                      {subcategory.name}
                    </p>
                  </motion.div>
                ))}
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
