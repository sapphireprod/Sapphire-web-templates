# Elena Voss

A motion-heavy portfolio for Elena Voss, a fictional design engineer in Lisbon. The page is a Next.js App Router application. Scroll inertia comes from Lenis. Pins, tilt, the cursor, and the career stroke come from GSAP (ScrollTrigger and DrawSVG). Pointer coordinates never enter React state.

The biography, clients, and project metrics are invented and consistent across the page.

## Run

```bash
npm install
npm run dev -- -p 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run lint
npm run build
```

## What is on the page

- Parallax hero. Pointer position is sampled on the GSAP ticker and written with `quickTo` to `translate3d`.
- Three tilt cards. Rotation comes from the card’s own rectangle, via refs.
- A practice table. CSS `:has()` dims siblings. Zustand stores only the active id and mounts one floating asset.
- A pinned horizontal reel. Vertical scroll translates a flex row with `xPercent`.
- A career route. DrawSVG scrubs a stroke to scroll progress.
- A custom cursor. `quickTo` on `x` and `y`, anchored at `top: 0; left: 0`.

## Documents

- [Product requirements](docs/PRD.md)
- [Technical requirements](docs/TRD.md)
- [Asset generation](docs/ASSETS.md)
- [Ten architectural variations](docs/VARIATIONS.md)

Variation 01, Field Notes, is the interface this repository ships. The other nine are implementation blueprints on the same motion primitives.
