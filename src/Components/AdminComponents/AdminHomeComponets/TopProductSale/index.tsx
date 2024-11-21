"use client";

import React from "react";

const TopProductSale = () => {
  const topSellingProducts = [
    {
      id: 1,
      name: "Patimax Fragrance Long...",
      category: "X1",
      price: "$21",
      image:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    },
    {
      id: 2,
      name: "WholeHearted Grain Free Large...",
      category: "X1",
      price: "$21",
      image:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    },
    {
      id: 3,
      name: "Dog Food Rachael Ray Nutrish®",
      category: "X1",
      price: "$21",
      image:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    },
    {
      id: 4,
      name: "Freshpet Healthy Dog Food...",
      category: "X1",
      price: "$21",
      image:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    },
    {
      id: 5,
      name: "Natural Dog Food Healthy...",
      category: "X1",
      price: "$21",
      image:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    },
  ];

  const orders = [
    {
      id: 1,
      product: "Sojos C",
      customer: "Kristin Watson",
      date: "20 Nov 2023",
      price: "$20",
      image:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    },
    {
      id: 2,
      product: "Mega P",
      customer: "Esther Howard",
      date: "20 Nov 2023",
      price: "$15",
      image:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    },
    {
      id: 3,
      product: "Cloud",
      customer: "Floyd Miles Floyd Miles",
      date: "20 Nov 2023",
      price: "$25",
      image:
        "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
    },
  ];

  return (
    <div className="w-full bg-gray-100 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Top Selling Product</h2>
          </div>
          <div className="mt-4 overflow-x-auto overflow-y-auto max-h-64">
            <div className="min-w-max">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-left text-gray-500">Product</th>
                    <th className="text-gray-500">Quantity</th>
                    <th className="text-right text-gray-500">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {topSellingProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="flex items-center py-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg mr-2"
                        />
                        <span className="truncate">{product.name}</span>
                      </td>
                      <td className="text-center">{product.category}</td>
                      <td className="text-right">{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white p-6  rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Recent Orders</h2>
          </div>
          <div className="mt-4 overflow-x-auto overflow-y-auto max-h-64">
            <div className="min-w-max">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-left text-gray-500">Product</th>
                    <th className="text-left text-gray-500">Order Number</th>
                    <th className="text-left text-gray-500">Date</th>
                    <th className="text-right text-gray-500">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="flex items-center py-2">
                        <img
                          src={order.image}
                          alt={order.product}
                          className="w-10 h-10 rounded-lg mr-2"
                        />
                        <span className="truncate">{order.product}</span>
                      </td>
                      <td className="py-2 text-blue-700">{order.customer}</td>
                      <td className="py-2 text-green-500">{order.date}</td>
                      <td className="text-right py-2 text-red-500">{order.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProductSale;
