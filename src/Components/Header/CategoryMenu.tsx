"use client";

import { type CategoryMenu } from "@/api/category/categoryApi";
import { useCategoryMenu } from "@/api/category/queries/useCategoryQuery";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { IoMenu } from "react-icons/io5";

function CategoryMenu() {
  const { data, isLoading } = useCategoryMenu();
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="hidden lg:flex items-center gap-3 cursor-pointer w-52 pl-3 pr-3 pt-1 pb-1 ml-4"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        ) : (
          <IoMenu className="text-white text-4xl flex-shrink-0" />
        )}

        <p className="text-white font-semibold text-md whitespace-nowrap flex-grow">
          {t("shop_by_category")}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white mt-2 w-52 z-50">
        {data?.data?.menu &&
          data?.data?.menu.length > 0 &&
          data.data.menu.map((item) => (
            <MenuItems key={item._id} data={item} router={router} />
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CategoryMenu;

const MenuItems = ({
  data,
  router,
}: {
  data: CategoryMenu;
  router: ReturnType<typeof useRouter>;
}) => {
  const handleClick = () => {
    // Navigate to the category's dynamic route
    router.push(`/category/${data._id}`);
  };

  return data.children.length > 0 ? (
    // Sub-dropdown menu
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="hover:text-black data-[state=open]:text-black">
        <DropdownMenuLabel>{data.category_name}</DropdownMenuLabel>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="ml-1 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white">
          {data.children.map((item) => (
            <MenuItems key={item._id} data={item} router={router} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  ) : (
    // Leaf menu item
    <DropdownMenuItem onClick={handleClick} className="hover:bg-gray-700">
      <DropdownMenuLabel>{data.category_name}</DropdownMenuLabel>
    </DropdownMenuItem>
  );
};

// "use client";
// import { type CategoryMenu } from "@/api/category/categoryApi";
// import { useCategoryMenu } from "@/api/category/queries/useCategoryQuery";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/Components/ui/dropdown-menu";
// import { useRouter } from "next/navigation";

// import { IoMenu } from "react-icons/io5";

// function CategoryMenu() {
//   const { data, isLoading } = useCategoryMenu();
//   const router = useRouter();

//   // console.log(data);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         className="hidden lg:flex items-center gap-3 cursor-pointer w-52 pl-3 pr-3 pt-1 pb-1 ml-4  "
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//         ) : (
//           <IoMenu className="text-white text-4xl" />
//         )}

//         <p className="text-white font-semibold text-md">Shop by Category</p>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         onClick={() => router.push(`/category/${category._id}`)}
//         className="bg-[#24246C] text-white  mt-2  w-52 z-50"
//       >
//         {data?.data?.menu &&
//           data?.data?.menu.length > 0 &&
//           data.data.menu.map((item) => (
//             <MenuItems key={item._id} data={item} />
//           ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// export default CategoryMenu;

// const MenuItems = ({ data }: { data: CategoryMenu }) => {
//   return data.children.length > 0 ? (
//     // make subDropdown menu
//     <DropdownMenuSub>
//       <DropdownMenuSubTrigger className="hover:text-black data-[state=open]:text-black ">
//         <DropdownMenuLabel>{data.category_name}</DropdownMenuLabel>
//       </DropdownMenuSubTrigger>
//       <DropdownMenuPortal>
//         <DropdownMenuSubContent className="ml-1 bg-[#24246C] text-white  ">
//           {data.children.map((item) => (
//             <MenuItems key={item._id} data={item} />
//           ))}
//         </DropdownMenuSubContent>
//       </DropdownMenuPortal>
//     </DropdownMenuSub>
//   ) : (
//     // make dropdown menu
//     <DropdownMenuItem>
//       <DropdownMenuLabel>{data.category_name}</DropdownMenuLabel>
//     </DropdownMenuItem>
//   );
// };
