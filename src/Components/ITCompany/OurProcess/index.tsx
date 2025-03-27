"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaSearch,
  FaPencilRuler,
  FaCode,
  FaClipboardCheck,
} from "react-icons/fa";

const steps = [
  {
    id: "01",
    title: "Research",
    description:
      "It is a long established fact that a reader will be distra by the readable content of a page.",
    icon: <FaSearch className="text-[rgb(20,161,168)] text-5xl" />,
  },
  {
    id: "02",
    title: "Design",
    description:
      "It is a long established fact that a reader will be distra by the readable content of a page.",
    icon: <FaPencilRuler className="text-[rgb(20,161,168)] text-5xl" />,
  },
  {
    id: "03",
    title: "Develop",
    description:
      "It is a long established fact that a reader will be distra by the readable content of a page.",
    icon: <FaCode className="text-[rgb(20,161,168)] text-5xl" />,
  },
  {
    id: "04",
    title: "Test",
    description:
      "It is a long established fact that a reader will be distra by the readable content of a page.",
    icon: <FaClipboardCheck className="text-[rgb(20,161,168)] text-5xl" />,
  },
];

const OurProcess = () => {
  return (
    <section className="relative items-center justify-center  md:flex-row md:justify-between">
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
      <div className="py-16 px-5 bg-white text-center">
        {/* Section Title */}
        <motion.h3
          className="text-[rgb(20,161,168)] text-lg font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          \ Planning \
        </motion.h3>
        <motion.h2
          className="text-4xl font-bold text-gray-900 mt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Our Process
        </motion.h2>

        {/* Process Cards */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md text-center relative"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {/* Step Number */}
              <span className="absolute top-4 right-6 text-5xl text-gray-300 font-bold">
                {step.id}
              </span>

              {/* Icon */}
              <div className="mb-4">{step.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>

              {/* Divider */}
              <div className="mt-2 flex items-center justify-center space-x-2">
                <span className="w-10 h-1 bg-[rgb(20,161,168)] text-"></span>
                <span className="w-4 h-1 bg-[rgb(20,161,168)]"></span>
              </div>

              {/* Description */}
              <p className="mt-3 text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurProcess;
