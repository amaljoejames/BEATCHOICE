// Button.js
import React from 'react';

export const Button = ({ className, children, ...props }) => {
  const baseClasses = 'rounded px-4 py-2 font-bold focus:outline-none transition-all';
  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
