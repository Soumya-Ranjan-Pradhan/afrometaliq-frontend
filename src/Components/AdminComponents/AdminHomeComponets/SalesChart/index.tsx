import React from "react";
import ReactECharts from "echarts-for-react";

const SalesChart = () => {
  const chartData = {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    productsSold: [120, 200, 150, 80, 70, 110, 130, 170, 190, 220, 240, 260], // Example data
  };

  // EChart options
  const options = {
    title: {
      text: "Monthly Product Sales",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
      top: "20%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: chartData.months,
      axisLabel: {
        rotate: 45, // Rotates labels for better readability
        formatter: (value: string) => value.substring(0, 3), // Show only the first 3 letters of the month
      },
    },
    yAxis: {
      type: "value",
      name: "No. of Products",
    },
    series: [
      {
        name: "Products Sold",
        type: "bar",
        data: chartData.productsSold,
        itemStyle: {
          color: "#3b82f6", // Blue color for the bars
        },
        emphasis: {
          itemStyle: {
            color: "#2563eb", // Darker blue for emphasis
          },
        },
      },
    ],
    responsive: true, // Makes the chart responsive
  };
  return (
      <div className="bg-white p-6 rounded-lg mb-36 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Monthly Product Sales</h2>
        <ReactECharts
          option={options}
          style={{ width: "100%", height: "400px" }}
        />
      </div>
  
  );
};

export default SalesChart;
