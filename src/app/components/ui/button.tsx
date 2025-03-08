import React from "react";

// Define the ButtonProps interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <button
        className={`text-white ${className}`}
        ref={ref}
        {...props} // This passes onClick and other props to the native button
      />
    );
  }
);

Button.displayName = "Button";