"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const line1 = "MuleSoft API Development";
const line2 = "From Idea to Product";

const HeroSection = () => {
  const [displayText1, setDisplayText1] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const [line, setLine] = useState(1);

  useEffect(() => {
    if (line === 1 && index < line1.length) {
      const timeout = setTimeout(() => {
        setDisplayText1((prev) => prev + line1[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (line === 1 && index === line1.length) {
      setTimeout(() => {
        setIndex(0);
        setLine(2);
      }, 500);
    } else if (line === 2 && index < line2.length) {
      const timeout = setTimeout(() => {
        setDisplayText2((prev) => prev + line2[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (line === 2 && index === line2.length) {
      setTimeout(() => {
        setDisplayText1("");
        setDisplayText2("");
        setIndex(0);
        setLine(1);
      }, 2000);
    }
  }, [index, line]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="relative flex items-center justify-center h-[80vh] text-center bg-gradient-to-r from-orange-200 via-blue-100 to-purple-200">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1742979898/y0rnrwxayfs0sx1xtcgs.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </div>

      <div className="flex flex-col items-center">
        <hr className="w-16 border-t-4 border-blue-900 mb-2" />
        <h2 className="text-4xl md:text-6xl font-bold text-blue-900 leading-tight">
          <motion.div
            animate={{ opacity: cursorVisible ? 1 : 0.6 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {displayText1}
            {line === 1 && cursorVisible && (
              <span className="text-blue-900">|</span>
            )}
          </motion.div>
          <br />
          <motion.div
            animate={{ opacity: cursorVisible ? 1 : 0.6 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {displayText2}
            {line === 2 && cursorVisible && (
              <span className="text-blue-900">|</span>
            )}
          </motion.div>
        </h2>
      </div>
    </section>
  );
};

export default HeroSection;
