// COMPONENTS/Button.js
import React from 'react'
import classNames from 'classnames'

export function Button({ children, variant = 'default', size = 'md', className, ...props }) {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded focus:outline-none transition-colors'

  const variantStyles = {
    default: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  }

  const sizeStyles = {
    md: 'px-4 py-2 text-sm',
    icon: 'p-2', // for icon-only buttons
  }

  return (
    <button
      className={classNames(baseStyle, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
