import Header from "@/Components/Header";
import "./globals.css";
// Your Navbar component
import type { Metadata } from "next";
import Sidebar from "@/Components/Header/Sidebar";
import HomeBanner from "@/Components/HomeBanner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <HomeBanner />
        <div className="sm:flex flex-none">
          <div>
            <Sidebar />
          </div>
          <div className="sm:flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
