import React from "react";
import HeroSection from "@/Components/ITCompany/HeroSection";
import About from "@/Components/ITCompany/AboutUs";
import Technologies from "@/Components/ITCompany/Technologies";
import OurProcess from "@/Components/ITCompany/OurProcess";
import ITServices from "@/Components/ITCompany/Services";
import WorkingTech from "@/Components/ITCompany/WorkingTech";
import DiscussSection from "@/Components/ITCompany/DiscussSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Consultancy",
  keywords: [
    "IT Consultancy",
    "Mobile Application Development",
    "Web Application Development",
    "Marketing",
  ],
  description: "IT Consultancy",
};

const Consultancy = () => {
  return (
    <>
      <HeroSection />
      <About />
      <Technologies />
      <OurProcess />
      <ITServices />
      <WorkingTech />
      <DiscussSection />
    </>
  );
};

export default Consultancy;

// https://res.cloudinary.com/dppfr1gjx/image/upload/v1742813921/bpf4lfh8ylsfhcbuoqtg.jpg
// https://res.cloudinary.com/dppfr1gjx/image/upload/v1742813864/d75gvvdov3hpyvthpxgv.jpg
