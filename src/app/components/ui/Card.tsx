import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`border border-gray-200 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;