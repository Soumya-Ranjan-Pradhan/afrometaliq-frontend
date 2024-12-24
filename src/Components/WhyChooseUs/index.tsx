"use client";

import React, { useState } from "react";
import Image from "next/image";
import ServiceModal from "./ServiceModal";
import { FaLongArrowAltRight } from "react-icons/fa";

const WhyChooseUs: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const CHARACTER_LIMIT = 50;

  const services = [
    {
      id: 1,
      title: "24/7 SERVICES",
      description:
        "We provide round-the-clock support to ensure all your queries are resolved efficiently.",
      icon: "https://res.cloudinary.com/datf6laqn/image/upload/v1728819665/t9r3paiombk6t8p1jxqy.png",
      bgColor: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white",
      modalContent:
        "We provide round-the-clock support to ensure all your queries are resolved efficiently, with a dedicated team always available to assist.",
    },
    {
      id: 2,
      title: "Custom Solutions",
      description:
        "We provide by creating and suggesting solutions specifically to meet the unique needs and requirements of a particular organization or business or individual",
      icon: "https://res.cloudinary.com/datf6laqn/image/upload/v1728804140/jpclpgnocfc8d63juowo.png",
      bgColor: "bg-white",
      modalContent:
        "Our custom solutions cater to your unique requirements, enabling better performance and streamlined processes tailored for you.",
    },
    {
      id: 3,
      title: "Cost Effective",
      description:
        "Our aim is to provide the best service to help shopper to save time & being able to make purchases at their most convenient time, less headache in logistics, make your tender while at home, save money in transportation & the most important thing is your stock is in our warehouse",
      icon: "https://res.cloudinary.com/datf6laqn/image/upload/v1728805012/xkxfky6okwqrrxebii8b.png",
      bgColor: "bg-white",
      modalContent:
        "Our aim is to provide the best service to help shopper to save time & being able to make purchases at their most convenient time, less headache in logistics, make your tender while at home, save money in transportation & the most important thing is your stock is in our warehouse",
    },
    {
      id: 4,
      title: "Regular Updates",
      description:
        "We will try our best to keep in regular updates to increase shopper engagement, Up-to-date content keeps visitors interested and take the benefits in regular promotion and best deals",
      icon: "https://res.cloudinary.com/datf6laqn/image/upload/v1728805077/nk0agjrobfg98mdgxd64.png",
      bgColor: "bg-white",
      modalContent:
        "We keep you updated with the latest trends, promotions, and insights to keep you ahead in your industry.",
    },
  ];

  const handleClick = (id: number) => {
    setSelectedService(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  return (
    <section className="my-16 px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Why Choose Us</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-6 rounded-xl shadow-lg hover:shadow-2xl bg-white transition-shadow duration-300`}
          >
            <div className="mb-4 w-16 bg-gradient-to-r from-[#0283E9] to-[#FC01CA] h-16 mx-auto rounded-full flex items-center justify-center">
              <Image
                src={service.icon}
                alt={service.title}
                width={50}
                height={50}
                className="w-12 h-12 object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">
              {service.title}
            </h3>
            <p className="text-gray-600 text-center">
              {service.description.length > CHARACTER_LIMIT
                ? `${service.description.slice(0, CHARACTER_LIMIT)}...`
                : service.description}
            </p>
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                className="text-green-600 hover:underline text-center"
                onClick={() => handleClick(service.id)}
              >
                View More
              </button>
              <FaLongArrowAltRight
                size={20}
                color="green"
                className="mt-1 ml-2 animate-move-left"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Render Modal */}
      {selectedService !== null && (
        <ServiceModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          service={services.find((service) => service.id === selectedService)!}
        />
      )}
    </section>
  );
};

export default WhyChooseUs;
