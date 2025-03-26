"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaJava,
  FaPython,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiRedux,
  SiReactquery,
  SiAngular,
  SiMongodb,
  SiPostgresql,
  SiNestjs,
  SiKubernetes,
  SiJenkins,
  SiJest,
  SiCypress,
  SiExpress,
  SiSpring,
  SiDjango,
  SiGooglecloud,
} from "react-icons/si";

const techIcons = [
  { icon: <FaHtml5 className="text-orange-500" />, name: "HTML" },
  { icon: <FaCss3Alt className="text-blue-500" />, name: "CSS" },
  { icon: <FaJs className="text-yellow-500" />, name: "JavaScript" },
  { icon: <SiTypescript className="text-blue-600" />, name: "TypeScript" },
  { icon: <FaReact className="text-blue-400" />, name: "React" },
  { icon: <SiNextdotjs className="text-black" />, name: "Next.js" },
  { icon: <SiRedux className="text-purple-600" />, name: "Redux Toolkit" },
  { icon: <SiReactquery className="text-red-600" />, name: "React Query" },
  { icon: <SiAngular className="text-red-500" />, name: "Angular" },
  { icon: <FaNodeJs className="text-green-500" />, name: "Node.js" },
  { icon: <SiExpress className="text-gray-800" />, name: "Express.js" },
  { icon: <SiNestjs className="text-red-500" />, name: "NestJS" },
  { icon: <SiMongodb className="text-green-600" />, name: "MongoDB" },
  { icon: <SiPostgresql className="text-blue-500" />, name: "PostgreSQL" },
  { icon: <FaDocker className="text-blue-500" />, name: "Docker" },
  { icon: <SiKubernetes className="text-blue-500" />, name: "Kubernetes" },
  { icon: <FaAws className="text-orange-500" />, name: "AWS" },
  { icon: <SiGooglecloud className="text-blue-400" />, name: "Google Cloud" },
  { icon: <SiJenkins className="text-red-600" />, name: "Jenkins" },
  { icon: <SiJest className="text-red-500" />, name: "Jest" },
  { icon: <SiCypress className="text-green-500" />, name: "Cypress" },
  { icon: <FaJava className="text-blue-700" />, name: "Java" },
  { icon: <SiSpring className="text-green-700" />, name: "Spring" },
  { icon: <FaPython className="text-yellow-400" />, name: "Python" },
  { icon: <SiDjango className="text-green-500" />, name: "Django" },
];

const Technologies = () => {
  return (
    <section className="relative items-center justify-center  md:flex-row md:justify-between">
      {/* Top Line with Icon */}
      <div className="absolute top-0 flex items-center justify-center w-full">
        <div className="h-[2px] w-3/4 bg-gray-300 relative">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1742981154/wooiewqogm6uhtf4c0qs.png"
              alt="Icon"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-20 bg-white px-5">
        <motion.h2
          className="text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Technologies We Use
        </motion.h2>

        <motion.p
          className="mt-4 text-gray-600 text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Our experts leverage the latest tools and frameworks to deliver
          innovative and robust solutions for your business.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {techIcons.map((tech, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-110"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="text-5xl">{tech.icon}</div>
              <p className="mt-2 text-sm font-medium text-gray-700">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
