import React, { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${className} ${bgColor} ${textColor} hover:scale-110 transition duration-100 ease-in`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
