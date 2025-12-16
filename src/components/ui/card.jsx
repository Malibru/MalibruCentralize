import React from "react"

export function Card({ className = "", children, ...props }) {
  return (
    <div className={`rounded-lg border bg-white/5 p-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={`border-b pb-4 mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className = "", children, ...props }) {
  return (
    <h3 className={`text-xl font-semibold ${className}`} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className = "", children, ...props }) {
  return (
    <p className={`text-sm opacity-80 ${className}`} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  )
}