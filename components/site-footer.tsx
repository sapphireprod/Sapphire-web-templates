import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-ink/10 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div data-cursor="reveal">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="text-copper">05</span>
            <span className="mx-2">/</span>
            Contact
          </p>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.04em]">
            One instrument.
            <br />
            Late 2026.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-ink/75">
            Elena Voss works from Lisbon with labs and small product teams. Write with the object, the person who uses it, and the hour of the day they use it.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <Button asChild size="lg">
            <a href="mailto:elena@voss.studio">Write to Elena</a>
          </Button>
          <a
            href="mailto:elena@voss.studio"
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink/80 underline decoration-ink/25 underline-offset-4"
          >
            elena@voss.studio
          </a>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Lisbon · UTC+0</p>
        </div>
      </div>
    </footer>
  )
}
