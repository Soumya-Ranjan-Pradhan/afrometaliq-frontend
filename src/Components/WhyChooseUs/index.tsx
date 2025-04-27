"use client";

import React, { useState } from "react";
import Image from "next/image";
import ServiceModal from "./ServiceModal";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import RippleCard from "../ui/snappy-ripple-card";

const WhyChooseUs: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const CHARACTER_LIMIT = 50;

  const services = [
    {
      id: 1,
      title: t("24_7_services"),
      description: t("24_7_services_description"),
      icon: "https://res.cloudinary.com/datf6laqn/image/upload/v1728819665/t9r3paiombk6t8p1jxqy.png",
      bgColor:
        "bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white",
      modalContent: t("24_7_services_modal"),
    },
    {
      id: 2,
      title: t("custom_solutions"),
      description: t("custom_solutions_description"),
      icon: "https://res.cloudinary.com/datf6laqn/image/upload/v1728804140/jpclpgnocfc8d63juowo.png",
      bgColor: "bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)]",
      modalContent: t("custom_solutions_modal"),
    },
    {
      id: 3,
      title: t("cost_effective"),
      description: t("cost_effective_description"),
      icon: "https://res.cloudinary.com/datf6laqn/image/upload/v1728805012/xkxfky6okwqrrxebii8b.png",
      bgColor: "bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)]",
      modalContent: t("cost_effective_modal"),
    },
    {
      id: 4,
      title: t("regular_updates"),
      description: t("regular_updates_description"),
      icon: "https://res.cloudinary.com/datf6laqn/image/upload/v1728805077/nk0agjrobfg98mdgxd64.png",
      bgColor: "bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)]",
      modalContent: t("regular_updates_modal"),
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
        <h2 className="text-3xl font-bold">{t("why_choose_us")}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {services.map((service) => (
          <RippleCard
            key={service.id}
            className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white p-6 rounded-xl h-full flex flex-col justify-between"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-sm text-white/80">
                {service.description.length > CHARACTER_LIMIT
                  ? `${service.description.slice(0, CHARACTER_LIMIT)}...`
                  : service.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-green-300 font-semibold cursor-pointer hover:underline">
              <button onClick={() => handleClick(service.id)}>
                {t("view_more")}
              </button>
              <FaLongArrowAltRight className="text-green-300" />
            </div>
          </RippleCard>
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
