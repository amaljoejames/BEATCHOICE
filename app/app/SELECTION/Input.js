// Input.js
import React from 'react';

export const Input = ({ className, ...props }) => {
  const baseClasses = 'border rounded px-3 py-2 focus:outline-none';
  return <input className={`${baseClasses} ${className}`} {...props} />;
};
