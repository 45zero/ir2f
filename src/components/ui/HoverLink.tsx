"use client"

import Link from "next/link"
import { useState, type CSSProperties, type ReactNode, type ComponentPropsWithoutRef } from "react"

type HoverLinkProps = {
  style: CSSProperties
  hoverStyle?: CSSProperties
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof Link>, "style">

export function HoverLink({ style, hoverStyle, children, ...rest }: HoverLinkProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      style={hovered && hoverStyle ? { ...style, ...hoverStyle } : style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      {children}
    </Link>
  )
}
