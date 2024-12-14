"use client";
import { useGetAbout } from "@/api/about/query/useAboutQuery";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FaqPage: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetAbout();

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
        {isLoading && <p>Loading...</p>}

        {data?.data.about.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.about_title}
            answer={faq.about_description}
          />
        ))}
      </div>
    </div>
  );
};

const FaqItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
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

// "use client";
// import React, { useState } from "react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// interface FaqItemProps {
//   question: string;
//   answer: string;
// }

// interface FaqSectionProps {
//   title: string;
//   faqs: FaqItemProps[];
// }

// const FaqPage: React.FC = () => {
//   const [openFaq, setOpenFaq] = useState<{ [key: string]: boolean }>({});
//   const sections: FaqSectionProps[] = [
//     {
//       title: "ABOUT AFROMETALIQ",
//       faqs: [
//         {
//           question: "What are AFROMETALIQ business hours?",
//           answer:
//             "Our operational hours are Monday to Friday, from 08h00 to 16h30. Note that we are not open on Saturdays for collections.",
//         },
//         {
//           question: "Where is AFROMETALIQ located?",
//           answer:
//             "AFROMETALIQ has branches within South Africa, in all provinces, as well as internationally in Angola, Malawi, Mozambique, Ghana, Zambia and Swaziland. To search for a branch, you can do so here: https://macsteel.co.za/branch-locator or you can see a list of Macsteel branches and their respective contact details by clicking here.",
//         },
//       ],
//     },
//     {
//       title: "POLICIES AND GUIDELINES",
//       faqs: [
//         {
//           question: "What is your return policy?",
//           answer:
//             "You can return any item within 30 days of purchase, provided it is in its original condition and packaging. For more details, please refer to our return policy page.",
//         },
//         {
//           question: "How does AFROMETALIQ ensure product quality?",
//           answer:
//             "We adhere to strict quality control standards across all our facilities. Each product is inspected thoroughly before it is shipped.",
//         },
//       ],
//     },
//   ];

//   const toggleFaq = (question: string) => {
//     setOpenFaq((prev) => ({
//       ...prev,
//       [question]: !prev[question],
//     }));
//   };

//   return (
//     <div className="container mx-auto p-4 md:p-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">FAQs</h1>
//       {sections.map((section, sectionIndex) => (
//         <div key={sectionIndex} className="mb-8">
//           <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
//             {section.title}
//           </h2>
//           <div className="space-y-4">
//             {section.faqs.map((faq, faqIndex) => (
//               <div
//                 key={faqIndex}
//                 className="mb-4 border-b border-gray-300"
//               >
//                 <button
//                   onClick={() => toggleFaq(faq.question)}
//                   className="flex justify-between items-center w-full p-4 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold text-left text-lg focus:outline-none"
//                 >
//                   <span>{faq.question}</span>
//                   <span>
//                     {openFaq[faq.question] ? (
//                       <FiChevronUp />
//                     ) : (
//                       <FiChevronDown />
//                     )}
//                   </span>
//                 </button>
//                 <div
//                   className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                     openFaq[faq.question]
//                       ? "max-h-screen p-4 bg-gray-100"
//                       : "max-h-0"
//                   }`}
//                 >
//                   <p className="text-gray-800">{faq.answer}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FaqPage;
