"use client";

import { useProductById } from "@/api/product/queries/useProductQuery";
import Address from "@/Components/CartBilling";
import { useAuthStore } from "@/store/auth";
import { useGlobalStore } from "@/store/global";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaMinus, FaPlus } from "react-icons/fa";

const SinglePageBuyNow = ({ params }: { params: { id: string } }) => {
  const { data } = useProductById(params.id);
  const { isComingSoon, setIsComingSoon } = useGlobalStore();
  const { t, i18n } = useTranslation();
  const user = useAuthStore((state) => state.user);

  const product = data?.data.product;

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
          {/* Product List */}
          <div className="mt-6">
            <div
              id={product?._id.toString()}
              key={product?._id.toString()}
              className="flex items-center border p-4 rounded-md mb-4"
            >
              <div className="w-20 h-20"></div>
              <div className="flex-1 ml-4">
                <div className="flex justify-between items-center space-x-2">
                  <h3 className="font-semibold">
                    {product?.product_name || "Product not available"}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm">
                  {product?.product_code || "Unknown code"}
                </p>
                <div className="lg:float-right md:float-right">
                  {user?._id ? (
                    <p className="text-red-500 font-semibold text-[1.2rem]">
                      MZN{product?.product_selling_price?.toFixed(2) || 0}
                    </p>
                  ) : (
                    <p className="text-[10px] text-red-500 md:mb-4">
                      {t("login_to_price")}
                    </p>
                  )}

                  <div>
                    {user?._id ? (
                      <span className="line-through text-gray-400">
                        {" "}
                        <span className="line-through text-gray-400">
                          MZN{product?.product_price?.toFixed(2) || 0}
                        </span>{" "}
                        {product?.product_discount || 0}% OFF
                      </span>
                    ) : (
                      <p className="text-[10px] text-red-500 md:mb-4">
                        {t("login_to_price")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center lg:mt-5 md:mt-5 space-x-4">
                  <button className="w-7 h-7 bg-gray-300 rounded-full text-center flex items-center justify-center">
                    <FaMinus size={12} />
                  </button>

                  <p className="text-sm">1</p>

                  <button className="w-7 h-7 bg-gray-300 rounded-full text-center flex items-center justify-center">
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-2/5 mt-8 lg:mt-0">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-lg"> {t("price_details")}</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <p>
                  <p>{t("total_amount")}</p>
                </p>
                {user?._id ? (
                  <span className="text-sm font-bold text-gray-700">
                    MZN {product?.product_selling_price || "no available the product price"}
                  </span>
                ) : (
                  <p className="text-[10px] text-red-500 md:mb-4">
                    {t("login_to_price")}
                  </p>
                )}
              </div>
              <div className="flex justify-between">
                <p>{t("discount")}</p>
                {user?._id ? (
                  <span className="text-sm font-bold text-gray-700">
                    MZN{" "}
                    <span className="text-green-500">
                      -{product?.product_discount || "not available product dis"}
                    </span>
                  </span>
                ) : (
                  <p className="text-[10px] text-red-500 md:mb-4">
                    {t("login_to_price")}
                  </p>
                )}
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <p>{t("total_amount")}</p>
                {user?._id ? (
                  <span className="text-sm font-bold text-gray-700">
                    MZN{" "}
                    {(
                      (product?.product_selling_price || 0) - // Use selling price here
                      ((product?.product_selling_price || 0) *
                        (product?.product_discount || 0)) /
                        100
                    ).toFixed(2)}
                  </span>
                ) : (
                  <p className="text-[10px] text-red-500 md:mb-4">
                    {t("login_to_price")}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsComingSoon(true)}
                  className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white w-full py-2 mt-4 rounded-md"
                >
                  {t("pay_now")}
                </button>

                <button className="bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white w-full py-2 mt-4 rounded-md">
                  {t("send_quotation")}
                </button>
              </div>
            </div>
          </div>
          <Address />
        </div>
      </div>
    </>
  );
};

export default SinglePageBuyNow;
