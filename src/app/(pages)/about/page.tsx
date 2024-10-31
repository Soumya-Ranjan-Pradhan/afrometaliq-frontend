"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqPage: React.FC = () => {
  const faqData: FaqItemProps[] = [
    {
      question: "What are AFROMETALIQ business hours?",
      answer:
        "Our operational hours are Monday to Friday, from 08h00 to 16h30. Note that we are not open on Saturdays for collections.",
    },
    {
      question: "Where is AFROMETALIQ located?",
      answer:
        "AFROMETALIQ has branches within South Africa, in all provinces, as well as internationally in Angola, Malawi, Mozambique, Ghana, Zambia and Swaziland. To search for a branch, you can do so here: https://macsteel.co.za/branch-locator or you can see a list of Macsteel branches and their respective contact details by clicking here.",
    },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* <h1 className="text-3xl font-bold mb-4">FAQs</h1> */}
      <h2 className="text-2xl font-semibold mb-6">
        ABOUT{" "}
        <span className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
          AFROMETALIQ
        </span>
      </h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
        <p className="text-gray-800">{answer}</p>
      </div>
    </div>
  );
};

export default FaqPage;
