import React from "react";
import UserMenu from "../Sidebar/UserMenu";

const ProfileTooltip = () => {
  return (
    // <div className="absolute top-full right-0 mt-6 w-72 bg-white shadow-lg rounded-lg p-4 text-black z-50">
    //   <p className="font-semibold">Welcome</p>
    //   <p className="text-sm text-gray-600 mb-2">
    //     To access account and manage orders
    //   </p>
    //   <button className=" border border-blue-950 py-1 px-4 rounded-sm mb-2">
    //     LOGIN
    //   </button>
    //   <ul className="text-sm">
    //     <li className="py-1 border-b">
    //       <a href="#">Orders</a>
    //     </li>
    //     <li className="py-1 border-b">
    //       <a href="#">Wishlist</a>
    //     </li>
    //     <li className="py-1 border-b">
    //       <a href="#">Contact Us</a>
    //     </li>
    //     <li className="py-1 border-b">
    //       <a href="#">Save Address</a>
    //     </li>

    //     {/* <li className="py-1">
    //       <a href="#">Myntra Insider</a>
    //       <span className="text-red-500 ml-2 text-xs">New</span>
    //     </li> */}
    //   </ul>
    // </div>

    <>
     <UserMenu />
    </>
  );
};

export default ProfileTooltip;
