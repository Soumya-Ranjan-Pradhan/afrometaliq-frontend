"use client";

import { useGetAbout } from "@/api/about/query/useAboutQuery";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FaqPage: React.FC = () => {
  const { data, isLoading, error } = useGetAbout();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">
        ABOUT{" "}
        <span className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
          AFROMETALIQ
        </span>
      </h2>
      <div className="space-y-4">
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <FaqSkeleton key={index} />
          ))}

        {data?.data.about.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.about_title}
            answer={faq.about_description}
          />
        ))}

        {error && <p>Error loading data</p>}
      </div>
    </div>
  );
};

const FaqSkeleton = () => {
  return (
    <div className="mb-4 border-b border-gray-300">
      <Skeleton height={40} width="100%" className="mb-2" />
      <Skeleton height={20} width="90%" className="mb-2" />
      <Skeleton height={20} width="80%" className="mb-2" />
    </div>
  );
};

const FaqItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(true); // Default to open

  const toggle = () => setIsOpen(!isOpen);

  // Split the answer into bullet points based on newlines
  const bulletPoints = answer.split("\n").filter((point) => point.trim() !== "");

  return (
    <div className="mb-4 border-b border-gray-300">
      <button
        onClick={toggle}
        className="flex justify-between items-center w-full p-4 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold text-left text-lg focus:outline-none"
      >
        <span>{question}</span>
        <span>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen p-4 bg-gray-100" : "max-h-0"
        }`}
      >
        {isOpen && (
          <ul className="list-disc pl-8 text-gray-800 marker:text-red-500">
            {bulletPoints.map((point, index) => (
              <li key={index} className="text-gray-800">
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FaqPage;
