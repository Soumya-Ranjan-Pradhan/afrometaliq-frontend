"use client";
import { useState, useEffect } from "react";
import { useEditProfile } from "@/api/auth/queries/authQuery";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import {
  FaBox,
  FaMapMarkerAlt,
  FaUserEdit,
  FaChevronRight,
  FaSignOutAlt,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const editProfileMutation = useEditProfile();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate.push("/signin");
    }
  }, [navigate]);

  const handleEditProfile = () => {
    let token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Unauthorized! Please login again.");
      navigate.push("/signin");
      return;
    }

    token = token.replace(/"/g, ""); // Remove extra quotes

    setIsLoading(true);
    editProfileMutation.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message);
        setUser({ ...user, ...formData }); // Update state immediately
        setIsModalOpen(false);
        setIsLoading(false);
      },
      onError: (error) => {
        toast.error("Failed to update profile: Unauthorized");
        console.error(error);
        setIsLoading(false);
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    toast.success("Logout successful");
    navigate.push("/signin");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const menuItems = [
    {
      icon: <FaUserEdit />,
      title: "Edit Profile",
      description: "Update your personal information",
      onClick: () => setIsModalOpen(true),
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
  ];

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 py-8">
      <div className="flex flex-col items-center mx-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-6xl text-gray-200">👤</span>
            </div>
            {user?._id ? (
              <>
                <p className="font-semibold text-lg">{user?.username}</p>
                <p className="text-sm mb-4">{user?.email}</p>
              </>
            ) : (
              <p className="mt-4 text-lg font-medium">
                Login to See Your Profile
              </p>
            )}
          </div>

          <hr className="my-6 border-gray-300" />

          {/* Menu Options */}
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={item.onClick}
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
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaSignOutAlt className="text-lg mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Edit Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
                disabled={isLoading}
              >
                {isLoading && (
                  <FaSpinner className="animate-spin text-white mr-2" />
                )}
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
