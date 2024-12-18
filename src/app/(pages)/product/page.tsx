"use client";
import AllProduct from "@/Components/AllProduct";
import React from "react";
const HomePage = () => {
  return (
    <div className="p-4 md:p-8 lg:p-12 bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <AllProduct />
      </div>
  );
};

export default HomePage;
