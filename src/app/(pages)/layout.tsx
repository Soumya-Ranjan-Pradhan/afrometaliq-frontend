"use client";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Header/Sidebar";
import Footer from "@/Components/Footer";
import type { Metadata } from "next";
import "../globals.css";
import { FaWhatsapp } from "react-icons/fa";
import "@/i18n";
import Link from "next/link";
import { useGlobalStore } from "@/store/global";
import ComingSoonModal from "@/Components/CommingSoonModal/ComingSoonModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setComingSoon = useGlobalStore((state) => state.setIsComingSoon);
  //   //value
  const comingSoon = useGlobalStore((state) => state.isComingSoon);

  const handleClose = () => {
    setComingSoon(false);
  };

  return (
    <>
      <Header />

      <div>
        <Sidebar />
        <div>{children}</div>
      </div>
      <Footer />

      <Link
        href="https://wa.me/your-number"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed lg:bottom-4 md:bottom-5 bottom-[5rem] right-4 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-300 animate-jump"
        style={{
          animation: "jump 1.5s infinite",
        }}
      >
        <FaWhatsapp size={24} />
      </Link>
      <ComingSoonModal isOpen={comingSoon} onRequestClose={handleClose} />
    </>
  );
}
