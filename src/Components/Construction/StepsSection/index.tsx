"use client";
import React from "react";
import { BsChatDots, BsEnvelopeCheck, BsPencil } from "react-icons/bs";
import { motion } from "framer-motion";
import FloatingCard from "@/Components/ui/snappy-floating-card";

const steps = [
  {
    icon: <BsChatDots className="text-green-500 text-5xl" />,
    title: "Answer questions",
    description:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet bibendum in in vestibulum.",
  },
  {
    icon: <BsEnvelopeCheck className="text-orange-500 text-5xl" />,
    title: "Select a quote",
    description:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet bibendum in in vestibulum.",
  },
  {
    icon: <BsPencil className="text-blue-500 text-5xl" />,
    title: "Get registered",
    description:
      "Lorem ipsum dolor sit amet consectetur. Adipiscing imperdiet bibendum in in vestibulum.",
  },
];

const StepsSection = () => {
  return (
    <section className="w-full py-16 px-6 text-center">
      <p className="text-gray-500 text-lg">Three steps. Three minutes.</p>
      <h2 className="text-3xl md:text-4xl font-bold mt-2">
        Everything should be this easy.
      </h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
        {steps.map((step, index) => (
          <FloatingCard
            key={index}
            className="flex  flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
            <p className="text-white mt-2 max-w-xs">{step.description}</p>
          </FloatingCard>
        ))}
      </div>
    </section>
  );
};

export default StepsSection;
