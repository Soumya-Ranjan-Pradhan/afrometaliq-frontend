import React from 'react';
import Modal from 'react-modal';
import { FaTimes, FaHeart, FaExchangeAlt } from 'react-icons/fa';

interface ProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  product: {
    name: string;
    price: number;
    originalPrice: number;
    imageUrl: string;
    description: string;
    stock: string;
    // brand: string;
    // rating: number;
  };
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onRequestClose, product }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="relative bg-white w-full max-w-4xl mx-auto rounded-lg shadow-lg p-6 flex flex-col md:flex-row"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      ariaHideApp={false}
    >
      {/* Close Button */}
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FaTimes size={24} />
      </button>
      
      {/* Product Image Section */}
      <div className="flex-shrink-0 w-full md:w-1/2">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto object-cover rounded-md"
        />
        {/* Additional Images (Optional) */}
        <div className="flex justify-center mt-4 space-x-2">
          <img
            src={product.imageUrl}
            alt="Thumbnail"
            className="w-16 h-16 object-cover border border-gray-200 rounded-md"
          />
          {/* Add more thumbnails if needed */}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="w-full md:w-1/2 md:pl-6 mt-6 md:mt-0 flex flex-col justify-between">
        {/* Product Title */}
        <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-2">Brand: <span className="font-bold">Puma</span></p>
        <div className="flex items-center my-4">
          <span className="text-red-500 text-xl font-bold">Rs. {product.price.toLocaleString()}</span>
          <span className="text-sm text-gray-400 line-through ml-4">Rs. {product.originalPrice.toLocaleString()}</span>
        </div>
        <p className="text-green-600 font-medium mb-4">{product.stock}</p>
        <p className="text-sm text-gray-600 mb-6">{product.description}</p>
        
        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
            <FaHeart className="mr-2" />
            Add To Wishlist
          </button>
          <button className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition">
            <FaExchangeAlt className="mr-2" />
            Compare
          </button>
        </div>

        {/* Add to Cart Section */}
        <div className="flex items-center mt-6">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button className="px-3 py-1">-</button>
            <input
              type="number"
              defaultValue={1}
              className="w-12 text-center border-0 outline-none"
            />
            <button className="px-3 py-1">+</button>
          </div>
          <button className="ml-4 px-6 py-3 bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white font-semibold rounded-lg hover:opacity-90 transition">
            Add To Cart
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
