import React from "react"

export function Select({ value, onValueChange, children, className = "" }) {
  // Extrai opções de <SelectContent><SelectItem value>...</SelectItem></SelectContent>
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === SelectContent
  )
  const items = content
    ? React.Children.toArray(content.props.children).filter(
        (c) => React.isValidElement(c) && c.type === SelectItem
      )
    : []

  return (
    <select
      className={`h-10 w-full rounded-md border px-3 py-2 text-sm ${className}`}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
    >
      {items.map((item) => (
        <option key={item.props.value} value={item.props.value}>
          {item.props.children}
        </option>
      ))}
    </select>
  )
}

export function SelectTrigger({ children }) {
  // Apenas decorativo no stub
  return <>{children}</>
}

export function SelectValue({ placeholder }) {
  // Placeholder não é necessário no stub
  return null
}

export function SelectContent({ children }) {
  // Apenas container lógico
  return <>{children}</>
}

export function SelectItem({ children }) {
  // Apenas container lógico; Select extrai value via props
  return <>{children}</>
}