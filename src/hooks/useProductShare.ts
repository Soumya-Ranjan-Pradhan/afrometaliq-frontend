import { useState } from 'react';

interface ShareProductParams {
  productId: string;
  productName: string;
  productImage: string;
  productDescription?: string;
  productPrice?: number;
}

export const useProductShare = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const shareProduct = ({
    productId,
    productName,
    productImage,
    productDescription,
    productPrice,
  }: ShareProductParams) => {
    // Create the product URL
    const productUrl = `${window.location.origin}/product/${productId}`;
    
    // Create share text with product details
    const shareText = `Check out this amazing product: ${productName}${
      productPrice ? ` - MZN ${productPrice}` : ""
    } at AfrometaliQ! ${productDescription ? `\n\n${productDescription}` : ""}`;

    // Native Web Share API (if supported)
    if (navigator.share) {
      navigator.share({
        title: productName,
        text: shareText,
        url: productUrl,
      }).catch((error) => {
        console.log('Error sharing:', error);
        // Fallback to opening share modal
        setIsShareOpen(true);
      });
    } else {
      // Fallback to opening share modal
      setIsShareOpen(true);
    }
  };

  const copyProductLink = async (productId: string) => {
    const productUrl = `${window.location.origin}/product/${productId}`;
    
    try {
      await navigator.clipboard.writeText(productUrl);
      return { success: true, message: "Link copied to clipboard!" };
    } catch (err) {
      console.error("Failed to copy link: ", err);
      return { success: false, message: "Failed to copy link" };
    }
  };

  const getShareData = (params: ShareProductParams) => {
    const productUrl = `${window.location.origin}/product/${params.productId}`;
    const shareText = `Check out this amazing product: ${params.productName}${
      params.productPrice ? ` - MZN ${params.productPrice}` : ""
    } at AfrometaliQ! ${params.productDescription ? `\n\n${params.productDescription}` : ""}`;

    return {
      url: productUrl,
      title: params.productName,
      text: shareText,
      image: params.productImage,
      hashtags: ['AfrometaliQ', 'MetalProducts', 'Construction'],
    };
  };

  return {
    isShareOpen,
    setIsShareOpen,
    shareProduct,
    copyProductLink,
    getShareData,
  };
};
