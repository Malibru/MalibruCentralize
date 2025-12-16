import React from "react"

export function Table({ className = "", children, ...props }) {
  return (
    <table className={`w-full text-sm ${className}`} {...props}>
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
  return (
    <th className={`text-left font-medium px-3 py-2 ${className}`} {...props}>
      {children}
    </th>
  )
}

export function TableCell({ className = "", children, ...props }) {
  return (
    <td className={`px-3 py-2 ${className}`} {...props}>
      {children}
    </td>
  )
}