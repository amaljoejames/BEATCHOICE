// components/ui/button.tsx

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', className, ...props }) => {
  const baseStyle = 'px-6 py-2 rounded-lg font-medium focus:outline-none';
  const variantStyles = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white',
    ghost: 'bg-transparent border border-white text-white hover:bg-white/10',
  };
  
  return (
    <button className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props} />
  );
};
