"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaSpinner } from "react-icons/fa";
import Address from "@/Components/CartBilling";
import { AiOutlineClose } from "react-icons/ai";
import {
  useCartQuery,
  useDeleteFromCartMutation,
  useUpdateCartQuantityMutation,
} from "@/api/cart/query/useCartQuery";
import { toast } from "react-toastify";
import Link from "next/link";
import QuotationModal from "@/Components/QuotationModal";
import { useCreateQuotation } from "@/api/quotation/queries/useQuotationQuery";
import { getFromLS } from "@/lib/storage";
import { useGlobalStore } from "@/store/global";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartPage = () => {
  const { data, isLoading, isError, refetch } = useCartQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const { mutate: sendQuotation } = useCreateQuotation();
  const { mutate: removeFromCart } = useDeleteFromCartMutation();
  const { mutate: updateQuantity } = useUpdateCartQuantityMutation();
  const { isComingSoon, setIsComingSoon } = useGlobalStore();

  useEffect(() => {
    const token = getFromLS("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  // handle delete from cart
  const handleDeleteFromCart = (id: string) => {
    setUpdatingItemId(id);
    removeFromCart(id, {
      onSuccess: () => {
        toast.success("Item removed from cart successfully!");
        refetch();
      },
      onError: () => {
        toast.error("Failed to remove item from cart. Please try again.");
      },
      onSettled: () => {
        setUpdatingItemId(null);
      },
    });
  };

  // handle update quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return;
    setUpdatingItemId(id);
    updateQuantity(
      { cartItemId: id, quantity },
      {
        onSuccess: () => {
          toast.success("Item quantity updated successfully!");
          refetch();
        },
        onError: () => {
          toast.error("Failed to update item quantity. Please try again.");
        },
        onSettled: () => {
          setUpdatingItemId(null);
        },
      }
    );
  };

  const handleSendQuotation = () => {
    setLoading(true);
    const products =
      data?.data?.cart.map((item) => ({
        product: item.product?._id,
        quantity: item.quantity,
      })) || [];

    sendQuotation(
      { products, message: "Please process this quotation." },
      {
        onSuccess: () => {
          toast.success("Quotation sent successfully!");
          setIsModalOpen(false);
        },
        onError: (error) => {
          console.error(error);
          toast.error("Failed to send the quotation. Please try again.");
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  // check the user logged in or not
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1741003029/hho762f50ln5rqlsbty4.png"
            alt="Shopping Bag"
            width={200}
            height={200}
          />
          <p className="text-xl font-semibold">
            Please log in to view your bag.
          </p>
          <Link
            href="/signin"
            className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white py-2 px-6 rounded-md"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 lg:flex lg:space-x-8">
        {/* Left Section Skeleton */}
        <div className="lg:w-3/5">
          <div className="bg-gray-100 p-4 rounded-md">
            <Skeleton width={200} height={20} />
            <Skeleton width={300} height={15} />
          </div>

          <div className="mt-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center border p-4 rounded-md mb-4"
              >
                <Skeleton width={100} height={100} />
                <div className="flex-1 ml-4">
                  <Skeleton width={200} height={20} />
                  <Skeleton width={100} height={15} />
                  <Skeleton width={60} height={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section Skeleton */}
        <div className="lg:w-2/5 mt-8 lg:mt-0">
          <div className="bg-gray-100 p-4 rounded-md">
            <Skeleton width={200} height={20} />
            <div className="mt-4 space-y-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex justify-between">
                  <Skeleton width={120} height={15} />
                  <Skeleton width={60} height={15} />
                </div>
              ))}
              <div className="flex justify-between font-semibold text-lg mt-4">
                <Skeleton width={120} height={20} />
                <Skeleton width={60} height={20} />
              </div>
              <Skeleton width={"100%"} height={40} />
              <Skeleton width={"100%"} height={40} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load cart items. Please try again later.</div>;
  }

  const cartItems = data?.data?.cart || [];
  const totalMRP = cartItems.reduce(
    (total, item) => total + (item.product?.product_price || 0) * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (total, item) =>
      total +
      ((item.product?.product_price || 0) -
        (item.product?.product_selling_price || 0)) *
        item.quantity,
    0
  );
  const totalAmount = totalMRP - totalDiscount;

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1741003029/hho762f50ln5rqlsbty4.png"
            alt="Shopping Bag"
            width={200}
            height={200}
          />
          <p className="text-xl font-semibold">Your cart is empty.</p>
          <Link
            href="/signin"
            className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white py-2 px-6 rounded-md"
          >
            Add Items to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto bg-white shadow-md lg:h-[5em]">
        <div className="lg:flex hidden items-center justify-between mx-[10rem]">
          <Image
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1736681131/u75korslf5ye6lxs4tj8.png"
            alt="Arfo Metaliq Logo"
            width={190}
            height={190}
          />
          <div className="flex items-center gap-5">
            <p className="text-blue-700 text-[1.2em] font-bold underline font-ui-sans-serif">
              BAG
            </p>
            <p className="text-gray-700 text-[1.2em] font-bold font-ui-sans-serif">
              Address
            </p>
            <p className="text-gray-700 text-[1.2em] font-bold font-ui-sans-serif">
              Payment
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              alt="Arfo Metaliq Logo"
              src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png"
              width={40}
              height={40}
            />
            <p>100% Secure</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 lg:flex lg:space-x-8">
        {/* Left Section */}
        <div className="lg:w-3/5">
          {/* <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
            <div>
              <p className="font-semibold">
                Deliver to:{" "}
                <span className="text-[#24246C]">
                  Soumya Ranjan Pradhan, 759122
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Saradhapur Petrol Pump, Angul, Angul H.O, Angul
              </p>
            </div>
          </div> */}

          {/* Product List */}
          <div className="mt-6">
            {cartItems.map((item, index) => (
              <div
                key={item.cartItemId}
                className="flex items-center border p-4 rounded-md mb-4 relative"
              >
                {updatingItemId === item.cartItemId && (
                  <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                    <FaSpinner className="animate-spin text-2xl text-gray-500" />
                  </div>
                )}
                <div className="w-20 h-20">
                  <Image
                    src={
                      item.product?.product_images[0]?.url ||
                      "https://via.placeholder.com/100"
                    }
                    alt={item.product?.product_name || "Product"}
                    width={100}
                    height={100}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <div className="flex justify-between items-center space-x-2">
                    <h3 className="font-semibold">
                      {item.product?.product_name || "Product not available"}
                    </h3>
                    <div className="w-6 h-6 flex items-center justify-center cursor-pointer rounded-full bg-green-500">
                      <AiOutlineClose
                        size={20}
                        onClick={() => handleDeleteFromCart(item.cartItemId)}
                      />
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {item.product?.product_code || "Unknown code"}
                  </p>
                  <div className="lg:float-right md:float-right">
                    <p className="text-red-500 font-semibold text-[1.2rem]">
                      ₹{item.product?.product_selling_price?.toFixed(2) || 0}
                    </p>
                    <div>
                      {item.product?.product_discount &&
                      item.product?.product_discount > 0 ? (
                        <>
                          <span className="line-through text-gray-400">
                            MZN {item.product?.product_price?.toFixed(2)}
                          </span>{" "}
                          <span className="text-red-600">
                            {item.product?.product_discount}% OFF
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center lg:mt-5 md:mt-5 space-x-4">
                    <button className="w-7 h-7 bg-gray-300 rounded-full text-center flex items-center justify-center">
                      <FaMinus
                        size={12}
                        onClick={() =>
                          handleUpdateQuantity(
                            item.cartItemId,
                            item.quantity - 1
                          )
                        }
                      />
                    </button>

                    <p className="text-sm">{item.quantity}</p>

                    <button className="w-7 h-7 bg-gray-300 rounded-full text-center flex items-center justify-center">
                      <FaPlus
                        size={12}
                        onClick={() =>
                          handleUpdateQuantity(
                            item.cartItemId,
                            item.quantity + 1
                          )
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-2/5 mt-8 lg:mt-0">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-lg">
              Price Details ({cartItems.length} Items)
            </h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <p>Total MRP</p>
                <p>₹{totalMRP.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount on MRP</p>
                <p className="text-green-500">-₹{totalDiscount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>FREE</p>
              </div>
              <div className="flex justify-between">
                <p>Platform Fee</p>
                <p>₹20</p>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <p>Total Amount</p>
                <p>₹{(totalAmount + 20).toFixed(2)}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsComingSoon(true)}
                  className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white w-full py-2 mt-4 rounded-md"
                >
                  PAY NOW
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white w-full py-2 mt-4 rounded-md"
                >
                  Send Quotation
                </button>
              </div>
            </div>
          </div>
          <Address />
        </div>
      </div>

      <QuotationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSendQuotation}
        isLoading={loading}
      />
    </>
  );
};

export default CartPage;
