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
import { useTranslation } from "react-i18next";

const CartPage = () => {
  // 120.00 add decimal format
  const { data, isLoading, isError, refetch } = useCartQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const { mutate: sendQuotation } = useCreateQuotation();
  const { mutate: removeFromCart } = useDeleteFromCartMutation();
  const { mutate: updateQuantity } = useUpdateCartQuantityMutation();
  const { isComingSoon, setIsComingSoon } = useGlobalStore();
  const { t, i18n } = useTranslation();
  const [quantityMap, setQuantityMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const token = getFromLS("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const initialQuantities: { [key: string]: string } = {};
    data?.data?.cart.forEach((item: any) => {
      initialQuantities[item.cartItemId] = item.quantity.toString();
    });
    setQuantityMap(initialQuantities);
  }, [data]);

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
            src="https://res.cloudinary.com/dppfr1gjx/image/upload/v1741001860/gg2m37yby4apt0febngh.png"
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

  const vatAmount = totalAmount * 0.16;
  const grandTotal = totalAmount + vatAmount;

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
            href="/product"
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
              {t("bag")}
            </p>
            <p className="text-gray-700 text-[1.2em] font-bold font-ui-sans-serif">
              {t("address")}
            </p>
            <p className="text-gray-700 text-[1.2em] font-bold font-ui-sans-serif">
              {t("payment")}
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
                    <p className="text-red-500 font-semibold text-right text-[0.8rem]">
                      MZN{" "}
                      {(
                        item.product?.product_selling_price * item.quantity
                      ).toFixed(2)}
                    </p>

                    <div className="float-right">
                      {item.product?.product_discount &&
                      item.product?.product_discount > 0 ? (
                        <>
                          <span className="line-through text-gray-400">
                            MZN {item.product?.product_price?.toFixed(2)}
                          </span>{" "}
                          <span className="text-red-600 text-[0.7rem]">
                            {item.product?.product_discount}% OFF
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center lg:mt-5 md:mt-5 space-x-4">
                    {/* Decrement */}
                    <button
                      className="w-7 h-7 bg-gray-300 rounded-full text-center flex items-center justify-center"
                      onClick={() => {
                        const newQuantity = item.quantity - 1;
                        if (newQuantity > 0)
                          handleUpdateQuantity(item.cartItemId, newQuantity);
                      }}
                    >
                      <FaMinus size={12} />
                    </button>

                    {/* Input Field */}
                    <input
                      type="text"
                      value={quantityMap[item.cartItemId] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow only digits
                        if (/^\d*$/.test(value)) {
                          setQuantityMap((prev) => ({
                            ...prev,
                            [item.cartItemId]: value,
                          }));
                        }
                      }}
                      onBlur={() => {
                        const parsed = parseInt(
                          quantityMap[item.cartItemId],
                          10
                        );
                        if (
                          !isNaN(parsed) &&
                          parsed > 0 &&
                          parsed !== item.quantity
                        ) {
                          handleUpdateQuantity(item.cartItemId, parsed);
                        } else {
                          setQuantityMap((prev) => ({
                            ...prev,
                            [item.cartItemId]: item.quantity.toString(),
                          }));
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          (e.target as HTMLInputElement).blur(); // triggers onBlur
                        }
                      }}
                      className="w-12 text-center border rounded-md text-sm py-1"
                    />

                    {/* Increment */}
                    <button
                      className="w-7 h-7 bg-gray-300 rounded-full text-center flex items-center justify-center"
                      onClick={() =>
                        handleUpdateQuantity(item.cartItemId, item.quantity + 1)
                      }
                    >
                      <FaPlus size={12} />
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
              {t("price_details")} ({cartItems.length} )
            </h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <p>{t("total_amount")}</p>
                <p>MZN {totalMRP.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>{t("discount")}</p>
                <p className="text-red-600">MZN {totalDiscount.toFixed(2)}</p>
              </div>
              {/* <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>FREE</p>
              </div>
              <div className="flex justify-between">
                <p>Platform Fee</p>
                <p>MZN20</p>
              </div> */}
              <div className="flex justify-between">
                <p>VAT (16%)</p>
                <p>MZN {vatAmount.toFixed(2)}</p>
              </div>

              <div className="flex justify-between font-semibold text-lg mt-4">
                <p>{t("total_amount")}</p>
                <p>MZN {grandTotal.toFixed(2)}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsComingSoon(true)}
                  className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white w-full py-2 mt-4 rounded-md"
                >
                  {t("pay_now")}
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white w-full py-2 mt-4 rounded-md"
                >
                  {t("send_quotation")}
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
