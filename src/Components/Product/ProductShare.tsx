"use client";

import React from "react";
import { FaShareAlt } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  LinkedinIcon,
} from "react-share";
import { useProductShare } from "@/hooks/useProductShare";
import { toast } from "react-toastify";

interface ProductShareProps {
  productId: string;
  productName: string;
  productImage: string;
  productDescription?: string;
  productPrice?: number;
  className?: string;
}

const ProductShare: React.FC<ProductShareProps> = ({
  productId,
  productName,
  productImage,
  productDescription,
  productPrice,
  className = "",
}) => {
  const { isShareOpen, setIsShareOpen, shareProduct, copyProductLink, getShareData } = useProductShare();

  const shareData = getShareData({
    productId,
    productName,
    productImage,
    productDescription,
    productPrice,
  });

  const handleShareClick = () => {
    shareProduct({
      productId,
      productName,
      productImage,
      productDescription,
      productPrice,
    });
  };

  const handleCopyLink = async () => {
    const result = await copyProductLink(productId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
      <button
        onClick={handleShareClick}
        className="p-2 bg-white hover:bg-red-600 rounded-full transition-colors duration-300 shadow-lg"
        title="Share Product"
      >
        <FaShareAlt className="text-black hover:text-white h-6 w-6" />
      </button>

      {/* Share Options Dropdown */}
      {isShareOpen && (
        <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border z-50 p-4 min-w-[200px]">
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Share Product
            </h3>
            
            {/* Social Media Share Buttons */}
            <div className="flex space-x-2">
              <FacebookShareButton
                url={shareData.url}
                hashtag="#AfrometaliQ"
                className="flex items-center justify-center"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton
                url={shareData.url}
                title={shareData.text}
                hashtags={shareData.hashtags}
                className="flex items-center justify-center"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <WhatsappShareButton
                url={shareData.url}
                title={shareData.text}
                separator=" - "
                className="flex items-center justify-center"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <TelegramShareButton
                url={shareData.url}
                title={shareData.text}
                className="flex items-center justify-center"
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>

              <LinkedinShareButton
                url={shareData.url}
                title={shareData.text}
                summary={productDescription}
                source="AfrometaliQ"
                className="flex items-center justify-center"
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors duration-200"
            >
              Copy Link
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsShareOpen(false)}
              className="w-full py-1 px-4 text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close share options */}
      {isShareOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsShareOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductShare;
