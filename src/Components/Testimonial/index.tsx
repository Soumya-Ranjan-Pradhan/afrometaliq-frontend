"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: "Guy Hawkins",
      position: "CEO, Founder",
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh eleifend arcu vel faucibus arcu, ultrices. Id in auctor posuere nisl volutpat at laoreet.",
    },
    {
      id: 2,
      name: "Cameron Williamson",
      position: "CEO, Founder",
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh eleifend arcu vel faucibus arcu, ultrices. Id in auctor posuere nisl volutpat at laoreet.",
    },
    {
      id: 3,
      name: "Cody Fisher",
      position: "CEO, Founder",
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh eleifend arcu vel faucibus arcu, ultrices. Id in auctor posuere nisl volutpat at laoreet.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000, 
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="my-16 px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">What Our Clients Say</h2>
      </div>

      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="text-6xl mb-4 text-gray-400">“</div>
              <p className="text-gray-600 mb-6">{testimonial.feedback}</p>
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-gray-500">{testimonial.position}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TestimonialSlider;
