import ReactQueryProvider from "@/context/ReactQueryProvider";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Header/Sidebar";
import Footer from "@/Components/Footer";
import type { Metadata } from "next";
import "./globals.css";
import { FaWhatsapp } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "@/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AfrometaliQ",
  description: "AfrometaliQ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
            @keyframes jump {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
          `}
        </style>
      </head>
      <body className="relative">
        <ReactQueryProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
