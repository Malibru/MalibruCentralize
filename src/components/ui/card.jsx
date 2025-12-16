import React from "react"

export function Card({ className = "", children, ...props }) {
  const style = {
    borderRadius: 12,
    border: "1px solid var(--color-border)",
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 16,
  }
  return (
    <div style={style} className={className} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className = "", children, ...props }) {
  const style = {
    borderBottom: "1px solid var(--color-border)",
    paddingBottom: 12,
    marginBottom: 12,
  }
  return (
    <div style={style} className={className} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className = "", children, ...props }) {
  const style = { fontSize: 18, fontWeight: 700, margin: 0 }
  return (
    <h3 style={style} className={className} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className = "", children, ...props }) {
  const style = { fontSize: 13, opacity: 0.8, margin: 0 }
  return (
    <p style={style} className={className} {...props}>
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