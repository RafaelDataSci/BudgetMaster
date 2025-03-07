// src/app/components/ui/Button.tsx
// This is a simplified version; use the actual shadcn/ui-generated file
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Add any additional props if needed
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";