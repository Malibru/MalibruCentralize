import React from "react"

export function Badge({ variant = "default", className = "", children, ...props }) {
  const styles = {
    default: "bg-gray-200 text-gray-800",
    secondary: "bg-blue-200 text-blue-800",
    outline: "border border-gray-400 text-gray-800",
  }
  const base = "inline-flex items-center rounded px-2 py-1 text-xs"
  return (
    <span className={`${base} ${styles[variant] || styles.default} ${className}`} {...props}>
      {children}
    </span>
  )
}