"use client"

import Image from "next/image"
import { useRef } from "react"

import { gsap, useGSAP } from "@/lib/gsap"
import { useGridStore } from "@/lib/grid-store"
import type { PracticeElement } from "@/lib/content"

function Inspector({ elements }: { elements: PracticeElement[] }) {
  const activeId = useGridStore((state) => state.activeId)
  const active = elements.find((element) => element.id === activeId) ?? null
  const panel = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!panel.current || !active) return
      gsap.fromTo(
        panel.current,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" },
      )
    },
    { dependencies: [activeId], scope: panel },
  )

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Floating note</p>
      <div className="mt-4 min-h-[320px] border border-ink/15 bg-paper-deep/50 p-5">
        {active ? (
          <div ref={panel} id="practice-note" aria-live="polite">
            <Image
              src="/assets/grid-cluster.png"
              alt="Frosted sphere, copper prism, and smoked glass cube."
              width={1024}
              height={1024}
              sizes="240px"
              className="mb-4 h-auto w-48 select-none"
            />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-copper">
              {active.number} / {active.symbol}
            </p>
            <h3 className="mt-2 font-display text-4xl tracking-tight">{active.name}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-ink/80">{active.note}</p>
          </div>
        ) : (
          <div id="practice-note" className="flex h-full min-h-[280px] flex-col justify-between">
            <div className="grid h-40 place-items-center border border-dashed border-ink/20">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                No element selected
              </span>
            </div>
            <p className="max-w-sm text-sm leading-6 text-ink/75">
              Rest on an element. The others dim, and this note mounts for the one under the pointer.
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}

export function PeriodicGrid({ elements }: { elements: PracticeElement[] }) {
  return (
    <section id="index" className="border-t border-ink/10 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="text-copper">02</span>
            <span className="mx-2">/</span>
            Index of the practice
          </p>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] tracking-[-0.03em]">
            A table of the rules the work actually follows.
          </h2>
          <ul
            className="periodic mt-12 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3 lg:grid-cols-6"
            onMouseLeave={() => useGridStore.getState().setActive(null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                useGridStore.getState().setActive(null)
              }
            }}
          >
            {elements.map((element) => (
              <li key={element.id}>
                <button
                  type="button"
                  className="cell group flex h-full min-h-28 w-full flex-col justify-between p-3 text-left"
                  data-cursor="view"
                  aria-controls="practice-note"
                  onMouseEnter={() => useGridStore.getState().setActive(element.id)}
                  onFocus={() => useGridStore.getState().setActive(element.id)}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-copper group-hover:text-signal group-focus-visible:text-signal">
                    {element.number}
                  </span>
                  <span className="font-display text-4xl leading-none tracking-tight">{element.symbol}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{element.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Inspector elements={elements} />
      </div>
    </section>
  )
}
