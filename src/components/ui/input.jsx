import React from "react"

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`h-10 w-full rounded-md border px-3 py-2 text-sm ${className}`}
      {...props}
    />
  )
}