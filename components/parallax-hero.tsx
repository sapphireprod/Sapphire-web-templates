"use client"

import Image from "next/image"
import { useRef } from "react"

import { gsap, useGSAP } from "@/lib/gsap"

type Layer = {
  el: HTMLElement
  depth: number
}

export function ParallaxHero({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduce) return

      const fine = window.matchMedia("(pointer: fine)").matches
      const nodes = Array.from(scope.querySelectorAll<HTMLElement>("[data-depth]"))
      const layers: Layer[] = nodes.map((el) => ({
        el,
        depth: Number(el.dataset.depth) || 0,
      }))

      if (fine) {
        const pointer = { x: 0, y: 0 }
        let queued = false
        const drivers = layers.map((layer) => ({
          x: gsap.quickTo(layer.el, "x", { duration: 0.85, ease: "power3.out" }),
          y: gsap.quickTo(layer.el, "y", { duration: 0.85, ease: "power3.out" }),
          depth: layer.depth,
        }))

        const onMove = (event: PointerEvent) => {
          pointer.x = event.clientX / window.innerWidth - 0.5
          pointer.y = event.clientY / window.innerHeight - 0.5
          queued = true
        }

        const tick = () => {
          if (!queued) return
          queued = false
          const range = 48
          drivers.forEach((driver) => {
            driver.x(pointer.x * driver.depth * range)
            driver.y(pointer.y * driver.depth * range)
          })
        }

        window.addEventListener("pointermove", onMove, { passive: true })
        gsap.ticker.add(tick)

        return () => {
          window.removeEventListener("pointermove", onMove)
          gsap.ticker.remove(tick)
        }
      }

      const core = scope.querySelector<HTMLElement>("[data-parallax-core]")
      if (!core) return
      gsap.to(core, {
        y: -36,
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root} className="relative min-h-[100svh] overflow-hidden bg-night text-paper">
      <div className="hero-shade" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1440px] lg:grid-cols-2">
        <div className="flex h-full flex-col">{children}</div>
        <div className="relative min-h-[420px] lg:min-h-0">
          <div
            data-depth="0.42"
            aria-hidden="true"
            className="pointer-events-none absolute inset-[16%] rounded-full border border-white/15"
          />
          <div
            data-depth="1.05"
            data-parallax-core=""
            className="absolute inset-0 grid place-items-center will-change-transform"
          >
            <Image
              src="/assets/hero-core.png"
              alt="Machined metal core with a copper ring and a chartreuse filament, the studio mark of Elena Voss."
              width={1024}
              height={1024}
              priority
              sizes="(min-width: 1024px) 42vw, 80vw"
              className="h-auto w-[min(78%,520px)] drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)] select-none"
            />
          </div>
          <p
            data-depth="-0.7"
            data-cursor="reveal"
            className="absolute right-6 bottom-10 z-10 max-w-[12rem] font-mono text-[11px] uppercase leading-5 tracking-[0.16em] text-mist md:right-10"
          >
            Studio mark
            <span className="mt-1 block text-paper/80">Machined core, copper ring</span>
          </p>
        </div>
      </div>
    </section>
  )
}
