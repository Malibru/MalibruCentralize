import React from "react"

export function Button({
  className = "",
  children,
  variant = "default",
  size = "md",
  ...props
}) {
  const base = {
    padding: size === "sm" ? "6px 10px" : "10px 14px",
    borderRadius: "8px",
    fontSize: size === "sm" ? "12px" : "14px",
    fontWeight: 600,
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "opacity .15s ease",
  }

  const variants = {
    default: {
      backgroundColor: "var(--color-primary)",
      color: "var(--color-text)",
      borderColor: "var(--color-border)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--color-text)",
      borderColor: "var(--color-border)",
    },
    destructive: {
      backgroundColor: "var(--color-accent)",
      color: "#222",
      borderColor: "var(--color-accent)",
    },
  }

  const style = { ...base, ...(variants[variant] || variants.default) }

  return (
    <button style={style} className={className} {...props}>
      {children}
    </button>
  )
}