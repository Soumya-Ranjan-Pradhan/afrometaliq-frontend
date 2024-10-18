import Image from 'next/image';

const Gallery = () => {
  const images = [
    {
      src: 'https://res.cloudinary.com/dppfr1gjx/image/upload/v1729185639/fu58nwcxrty8fikoif9d.jpg',  // Replace with your image paths
      alt: 'Narrating Our Energy Future',
      description: 'Beta prototype sales iPad gen-z marketing network effects value proposition',
    },
    {
      src: 'https://res.cloudinary.com/dppfr1gjx/image/upload/v1729185639/fu58nwcxrty8fikoif9d.jpg',
      alt: 'Narrating Our Energy Future',
      description: 'Beta prototype sales iPad gen-z marketing network effects value proposition',
    },
    {
      src: 'https://res.cloudinary.com/dppfr1gjx/image/upload/v1729185639/fu58nwcxrty8fikoif9d.jpg',
      alt: 'Narrating Our Energy Future',
      description: 'Beta prototype sales iPad gen-z marketing network effects value proposition',
    },
    {
      src: 'https://res.cloudinary.com/dppfr1gjx/image/upload/v1729185639/fu58nwcxrty8fikoif9d.jpg',
      alt: 'Narrating Our Energy Future',
      description: 'Beta prototype sales iPad gen-z marketing network effects value proposition',
    },
  ];

  return (
    <div className="py-8 px-4">
      <h2 className="text-center text-2xl font-bold mb-8">Our Gallery</h2>
      <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {images.map((image, index) => (
          <div key={index} className="text-center zoom-in">
            <div className="rounded-lg overflow-hidden mb-4">
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold">{image.alt}</h3>
            <p className="text-sm text-gray-500">{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
