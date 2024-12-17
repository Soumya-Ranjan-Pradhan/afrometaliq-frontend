"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Fabrication = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-01-01T00:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative">
      <div className="w-full mx-auto">
        <div className="w-full md:px-16 px-10 md:pt-16 pt-10 pb-10 bg-gray-900 flex-col justify-end items-center lg:gap-28 md:gap-16 gap-10 inline-flex">
          <div className="flex-col justify-end items-center  gap-10 flex">
            <Image
              width={500}
              height={500}
              src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1732213762/tv99udrhtcywxvly42lx.png"
              alt="pagedone logo image"
              className="object-cover"
            />
            <div className="flex-col justify-center items-center gap-10 flex">
              <div className="flex-col justify-start items-center gap-2.5 flex">
                <h2 className="text-center text-emerald-400 md:text-6xl text-5xl font-bold font-manrope leading-normal">
                  Coming Soon
                </h2>
                <p className="text-center text-gray-500 text-base font-normal leading-relaxed">
                  Just 20 days remaining until the big reveal of our new product!
                </p>
              </div>
              <div className="flex items-start justify-center w-full gap-2 count-down-main">
                <div className="timer flex flex-col gap-0.5">
                  <div className="">
                    <h3 className="countdown-element days text-center text-white text-2xl font-bold font-manrope leading-9">
                      {timeLeft.days}
                    </h3>
                  </div>
                  <p className="text-center text-gray-500 text-xs font-normal leading-normal w-full">
                    DAYS
                  </p>
                </div>
                <h3 className="w-3 text-center text-gray-500 text-2xl font-medium font-manrope leading-9">
                  :
                </h3>
                <div className="timer flex flex-col gap-0.5">
                  <div className="">
                    <h3 className="countdown-element hours text-center text-white text-2xl font-bold font-manrope leading-9">
                      {timeLeft.hours}
                    </h3>
                  </div>
                  <p className="text-center text-gray-500 text-xs font-normal leading-normal w-full">
                    HRS
                  </p>
                </div>
                <h3 className="w-3 text-center text-gray-500 text-2xl font-medium font-manrope leading-9">
                  :
                </h3>
                <div className="timer flex flex-col gap-0.5">
                  <div className="">
                    <h3 className="countdown-element minutes text-center text-white text-2xl font-bold font-manrope leading-9">
                      {timeLeft.minutes}
                    </h3>
                  </div>
                  <p className="text-center text-gray-500 text-xs font-normal leading-normal w-full">
                    MINS
                  </p>
                </div>
                <h3 className="w-3 text-center text-gray-500 text-2xl font-medium font-manrope leading-9">
                  :
                </h3>
                <div className="timer flex flex-col gap-0.5">
                  <div className="">
                    <h3 className="countdown-element seconds text-center text-white text-2xl font-bold font-manrope leading-9">
                      {timeLeft.seconds}
                    </h3>
                  </div>
                  <p className="text-center text-gray-500 text-xs font-normal leading-normal w-full">
                    SECS
                  </p>
                </div>
              </div>
              <div className="w-full flex-col justify-center items-center gap-5 flex">
                <h6 className="text-center text-emerald-400 text-base font-semibold leading-relaxed">
                  Launched Date: 01, 01, 2025
                </h6>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm font-normal leading-snug">
            Get in touch with us:{" "}
            <p className="hover:text-gray-100 transition-all duration-700 ease-in-out">
              soumyapradhan63711@gmail.com
            </p>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Fabrication;
