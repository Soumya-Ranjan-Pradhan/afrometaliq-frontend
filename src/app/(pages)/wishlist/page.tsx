'use client';

import WishlistCard from "@/Components/WishlistCard";
import { useState } from "react";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      image: "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      name: "HERE&NOW Textured Tartan",
      price: "Rs.747",
      originalPrice: "Rs.2,199",
      discount: "66% OFF",
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      name: "The Roadster Life Co.",
      price: "Rs.919",
      originalPrice: "Rs.2,299",
      discount: "60% OFF",
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      name: "The Roadster Life Co.",
      price: "Rs.988",
      originalPrice: "Rs.2,299",
      discount: "57% OFF",
    },

    {
      id: 4,
      image: "https://res.cloudinary.com/datf6laqn/image/upload/v1728758763/b3lihb93bhzoe9mmrzf7.jpg",
      name: "The Roadster Life Co.",
      price: "Rs.988",
      originalPrice: "Rs.2,299",
      discount: "57% OFF",
    },
  ]);

  const handleRemove = (id: number) => {
    setWishlist(wishlist.filter((product) => product.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        My Wishlist <span className="text-gray-500">({wishlist.length} items)</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {wishlist.map((product) => (
          <WishlistCard key={product.id} product={product} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
