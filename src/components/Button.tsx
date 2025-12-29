import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const getVariantStyles = (variant: ButtonVariant): string => {
  switch (variant) {
    case "primary":
      return "bg-blue-600 hover:bg-blue-700 text-white";
    case "secondary":
      return "bg-gray-200 hover:bg-gray-300 text-gray-800";
    case "danger":
      return "bg-red-600 hover:bg-red-700 text-white";
    default:
      return "";
  }
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
  type = "button",
  className = "",
}) => {
  const baseClasses = "px-4 py-2 rounded transition focus:outline-none";
  const variantClasses = getVariantStyles(variant);
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
