import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../Button";

interface SearchForSmallScreenProps {
  open: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchForSmallScreen: React.FC<SearchForSmallScreenProps> = ({
  open,
  setOpenSearch,
}) => {
  return (
    <>
      {open && (
        <div className="fixed bg-black bg-opacity-90 z-50 inset-0 h-screen w-full flex items-start justify-start">
          <div className="sm:p-8 p-4 relative w-full">
            <div className="absolute top-5 right-5">
              <IoCloseCircleOutline
                size={30}
                onClick={() => setOpenSearch((prev) => !prev)}
              />
            </div>
            <form className="flex items-center mt-10">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-2 bg-[#0E0F0F] text-white outline-none focus:bg-[#222222] duration-200 border border-slate-600 w-full "
              />
              <Button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchForSmallScreen;
