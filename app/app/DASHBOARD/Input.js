// COMPONENTS/Input.js
import React from 'react'
import classNames from 'classnames'

export function Input({ className, ...props }) {
  const baseStyle = 'block w-full px-4 py-2 text-sm rounded focus:outline-none'

  return (
    <input
      className={classNames(baseStyle, className)}
      {...props}
    />
  )
}
