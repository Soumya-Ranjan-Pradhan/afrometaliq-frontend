"use client";

import React from "react";

const SpecificationsTab = ({ product }: { product: any }) => {
  const specifications = [
    { label: "Size", value: product?.product_size || "N/A" },
    { label: "Grade", value: product?.product_grade || "N/A" },
    { label: "Thickness", value: product?.product_thickness || "N/A" },
    { label: "Unit of Measurement (UOM)", value: product?.product_uom || "N/A" },
    { label: "Length", value: product?.product_length || "N/A" },
    { label: "Width", value: product?.product_width || "N/A" },
  ];

  return (
    <div className="hidden md:block lg:hidden container mx-auto px-4 py-6">
      <div className="bg-purple-50 p-4 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Specifications</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-purple-100 text-left text-gray-600">
              <th className="px-4 py-2 border-b">Feature</th>
              <th className="px-4 py-2 border-b">Details</th>
            </tr>
          </thead>
          <tbody>
            {specifications.map((spec, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-purple-50"
                } hover:bg-purple-100 transition`}
              >
                <td className="px-4 py-2 border-b text-gray-800">{spec.label}</td>
                <td className="px-4 py-2 border-b text-gray-600">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecificationsTab;
