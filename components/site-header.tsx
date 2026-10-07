"use client"

import { useRef } from "react"

import { ScrollTrigger, useGSAP } from "@/lib/gsap"

const links = [
  { href: "#work", label: "Work" },
  { href: "#index", label: "Index" },
  { href: "#reel", label: "Reel" },
  { href: "#route", label: "Route" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  const header = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = header.current
      if (!el) return
      ScrollTrigger.create({
        start: "top -40",
        onToggle: (self) => {
          el.classList.toggle("is-solid", self.isActive)
        },
      })
    },
    { scope: header },
  )

  return (
    <header ref={header} className="site-header">
      <a href="#top" className="font-display text-xl tracking-tight">
        Elena Voss
      </a>
      <nav aria-label="Sections" className="flex flex-wrap justify-end gap-x-4 gap-y-1">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-mono text-[11px] uppercase tracking-[0.16em]"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
