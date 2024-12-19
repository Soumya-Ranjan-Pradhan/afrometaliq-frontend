"use client";
import { useCategoriesByLevel } from "@/api/category/queries/useCategoryQuery";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

const Category: React.FC = () => {
  const { data } = useCategoriesByLevel({ level: 1 });

  return (
    <div className="py-8">
      <div className="flex justify-center my-10 items-center gap-2 mt-4">
        <FaLongArrowAltLeft
          size={20}
          color="green"
          className=" ml-2 animate-move-left"
        />
        <div className="text-green-600 font-extrabold  text-center">
          <h2 className="text-center text-3xl md:text-3xl font-xeroda font-bold ">
            Category
          </h2>
        </div>
        <FaLongArrowAltRight
          size={20}
          color="green"
          className=" ml-2 animate-move-left"
        />
      </div>

      <div className="overflow-x-auto flex space-x-6 px-6 hide-scrollbar">
        {/* Category items */}
        {data?.data.categories &&
          data.data.categories.map((category) => (
            <div key={category._id} className="flex-shrink-0 text-center">
              <div className="w-24 h-24 md:w-28 md:h-28 lg:w-44 lg:h-44 rounded-full border-4 border-[#5A43AF] flex items-center justify-center mx-auto transition-colors duration-300">
                <div className="relative w-full h-full overflow-hidden rounded-full">
                  <Image
                    src={
                      category?.thumbnail
                        ? category.thumbnail.url
                        : "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png"
                    }
                    alt={category.category_name}
                    width={100}
                    height={100}
                    className="rounded-full object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
              </div>

              <p className="mt-2 text-2xl md:text-md font-medium">
                {category.category_name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
