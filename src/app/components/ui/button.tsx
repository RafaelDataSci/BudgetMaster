import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <button
        className={`text-white ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";