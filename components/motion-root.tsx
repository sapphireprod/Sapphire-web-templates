"use client"

import Lenis from "lenis"
import { useLayoutEffect } from "react"

import { gsap, ScrollTrigger } from "@/lib/gsap"
import { setLenis } from "@/lib/lenis-ref"

export function MotionRoot({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      autoRaf: false,
      stopInertiaOnNavigate: true,
    })

    setLenis(lenis)
    lenis.on("scroll", ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.("a[href^='#']")
      if (!link) return
      const href = link.getAttribute("href")
      if (!href || href.length < 2) return
      const target = document.querySelector(href)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -72 })
    }

    document.addEventListener("click", onClick)
    ScrollTrigger.refresh()

    return () => {
      document.removeEventListener("click", onClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return children
}
