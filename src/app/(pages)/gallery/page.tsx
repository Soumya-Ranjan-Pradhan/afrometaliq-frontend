"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery() {
  const [images] = useState([
    {
      src: "https://res.cloudinary.com/dppfr1gjx/image/upload/v1729185639/fu58nwcxrty8fikoif9d.jpg",
      alt: "Image 1",
      caption:
        "Narrating Our Energy Future Beta prototype sales iPad gen-z marketing network effects value proposition",
    },
    {
      src: "https://res.cloudinary.com/dppfr1gjx/image/upload/v1729185639/fu58nwcxrty8fikoif9d.jpg",
      alt: "Image 2",
      caption:
        "Narrating Our Energy Future Beta prototype sales iPad gen-z marketing network effects value proposition",
    },
    {
      src: "https://res.cloudinary.com/dppfr1gjx/image/upload/v1729185639/fu58nwcxrty8fikoif9d.jpg",
      alt: "Image 3",
      caption:
        "Narrating Our Energy Future Beta prototype sales iPad gen-z marketing network effects value proposition",
    },
    {
      src: "https://res.cloudinary.com/dppfr1gjx/image/upload/v1729185639/fu58nwcxrty8fikoif9d.jpg",
      alt: "Image 4",
      caption:
        "Narrating Our Energy Future Beta prototype sales iPad gen-z marketing network effects value proposition",
    },
    
  ]);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-10">Our Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <Image
              src={image.src}
              alt={image.alt}
              layout="responsive"
              className="rounded-lg shadow-md"
              width={300}
              height={200}
              objectFit="cover"
            />
            <div className="absolute bottom-0 left-0 p-4 bg-white bg-opacity-75 rounded-lg text-black transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <p className="font-semibold">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
