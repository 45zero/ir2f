"use client"

import { useState, type CSSProperties, type ElementType, type ComponentPropsWithoutRef } from "react"

type HoverableProps<T extends ElementType> = {
  as?: T
  style: CSSProperties
  hoverStyle?: CSSProperties
} & Omit<ComponentPropsWithoutRef<T>, "style">

export function Hoverable<T extends ElementType = "div">({
  as,
  style,
  hoverStyle,
  children,
  ...rest
}: HoverableProps<T>) {
  const [hovered, setHovered] = useState(false)
  const Tag = (as || "div") as ElementType

  return (
    <Tag
      style={hovered && hoverStyle ? { ...style, ...hoverStyle } : style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
