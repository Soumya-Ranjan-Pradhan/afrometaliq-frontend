"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
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

const CartPage = () => {
  const { data, isLoading, isError } = useCartQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: removeFromCart } = useDeleteFromCartMutation();
  const { mutate: updateQuantity } = useUpdateCartQuantityMutation();
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  // handle delete from cart
  const handleDeleteFromCart = (id: string) => {
    removeFromCart(id, {
      onSuccess: () => {
        toast.success("Item removed from cart successfully!");
      },
      onError: () => {
        toast.error("Failed to remove item from cart. Please try again.");
      },
    });
  };

  // handle update quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(
      { cartItemId: id, quantity },
      {
        onSuccess: () => {
          toast.success("Item quantity updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update item quantity. Please try again.");
        },
      }
    );
  };

  // check the user logged in or not
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">
            Please log in to view your bag.
          </p>
          <Link
            href="/signin"
            className="bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white py-2 px-6 rounded-md"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
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
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">Your cart is empty.</p>
          <Link
            href="/product"
            className="bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white py-2 px-6 rounded-md"
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
            src="https://res.cloudinary.com/dndq25au1/image/upload/v1729361117/d6zwh0crdjjhmrtzfzkj.jpg"
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
          <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
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
          </div>

          {/* Product List */}
          <div className="mt-6">
            {cartItems.map((item, index) => (
              <div
                id={item.cartItemId}
                key={item.cartItemId}
                className="flex items-center border p-4 rounded-md mb-4"
              >
                <div className="w-20 h-20"></div>
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
                      <span className="line-through text-gray-400">
                        ₹{item.product?.product_price?.toFixed(2) || 0}
                      </span>{" "}
                      {item.product?.product_discount || 0}% OFF
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
                <button className="bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white w-full py-2 mt-4 rounded-md">
                  PAY NOW
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white w-full py-2 mt-4 rounded-md"
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
      />
    </>
  );
};

export default CartPage;
