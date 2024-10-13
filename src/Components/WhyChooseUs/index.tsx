// components/WhyChooseUs.tsx

import React from "react";
import Image from "next/image";

const WhyChooseUs = () => {
  const services = [
    {
      id: 1,
      title: "24/7 SERVICES",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Labor ornare in mattis.",
      icon: "https://res.cloudinary.com/datf6laqn/image/upload/v1728804939/jf4kkz1hsbitgctfnjll.png", // Replace with your icon path
      bgColor: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white",
    },
    {
      id: 2,
      title: "custom",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Labor ornare in mattis.",
      icon: "https://res.cloudinary.com/datf6laqn/image/upload/v1728804140/jpclpgnocfc8d63juowo.png", // Replace with your icon path
      bgColor: "bg-white",
    },
    {
      id: 3,
      title: "cost effective",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Labor ornare in mattis.",
      icon: "https://res.cloudinary.com/datf6laqn/image/upload/v1728805012/xkxfky6okwqrrxebii8b.png", 
      bgColor: "bg-white",
    },
    {
      id: 4,
      title: "Regular Update",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Labor ornare in mattis.",
      icon: "https://res.cloudinary.com/datf6laqn/image/upload/v1728805077/nk0agjrobfg98mdgxd64.png", 
      bgColor: "bg-white",
    },
  ];

  return (
    <section className="my-16 px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Why Choose Us</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-6 rounded-xl shadow-lg  hover:shadow-2xl
                 bg-white hover:bg-gradient-to-r from-[#141234] to-[#605AC5] hover:text-white text-black transition-shadow duration-300`}
          >
            <div className="mb-4  w-16 bg-gradient-to-r from-[#0283E9] to-[#FC01CA] h-16 mx-auto rounded-full flex items-center justify-center">
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
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
