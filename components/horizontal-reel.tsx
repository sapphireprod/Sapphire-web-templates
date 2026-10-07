"use client"

import { useRef } from "react"

import { gsap, useGSAP } from "@/lib/gsap"
import type { ReelFrame } from "@/lib/content"

export function HorizontalReel({ frames }: { frames: ReelFrame[] }) {
  const section = useRef<HTMLElement>(null)
  const indexLabel = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const root = section.current
      if (!root) return
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduce) return

      const track = root.querySelector<HTMLElement>("[data-reel-track]")
      const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-reel-panel]"))
      const bar = root.querySelector<HTMLElement>("[data-reel-bar]")
      if (!track || panels.length === 0) return

      const count = panels.length
      root.style.overflow = "hidden"

      const travel = () => root.offsetWidth * (count - 1)
      const timeline = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: root,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          end: () => `+=${travel()}`,
          onUpdate: (self) => {
            if (!indexLabel.current) return
            const current = Math.min(count, Math.max(1, Math.round(self.progress * (count - 1)) + 1))
            indexLabel.current.textContent = String(current).padStart(2, "0")
          },
        },
      })

      timeline.to(track, { xPercent: (-100 * (count - 1)) / count }, 0)
      if (bar) {
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" })
        timeline.to(bar, { scaleX: 1 }, 0)
      }
    },
    { scope: section },
  )

  return (
    <section id="reel" ref={section} className="reel relative h-[100svh] overflow-x-auto bg-night text-paper">
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 flex items-start justify-between px-5 pt-8 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
          <span className="text-signal">03</span>
          <span className="mx-2">/</span>
          Reel
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
          <span ref={indexLabel}>01</span>
          <span className="mx-2 text-white/30">/</span>
          {String(frames.length).padStart(2, "0")}
        </p>
      </div>
      <h2 className="sr-only">Selected frames</h2>
      <div data-reel-bar className="absolute right-0 bottom-0 left-0 z-10 h-px origin-left scale-x-0 bg-signal" />
      <div
        data-reel-track
        className="reel-track flex h-full"
        style={{ width: `${frames.length * 100}%` }}
      >
        {frames.map((frame) => (
          <article
            key={frame.id}
            data-reel-panel
            className="reel-panel flex h-full shrink-0 flex-col justify-end px-5 pt-28 pb-16 md:px-10 md:pb-20"
            style={{ width: `${100 / frames.length}%` }}
          >
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">{frame.kicker}</p>
              <h3 className="mt-4 font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.04em]">
                {frame.title}
              </h3>
              <p className="mt-6 text-base leading-7 text-paper/75">{frame.body}</p>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
                Frame {frame.index}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
