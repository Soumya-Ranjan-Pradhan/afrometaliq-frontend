"use client";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "Fabrication/ Fabricação",
    image:
      "https://res.cloudinary.com/dppfr1gjx/image/upload/v1742813186/n6okduselzcne2rmjozf.png",
  },
  {
    id: 2,
    title: "Industrial Shed/ Armazém",
    image:
      "https://res.cloudinary.com/dppfr1gjx/image/upload/v1742809148/p3fln6uervru5nffg9l4.png",
  },
  {
    id: 3,
    title: "Commercial Building",
    image:
      "https://res.cloudinary.com/dppfr1gjx/image/upload/v1742813244/gdci2owsgd2d4hulwcxp.png",
  },
  {
    id: 4,
    title: "Erection / Montagem",
    image:
      "https://res.cloudinary.com/dppfr1gjx/image/upload/v1742813281/md4ct6mn6du8seqr1kst.png",
  },
];

export default function ServicesSection() {
  return (
    <section
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dppfr1gjx/image/upload/v1742813864/d75gvvdov3hpyvthpxgv.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative min-h-screen bg-gray-900 mx-auto py-20 px-4 md:px-8"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center text-white">
        {/* Services Section */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center w-[250px]"
            >
              <div className="relative w-56 h-56">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={224}
                  height={224}
                  className="object-cover rounded-lg"
                />
              </div>
              {/* <p className="mt-4 text-lg font-semibold text-white">
                {service.title}
              </p> */}
            </div>
          ))}
        </div>

        {/* Branding Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mt-16">
          {/* Logo and Branding */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <Image
              src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1741001860/gg2m37yby4apt0febngh.png"
              alt="Afro MetaliQ Logo"
              width={250}
              height={250}
              className="object-contain"
            />
            <h1 className="text-3xl font-bold text-blue-500 mt-4">
              AFRO METALiQ
            </h1>
            <p className="text-lg text-orange-400 font-semibold">
              THINK BETTER & BUILD BETTER
            </p>
            <p className="text-sm text-gray-300 italic mt-1">
              www.afrometaliq.com
            </p>
            <div className="bg-teal-600 px-4 py-2 mt-3 rounded-lg">
              <span className="text-white font-bold">
                EMC-Estruturas Metálicas Cumbane, S.U
              </span>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-[50%] max-w-md mt-16 md:mt-0">
            <div className="bg-blue-700 text-white px-4 py-2 rounded-t-lg">
              <h2 className="text-xl font-semibold text-center">
                KEY FEATURES
              </h2>
            </div>
            <ul className="mt-4 space-y-2">
              {["1 Year Leakage Proof Warranty",
                "Best Quality Material",
                "Civil work (Turnkey Project)",
                "On-time Project handover ©",
                "Architectural drawing & Project"].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-yellow-400 font-semibold text-sm"
                >
                  <span className="mr-2">🔹</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
