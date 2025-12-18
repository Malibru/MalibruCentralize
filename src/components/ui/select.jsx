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

  const style = {
    height: 40,
    width: "100%",
    borderRadius: 8,
    border: "1px solid var(--color-border)",
    backgroundColor: "var(--color-primary-muted)",
    color: "var(--color-text)",
    padding: "8px 12px",
    fontSize: 14,
  }
  return (
    <select
      style={style}
      className={className}
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