import React from "react"

export function Input({ className = "", ...props }) {
  const style = {
    height: 40,
    width: "100%",
    borderRadius: 8,
    border: "1px solid var(--color-border)",
    backgroundColor: "var(--color-primary-muted)",
    color: "var(--color-text)",
    padding: "8px 12px",
    fontSize: 14,
    outline: "none",
  }
  return (
    <input
      style={style}
      className={className}
      onFocus={(e) => (e.target.style.borderColor = "var(--color-primary-muted)")}
      onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
      {...props}
    />
  )
}