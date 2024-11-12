import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

interface CategoryItem {
  id: number;
  title: string;
  imageUrl: string;
}

const categories: CategoryItem[] = [
  {
    id: 1,
    title: "Steel",
    imageUrl:
      "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png",
  },
  {
    id: 2,
    title: "Steel",
    imageUrl:
      "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png",
  },
  {
    id: 3,
    title: "Steel",
    imageUrl:
      "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png",
  },
  {
    id: 4,
    title: "Steel",
    imageUrl:
      "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png",
  },
  {
    id: 5,
    title: "Steel",
    imageUrl:
      "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png",
  },
  {
    id: 6,
    title: "Steel",
    imageUrl:
      "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png",
  },
  {
    id: 7,
    title: "Steel",
    imageUrl:
      "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png",
  },
  {
    id: 8,
    title: "Steel",
    imageUrl:
      "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png",
  },
  {
    id: 9,
    title: "Steel",
    imageUrl:
      "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png",
  },
  {
    id: 10,
    title: "Steel",
    imageUrl:
      "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png",
  },
  {
    id: 11,
    title: "Steel",
    imageUrl:
      "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png",
  },
  {
    id: 12,
    title: "Steel",
    imageUrl:
      "https://res.cloudinary.com/dndq25au1/image/upload/v1729446209/lsuk3ft68aqyq5se4wvc.png",
  },
];

const Category: React.FC = () => {
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
        {categories.map((category) => (
          <div key={category.id} className="flex-shrink-0 text-center">
            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-44 lg:h-44 rounded-full border-4 border-[#5A43AF] flex items-center justify-center mx-auto  transition-colors duration-300">
              <Image
                src={category.imageUrl}
                alt={category.title}
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
            </div>

            <p className="mt-2 text-2xl md:text-md font-medium">
              {category.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
