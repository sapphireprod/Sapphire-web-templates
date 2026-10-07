export function HeroCopy() {
  return (
    <div className="flex h-full flex-col justify-between px-5 pt-28 pb-12 md:px-10 lg:px-14 lg:pt-32 lg:pb-14">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
          <span className="text-signal">Design engineer</span>
          <span className="mx-2 text-white/30">/</span>
          Lisbon
        </p>
        <h1 className="mt-6 font-display text-[clamp(4.5rem,12vw,8.4rem)] leading-[0.84] tracking-[-0.045em]">
          Elena
          <br />
          Voss
        </h1>
        <p className="mt-8 max-w-md text-lg leading-8 text-paper/80">
          I build the motion layer of instruments, maps, and long reading. The
          work has to stay at frame rate while someone is doing something else
          that matters.
        </p>
      </div>
      <div className="mt-16 flex items-end justify-between gap-6">
        <p className="max-w-xs font-mono text-[11px] uppercase leading-5 tracking-[0.16em] text-mist">
          Booking one instrument project for late 2026
        </p>
        <p className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-mist sm:flex">
          <span className="scroll-mark" aria-hidden="true" />
          Scroll
        </p>
      </div>
    </div>
  )
}
