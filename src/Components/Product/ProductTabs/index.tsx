"use client";

import React from "react";

const SpecificationsTab = () => {
  const specifications = [
    {
      label: "Stand Up",
      value: "35''L x 24''W x 37-45''H (front to back wheel)",
    },
    { label: "Folded (w/o wheels)", value: "32.5''L x 18.5''W x 16.5''H" },
    { label: "Folded (w/ wheels)", value: "32.5''L x 24''W x 18.5''H" },
    { label: "Door Pass Through", value: "24" },
    { label: "Frame", value: "Aluminum" },
    { label: "Weight (w/o wheels)", value: "20 LBS" },
    { label: "Weight Capacity", value: "60 LBS" },
    { label: "Width", value: "24''" },
    { label: "Handle height (ground to handle)", value: "37-45''" },
    { label: "Wheels", value: "12'' air / wide track slick tread" },
    { label: "Seat back height", value: "21.5''" },
    { label: "Head room (inside canopy)", value: "25''" },
    { label: "Color", value: "Black, Blue, Red, White" },
    { label: "Size", value: "M, S" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-purple-50 p-4 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Specifications:-</h2>
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
