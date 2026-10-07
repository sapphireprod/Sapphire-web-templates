import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6">
      <div className="max-w-md">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-copper">404</p>
        <h1 className="mt-4 font-display text-6xl tracking-[-0.04em]">This page is not on the route.</h1>
        <p className="mt-4 text-sm leading-6 text-ink/75">
          The address does not match a section of this portfolio.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to the index</Link>
        </Button>
      </div>
    </main>
  )
}
