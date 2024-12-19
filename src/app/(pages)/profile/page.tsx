"use client";
import { useAuthStore } from "@/store/auth";
import { useGlobalStore } from "@/store/global";
import {
  FaBox,
  FaListAlt,
  FaChevronRight,
  FaUserEdit,
  FaMapMarkerAlt,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const menuItems = [
    {
      icon: <FaUserEdit />,
      title: "Edit Profile",
      description: "Update your personal information",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      description: "Manage your delivery addresses",
    },
    {
      icon: <FaBox />,
      title: "Orders",
      description: "Check your order status",
    },
    {
      icon: <FaListAlt />,
      title: "Collections & Wishlist",
      description: "All your curated product collections",
    },
    {
      icon: <FaFileAlt />,
      title: "Terms and Conditions",
      description: "Read our terms and policies",
    },
  ];

  const setComingSoon = useGlobalStore((state) => state.setIsComingSoon);

  const handleClick = () => {
    setComingSoon(true);
  };

  return (
    <div className="flex justify-center  items-start min-h-screen bg-gray-100 py-8 space-x-[10rem]">
      {/* Left Gradient Vertical Line */}
      <div className="h-[45rem] w-[2px] bg-gradient-to-b from-[#24246C] to-[#5A43AF]"></div>

      {/* Main Content */}
      <div className="flex flex-col items-center mx-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center">
              {/* Placeholder profile icon */}
              <span className="text-6xl text-gray-200">👤</span>
            </div>
            {user?._id ? (
              <>
                <p className="font-semibold text-lg ">{user?.username}</p>
                <p className=" text-sm mb-4">{user?.email}</p>
              </>
            ) : (
              <p className="mt-4 text-lg font-medium">
                Login to See Your Profile
              </p>
            )}
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-300" />

          {/* Menu Options */}
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={handleClick}
                className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-xl text-gray-600">{item.icon}</div>
                  <div>
                    <p className="text-base font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="text-gray-400">
                  <FaChevronRight />
                </div>
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <button className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white rounded-lg hover:bg-red-600 transition-colors">
              <FaSignOutAlt className="text-lg mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Right Gradient Vertical Line */}
      <div className="h-[45rem] w-[2px] bg-gradient-to-b from-[#24246C] to-[#5A43AF]"></div>
    </div>
  );
}
