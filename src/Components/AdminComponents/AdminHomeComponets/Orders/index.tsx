import React from "react";
import ReactECharts from "echarts-for-react";
import { IconType } from "react-icons";

type StatsCardProps = {
  icon: IconType;
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  chartColor: string;
};

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  title,
  value,
  percentage,
  isPositive,
  chartColor,
}) => {
  const chartOptions = {
    grid: { top: 0, bottom: 0, left: 0, right: 0 },
    xAxis: { show: false },
    yAxis: { show: false },
    series: [
      {
        data: [10, 30, 25, 40, 35],
        type: "line",
        smooth: true,
        lineStyle: { color: chartColor, width: 2 },
        areaStyle: { color: chartColor, opacity: 0.3 },
        symbol: "none",
      },
    ],
  };

  return (
    <div className="flex flex-row items-center bg-white p-4 rounded-lg shadow-md  gap-4">
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full text-white"
        style={{ backgroundColor: chartColor }}
      >
        <Icon size={24} />
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <h2 className="text-xl font-bold">{value}</h2>
        <div className="flex items-center text-sm">
          <span className={`${isPositive ? "text-green-500" : "text-red-500"} font-medium`}>
            {isPositive ? "↑" : "↓"} {percentage}
          </span>
        </div>
      </div>
      <div className="w-24">
        <ReactECharts option={chartOptions} style={{ height: 50 }} />
      </div>
    </div>
  );
};

export default StatsCard;
