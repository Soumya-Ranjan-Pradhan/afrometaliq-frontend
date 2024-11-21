"use client";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const AdminHeader = () => {
  return (
    <header className="bg-white shadow w-full h-24 px-4 flex justify-between items-center">
      {/* Left: Title */}
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

      {/* Right: Profile and Theme Switch */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900">
          <FaMoon size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <FaSun size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <div className="bg-gray-300 w-8 h-8 rounded-full"></div>
          <span className="text-gray-800 font-medium">Soumya</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
