"use client"

import Image from "next/image"
import { useRef } from "react"

import { gsap, useGSAP } from "@/lib/gsap"

/**
 * Coordinates stay in GSAP quickTo setters. There is no useState for x or y.
 * The cursor stays in the DOM and only wakes for a fine pointer.
 */
export function CursorTracker() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const fine = window.matchMedia("(pointer: fine)").matches
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (!fine || reduce || !root.current) return
      const scope = root.current
      const dot = scope.querySelector<HTMLElement>("[data-cursor-dot]")
      const ring = scope.querySelector<HTMLElement>("[data-cursor-ring]")
      const plate = scope.querySelector<HTMLElement>("[data-cursor-plate]")
      if (!dot || !ring || !plate) return

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })
      gsap.set(plate, { xPercent: 0, yPercent: 0 })

      const dotX = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3.out" })
      const dotY = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3.out" })
      const ringX = gsap.quickTo(ring, "x", { duration: 0.48, ease: "power3.out" })
      const ringY = gsap.quickTo(ring, "y", { duration: 0.48, ease: "power3.out" })
      const plateX = gsap.quickTo(plate, "x", { duration: 0.58, ease: "power3.out" })
      const plateY = gsap.quickTo(plate, "y", { duration: 0.58, ease: "power3.out" })

      const move = (event: PointerEvent) => {
        scope.classList.add("is-active")
        dotX(event.clientX)
        dotY(event.clientY)
        ringX(event.clientX)
        ringY(event.clientY)
        plateX(event.clientX + 28)
        plateY(event.clientY + 32)
      }

      const syncMode = (event: PointerEvent) => {
        const target = event.target as HTMLElement | null
        const zone = target?.closest?.("[data-cursor]")
        scope.dataset.mode = zone?.getAttribute("data-cursor") || "default"
      }

      const hide = (event: PointerEvent) => {
        if (!event.relatedTarget) scope.classList.remove("is-active")
      }

      window.addEventListener("pointermove", move, { passive: true })
      window.addEventListener("pointerover", syncMode)
      window.addEventListener("pointerout", hide)
      document.documentElement.classList.add("has-cursor")

      return () => {
        window.removeEventListener("pointermove", move)
        window.removeEventListener("pointerover", syncMode)
        window.removeEventListener("pointerout", hide)
        document.documentElement.classList.remove("has-cursor")
      }
    },
    { scope: root },
  )

  return (
    <div ref={root} className="cursor-root" data-mode="default" aria-hidden="true">
      <div data-cursor-plate className="cursor-layer plate">
        <div className="plate-card">
          <Image
            src="/assets/cursor-blueprint.png"
            alt=""
            width={864}
            height={1152}
            className="h-auto w-[148px]"
          />
        </div>
      </div>
      <div data-cursor-ring className="cursor-layer">
        <span className="ring-visual" />
      </div>
      <div data-cursor-dot className="cursor-layer">
        <span className="dot-visual" />
      </div>
    </div>
  )
}
