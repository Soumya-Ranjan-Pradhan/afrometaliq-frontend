"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaLightbulb, FaComments, FaHeadset, FaCogs } from "react-icons/fa";

const services = [
  {
    title: "IT Strategy and Planning",
    description:
      "We help organizations develop strategic plans to align their IT capabilities with business objectives. This includes assessing current IT systems, identifying areas for improvement, and creating a roadmap for technology transformation.",
    icon: <FaLightbulb className="text-white text-5xl" />,
  },
  {
    title: "IT Consultation",
    description:
      "Harness the power of technology with strategic insights and tailored recommendations - trust our IT Consultation services to transform business.",
    icon: <FaComments className="text-white text-5xl" />,
  },
  {
    title: "24/7 Customer Support",
    description:
      "Round-the-clock support, ensuring your business stays on track. Experience peace of mind with our 24/7 customer support, always here to assist you.",
    icon: <FaHeadset className="text-white text-5xl" />,
  },
  {
    title: "Digital Transformation",
    description:
      "We assist businesses in embracing digital technologies to enhance operations, improve customer experiences, and drive innovation. Expertise in cloud computing, data analytics, AI, IoT, and automation.",
    icon: <FaCogs className="text-white text-5xl" />,
  },
];

const ITServices = () => {
  return (
    <section className="relative items-center justify-center md:flex-row md:justify-between">
      {/* Top Line with Icon */}
      <div className="absolute top-0 flex items-center justify-center w-full">
        <div className="h-[2px] w-3/4 bg-gray-300 relative">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[rgb(20,161,168)] w-6 h-6 rounded-full flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1742981154/wooiewqogm6uhtf4c0qs.png"
              alt="Icon"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
      <div className="py-16 px-5 bg-gray-50 text-center">
        {/* Section Header */}
        <motion.h3
          className="text-[rgb(20,161,168)] text-lg font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          \ Our Services \
        </motion.h3>
        <motion.h2
          className="text-4xl font-bold text-gray-900 mt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Customized IT Services
        </motion.h2>

        {/* Services Grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative rounded-lg overflow-hidden text-left text-white shadow-lg"
              style={{
                background: "linear-gradient(135deg, rgba(20,161,168,0.9), rgba(3,105,161,0.9))",
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="p-6 h-full flex flex-col justify-between">
                {/* Icon */}
                <div>{service.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-bold mt-4">{service.title}</h3>

                {/* Divider */}
                <div className="mt-2 flex items-center space-x-2">
                  <span className="w-10 h-1 bg-white"></span>
                  <span className="w-4 h-1 bg-white"></span>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ITServices;