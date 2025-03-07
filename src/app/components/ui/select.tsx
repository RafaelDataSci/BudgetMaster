import React from "react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children, className = "" }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className={`border border-gray-300 rounded-md p-2 ${className}`}
  >
    {children}
  </select>
);

export const SelectTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

export const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => <span>{placeholder}</span>;

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => (
  <option value={value}>{children}</option>
);