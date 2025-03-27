"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 md:flex-row md:justify-between">
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

      {/* Image Section with Animated Dashed Border */}
      <div className="relative flex justify-center w-full md:w-1/2">
        <motion.div
          className="relative p-4 border-2 border-dashed border-red-400 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }} // Tip Tip Tip effect
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1742981352/kqtsfjewvt6bfqqhozyr.png"
            alt="Team Working"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </motion.div>
      </div>

      {/* Text Section */}
      <div className="w-full px-6 mt-8 text-center md:w-1/2 md:text-left md:mt-0">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Empowering businesses with innovative IT solutions
        </h2>
        <p className="mt-4 text-gray-600">
          We are a team of passionate technology enthusiasts who are dedicated
          to helping businesses achieve their goals through innovative IT
          solutions.
        </p>
        <p className="mt-2 text-gray-600">
          Our expertise lies in developing and implementing cutting-edge
          solutions that streamline your business processes, enhance
          productivity, and drive growth. We work with a wide range of clients
          across industries, from small startups to large corporations, to
          deliver customized IT services that fit their unique needs.
        </p>
      </div>
    </section>
  );
};

export default About;




// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";

// const About = () => {
//   return (
//     <section className="relative flex flex-col items-center justify-center py-12 md:flex-row md:justify-between">
//       {/* Top Line with Icon */}
//       <div className="absolute top-0 flex items-center justify-center w-full">
//         <div className="h-[2px] w-3/4 bg-gray-300 relative">
//           <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center">
//             <Image
//               src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1742981154/wooiewqogm6uhtf4c0qs.png"
//               alt="Icon"
//               width={20}
//               height={20}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Image Section with Rotating Dashed Border */}
//       <div className="relative flex justify-center w-full md:w-1/2">
//         <motion.div
//           className="relative p-4 border-2 border-dashed border-red-400 rounded-full"
//           animate={{ rotate: 360 }} // Rotate animation
//           transition={{ duration: 4, repeat: Infinity, ease: "linear" }} // Continuous rotation
//         >
//           <Image
//             src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1742981352/kqtsfjewvt6bfqqhozyr.png"
//             alt="Team Working"
//             width={300}
//             height={300}
//             className="rounded-lg"
//           />
//         </motion.div>
//       </div>

//       {/* Text Section */}
//       <div className="w-full px-6 mt-8 text-center md:w-1/2 md:text-left md:mt-0">
//         <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
//           Empowering businesses with innovative IT solutions
//         </h2>
//         <p className="mt-4 text-gray-600">
//           We are a team of passionate technology enthusiasts who are dedicated
//           to helping businesses achieve their goals through innovative IT
//           solutions.
//         </p>
//         <p className="mt-2 text-gray-600">
//           Our expertise lies in developing and implementing cutting-edge
//           solutions that streamline your business processes, enhance
//           productivity, and drive growth. We work with a wide range of clients
//           across industries, from small startups to large corporations, to
//           deliver customized IT services that fit their unique needs.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default About;
