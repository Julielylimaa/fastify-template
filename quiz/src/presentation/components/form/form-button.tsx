import type { ButtonHTMLAttributes } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export default function FormButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: FormButtonProps) {
  const baseClasses =
    "font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg transform hover:scale-105 active:scale-95";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#33276d] via-[#76549e] to-[#05054d] text-white hover:from-[#33276d]/90 hover:via-[#76549e]/90 hover:to-[#05054d]/90 focus:ring-[#76549e] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100",
    secondary:
      "bg-white/90 text-[#33276d] hover:bg-white focus:ring-[#76549e] border border-[#76549e]/30",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
