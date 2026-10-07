"use client"

import { useRef } from "react"

import { gsap, useGSAP } from "@/lib/gsap"
import type { Station } from "@/lib/content"

const ROUTE =
  "M32 8 V78 H78 V168 H16 V268 H84 V368 H18 V468 H72 V592"

export function CareerRoute({ stations }: { stations: Station[] }) {
  const section = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = section.current
      if (!root) return
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const path = root.querySelector<SVGPathElement>("[data-route-stroke]")
      if (!path) return

      if (reduce) {
        gsap.set(path, { drawSVG: "100%" })
        return
      }

      gsap.set(path, { drawSVG: "0%" })
      gsap.to(path, {
        drawSVG: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          end: "bottom 60%",
          scrub: true,
        },
      })
    },
    { scope: section },
  )

  return (
    <section id="route" ref={section} className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="text-copper">04</span>
          <span className="mx-2">/</span>
          Route
        </p>
        <h2 className="mt-4 max-w-xl font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] tracking-[-0.03em]">
          From a market hall in Porto to a booth in Alfama.
        </h2>
        <div className="relative mt-16 grid grid-cols-[40px_minmax(0,1fr)] gap-4 md:grid-cols-[100px_minmax(0,1fr)] md:gap-10">
          <div className="relative" aria-hidden="true">
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 600" preserveAspectRatio="none">
              <path d={ROUTE} fill="none" stroke="currentColor" strokeWidth="1.25" className="text-ink/15" vectorEffect="non-scaling-stroke" />
              <path
                data-route-stroke=""
                d={ROUTE}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                className="text-copper"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <ol className="flex flex-col gap-14 md:gap-20">
            {stations.map((station) => (
              <li key={station.year} className="grid gap-3 border-t border-ink/10 pt-6 md:grid-cols-[140px_minmax(0,1fr)] md:gap-10">
                <p className="font-display text-5xl tracking-[-0.04em]">{station.year}</p>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-copper">{station.place}</p>
                  <h3 className="mt-2 text-2xl tracking-tight">{station.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-ink/75">{station.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
