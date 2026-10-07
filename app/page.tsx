import { CareerRoute } from "@/components/career-route"
import { CursorTracker } from "@/components/cursor-tracker"
import { HeroCopy } from "@/components/hero-copy"
import { HorizontalReel } from "@/components/horizontal-reel"
import { Intro } from "@/components/intro"
import { MotionRoot } from "@/components/motion-root"
import { ParallaxHero } from "@/components/parallax-hero"
import { PeriodicGrid } from "@/components/periodic-grid"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { WorkSection } from "@/components/work-section"
import { elements, frames, stations } from "@/lib/content"

export default function Home() {
  return (
    <MotionRoot>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:bg-signal focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <CursorTracker />
      <SiteHeader />
      <main id="main">
        <ParallaxHero>
          <HeroCopy />
        </ParallaxHero>
        <Intro />
        <WorkSection />
        <PeriodicGrid elements={elements} />
        <HorizontalReel frames={frames} />
        <CareerRoute stations={stations} />
      </main>
      <SiteFooter />
    </MotionRoot>
  )
}
