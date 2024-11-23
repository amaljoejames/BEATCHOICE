// COMPONENTS/Card.js
import React from 'react'
import classNames from 'classnames'

export function Card({ children, className, ...props }) {
  const baseStyle = 'rounded-lg shadow-lg p-4 bg-white/20 backdrop-blur-md'

  return (
    <div className={classNames(baseStyle, className)} {...props}>
      {children}
    </div>
  )
}
