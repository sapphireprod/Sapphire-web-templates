import Image from "next/image"

import { TiltCard } from "@/components/tilt-card"
import { projects, type Project } from "@/lib/content"

function Mark({ project }: { project: Project }) {
  if (project.mark === "badge") {
    return (
      <div data-cursor="reveal" className="badge-lift flex h-40 items-center">
        <Image
          src="/assets/tilt-badge.png"
          alt="Glass identification badge reading Elena Voss, Design Engineer."
          width={1152}
          height={864}
          sizes="(min-width: 1024px) 240px, 70vw"
          className="h-auto w-[88%] select-none"
        />
      </div>
    )
  }

  if (project.mark === "rule") {
    return (
      <div className="flex h-40 items-end pb-6" aria-hidden="true">
        <div className="h-px w-full bg-ink/20" />
        <div className="ml-3 h-16 w-px bg-copper" />
      </div>
    )
  }

  return (
    <div className="flex h-40 flex-col justify-center gap-3" aria-hidden="true">
      <span className="h-px w-full bg-ink/15" />
      <span className="h-px w-4/5 bg-ink/40" />
      <span className="h-px w-2/3 bg-copper" />
    </div>
  )
}

export function WorkSection() {
  return (
    <section id="work" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="text-copper">01</span>
          <span className="mx-2">/</span>
          Selected work
        </p>
        <h2 className="mt-4 max-w-xl font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] tracking-[-0.03em]">
          Three pieces that had to be used for hours.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <TiltCard key={project.id}>
              <article className="flex h-full min-h-[460px] flex-col justify-between border border-ink/15 bg-paper p-5">
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    <span>{project.index}</span>
                    <span>{project.year}</span>
                  </div>
                  <Mark project={project} />
                  <h3 className="font-display text-5xl tracking-[-0.04em]">{project.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-ink/75">{project.summary}</p>
                </div>
                <p className="mt-8 font-mono text-[11px] uppercase leading-5 tracking-[0.14em] text-muted">
                  {project.role}
                  <span className="mt-1 block text-ink">{project.client}</span>
                  {project.place}
                </p>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
