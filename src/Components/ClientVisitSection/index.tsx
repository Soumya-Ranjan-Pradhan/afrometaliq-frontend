"use client";

import Image from "next/image";
import { FaUsers } from "react-icons/fa";
import HappyClient from "@/app/public/Client.jpg";
import { useGetAllUsers } from "@/api/auth/queries/authQuery";

export default function ClientVisitSection() {
  const { data, isLoading, error } = useGetAllUsers();

  return (
    <section className="w-full bg-gradient-to-br from-white to-gray-100 px-4 py-12 md:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="w-full">
          <Image
            src={HappyClient}
            alt="Website Visitors"
            width={600}
            height={400}
            className="w-full h-auto rounded-3xl shadow-xl object-cover"
            priority
          />
        </div>

        {/* Right Info Box */}
        <div className="flex flex-col items-start justify-center px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-snug">
            Join Thousands Exploring Our Platform
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-lg">
            We&rsquo;re thrilled to see thousands of users discovering our platform
            and making the most of our services every single month.
          </p>

          <div className="flex items-center bg-white rounded-2xl shadow-lg p-5 gap-4 w-full max-w-sm">
            <div className="bg-blue-600 text-white p-4 rounded-full shadow-md">
              <FaUsers size={28} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {data?.data.pagination.totalUsers}
              </p>
              <p className="text-sm text-gray-500">
                Active users engaging with us
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
