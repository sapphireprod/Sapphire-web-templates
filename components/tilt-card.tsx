"use client"

import { useRef } from "react"

import { gsap } from "@/lib/gsap"

const MAX_TILT = 9

export function TiltCard({
  children,
  cursor = "view",
}: {
  children: React.ReactNode
  cursor?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  const glare = useRef<HTMLDivElement>(null)
  const allow = useRef<boolean | null>(null)

  const enabled = () => {
    if (allow.current === null) {
      allow.current = window.matchMedia("(prefers-reduced-motion: no-preference)").matches
    }
    return allow.current
  }

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled()) return
    if (event.pointerType === "touch") return
    const el = root.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * MAX_TILT * 2
    const rotateX = (0.5 - py) * MAX_TILT * 2

    gsap.to(el, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    })

    if (glare.current) {
      glare.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.55), transparent 46%)`
      gsap.to(glare.current, { opacity: 0.38, duration: 0.35, overwrite: "auto" })
    }
  }

  const onLeave = () => {
    if (!root.current) return
    gsap.to(root.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    })
    if (glare.current) {
      gsap.to(glare.current, { opacity: 0, duration: 0.5, overwrite: "auto" })
    }
  }

  return (
    <div className="tilt-scene h-full" data-cursor={cursor}>
      <div
        ref={root}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="tilt-root relative h-full will-change-transform"
      >
        {children}
        <div ref={glare} className="pointer-events-none absolute inset-0 opacity-0" />
      </div>
    </div>
  )
}
