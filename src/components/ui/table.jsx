import React from "react"

export function Table({ className = "", children, ...props }) {
  const style = { width: "100%", fontSize: 14, borderCollapse: "collapse" }
  return (
    <table style={style} className={className} {...props}>
      {children}
    </table>
  )
}

export function TableHeader({ children, ...props }) {
  return <thead {...props}>{children}</thead>
}

export function TableBody({ children, ...props }) {
  return <tbody {...props}>{children}</tbody>
}

export function TableRow({ children, ...props }) {
  return <tr {...props}>{children}</tr>
}

export function TableHead({ className = "", children, ...props }) {
  const style = {
    textAlign: "left",
    padding: "10px 12px",
    fontWeight: 600,
    borderBottom: "1px solid var(--color-border)",
    backgroundColor: "var(--color-primary-muted)",
  }
  return (
    <th style={style} className={className} {...props}>
      {children}
    </th>
  )
}

export function TableCell({ className = "", children, ...props }) {
  const style = {
    padding: "10px 12px",
    borderBottom: "1px solid var(--color-border)",
  }
  return (
    <td style={style} className={className} {...props}>
      {children}
    </td>
  )
}