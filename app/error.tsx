"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="grid min-h-[100svh] place-items-center px-6">
      <div className="max-w-md">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-copper">Error</p>
        <h1 className="mt-4 font-display text-5xl tracking-[-0.04em]">The page failed to render.</h1>
        <p className="mt-4 text-sm leading-6 text-ink/75">
          Nothing was lost. Try the render again, or return once the dev server has settled.
        </p>
        <Button type="button" className="mt-8" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </main>
  )
}
