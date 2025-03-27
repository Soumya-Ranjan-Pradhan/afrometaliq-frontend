"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaCode,
  FaLaptopCode,
  FaCloudUploadAlt,
  FaMobileAlt,
  FaServer,
  FaBullhorn,
} from "react-icons/fa";

const services = [
  {
    title: "Web Design / Development",
    description:
      "Crafting stunning and responsive websites with modern technologies to meet your business needs.",
    icon: <FaLaptopCode className="text-[rgb(20,161,168)] text-5xl" />,
  },
  {
    title: "UI/UX Design",
    description:
      "Designing user-friendly interfaces that provide seamless experiences for your users.",
    icon: <FaCode className="text-[rgb(20,161,168)] text-5xl" />,
  },
  {
    title: "Website Migration",
    description:
      "Seamlessly transferring your website to new platforms without downtime or data loss.",
    icon: <FaCloudUploadAlt className="text-[rgb(20,161,168)] text-5xl" />,
  },
  {
    title: "App Development",
    description:
      "Developing high-performance mobile applications tailored to your business goals.",
    icon: <FaMobileAlt className="text-[rgb(20,161,168)] text-5xl" />,
  },
  {
    title: "DevOps",
    description:
      "Implementing continuous integration and deployment to enhance software delivery processes.",
    icon: <FaServer className="text-[rgb(20,161,168)] text-5xl" />,
  },
  {
    title: "Marketing",
    description:
      "Boosting your brand visibility with data-driven digital marketing strategies.",
    icon: <FaBullhorn className="text-[rgb(20,161,168)] text-5xl" />,
  },
];

const WorkingTech = () => {
  return (
    <section className="relative items-center justify-center  md:flex-row md:justify-between" >
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
          \ Services \
        </motion.h3>
        <motion.h2
          className="text-4xl font-bold text-gray-900 mt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Our Expertise
        </motion.h2>

        {/* Services Grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-left border border-gray-200 hover:shadow-xl transition-all"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {/* Icon */}
              <div className="mb-4">{service.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900">
                {service.title}
              </h3>

              {/* Divider */}
              <div className="mt-2 flex items-center space-x-2">
                <span className="w-10 h-1 bg-[rgb(20,161,168)]"></span>
                <span className="w-4 h-1 bg-[rgb(20,161,168)]"></span>
              </div>

              {/* Description */}
              <p className="mt-3 text-gray-600 text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkingTech;
