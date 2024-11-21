"use client";

import StatsCard from "@/Components/AdminComponents/AdminHomeComponets/Orders";
import SalesChart from "@/Components/AdminComponents/AdminHomeComponets/SalesChart";
import TopProductSale from "@/Components/AdminComponents/AdminHomeComponets/TopProductSale";
import React from "react";
import {
  FaShoppingBag,
  FaDollarSign,
  FaFileInvoice,
  FaUserFriends,
} from "react-icons/fa";

const page = () => {
  const stats = [
    {
      icon: FaShoppingBag,
      title: "Total Sales",
      value: "34,945",
      percentage: "1.56%",
      isPositive: true,
      chartColor: "#22c55e", // Green
    },
    {
      icon: FaDollarSign,
      title: "Total Income",
      value: "$37,802",
      percentage: "1.56%",
      isPositive: false,
      chartColor: "#ef4444", // Red
    },
    {
      icon: FaFileInvoice,
      title: "Orders Paid",
      value: "34,945",
      percentage: "0.00%",
      isPositive: true,
      chartColor: "#94a3b8", // Gray
    },
    {
      icon: FaUserFriends,
      title: "Total Visitor",
      value: "34,945",
      percentage: "1.56%",
      isPositive: true,
      chartColor: "#3b82f6", // Blue
    },
  ];
  return (
    <>
      {/* dashboard Sales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <TopProductSale />
      <SalesChart />
    </>
  );
};

export default page;
