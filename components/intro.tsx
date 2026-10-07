const facts = [
  { term: "Based", detail: "Lisbon" },
  { term: "Working since", detail: "2016" },
  { term: "Previously", detail: "Hamburg and Porto" },
  { term: "Now", detail: "One instrument project" },
]

const clients = [
  "North Atlas Imaging",
  "Cadence Press",
  "Coastal Exchange",
  "House of Quiet",
  "Harbor Office",
  "IST CubeSat",
]

export function Intro() {
  return (
    <section className="border-b border-ink/10 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1.4fr_0.8fr] lg:gap-20">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="text-copper">00</span>
            <span className="mx-2">/</span>
            Practice
          </p>
          <p className="mt-6 max-w-2xl font-display text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.15] tracking-[-0.03em]">
            People use these interfaces while they focus a microscope, call a
            cue, or finish an essay. The motion has to stay out of the way, and
            it has to stay on the compositor.
          </p>
        </div>
        <div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
            {facts.map((fact) => (
              <div key={fact.term}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {fact.term}
                </dt>
                <dd className="mt-2 text-lg">{fact.detail}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-10 flex flex-col gap-2 border-t border-ink/10 pt-6">
            {clients.map((client) => (
              <li key={client} className="text-sm text-ink/80">
                {client}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
