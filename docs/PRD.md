# Product requirements

Portfolio for Elena Voss, design engineer, Lisbon. One page. The engineering target is a motion system that stays on the compositor while the copy stays in Server Components.

## 1. Person and narrative

Elena Voss designs interfaces for people who are doing something else that matters: focusing a microscope, calling a lighting cue, reading an essay to the end. She trained in Porto, built ferry screens in Lisbon, led the Helix console at North Atlas Imaging in Hamburg, and now works independently from Lisbon.

The page is a monograph, not a theme park. Night for the hero and the reel. Warm paper for the reading sections. One signal color. The biography is fictional and must stay internally consistent.

## 2. User flow

1. Land on the hero. The name is readable immediately. The machined core sits in the right half and shifts with the pointer. No layout change occurs while it moves.
2. Scroll. Lenis adds inertia. The fixed header turns solid after the hero threshold, by a class toggle, not by re-rendering the tree.
3. Read the practice statement and the facts.
4. Move across three project cards. Each card tilts from its own rectangle. The glass badge on Helix lifts on the Z axis. Hovering the badge reveals the practice plate at the cursor.
5. Enter the practice table. Hovering or focusing an element dims its siblings and mounts a single floating note with the glass cluster. Leaving the table unmounts that note.
6. Enter the reel. The section pins. Vertical scroll translates five frames horizontally. A signal rule tracks progress. The corner index updates from the scroll callback, not from React state.
7. Continue into the route. A copper stroke draws through six stations from 2016 to 2026, locked to scroll position.
8. Reach contact. Write to `elena@voss.studio`. The practice plate can be revealed here as well.

Keyboard users can tab the header, the cards, the table, and the contact link. A skip link targets `#main`. Touch users do not get the custom cursor or the tilt. Reduced-motion users get the reel as a vertical stack and a fully drawn route.

## 3. Component architecture

The `"use client"` boundary is the motion island, not the paragraph.

| Module | Runtime | Owns |
| --- | --- | --- |
| `app/layout.tsx` | Server | Fonts, metadata, global CSS |
| `app/page.tsx` | Server | Composes islands and passes serializable content |
| `components/hero-copy.tsx` | Server | Hero sentences, passed as children into the parallax stage |
| `components/intro.tsx` | Server | Practice statement, facts, clients |
| `components/work-section.tsx` | Server | Project articles. Imports the client tilt wrapper |
| `components/site-footer.tsx` | Server | Contact copy. The button is a small client island |
| `components/motion-root.tsx` | Client | Lenis, ticker, anchor scrolling |
| `components/cursor-tracker.tsx` | Client | Cursor layers |
| `components/parallax-hero.tsx` | Client | Pointer parallax stage. Server children slot in untouched |
| `components/tilt-card.tsx` | Client | Pointer rotation wrapper |
| `components/site-header.tsx` | Client | Solid-state class via ScrollTrigger |
| `components/periodic-grid.tsx` | Client | Table behavior and the floating note |
| `components/horizontal-reel.tsx` | Client | Pin and horizontal translation |
| `components/career-route.tsx` | Client | DrawSVG scrub |
| `components/ui/button.tsx` | Client | shadcn button primitive |
| `lib/content.ts` | Shared data | Imported by Server Components and passed down as props |
| `lib/grid-store.ts` | Client | Active element id only |

Server Components must not import `gsap`, `lenis`, or the grid store. Client islands receive strings and arrays, never functions.

The hero demonstrates the boundary directly: `page.tsx` renders `<ParallaxHero><HeroCopy /></ParallaxHero>`. `HeroCopy` has no `"use client"` and is not part of the motion module graph.

## 4. Interaction state flow

```
pointermove
  → write {x, y} into a ref or straight into quickTo
  → GSAP ticker (hero) or quickTo (cursor, tilt)
  → transform on a layer that is already position: fixed or absolute
  → compositor

pointerenter on a table cell
  → zustand setActive(id)           // one discrete update
  → inspector re-renders             // the cells do not subscribe
  → CSS :has() dims siblings         // no React render for opacity

scroll
  → Lenis raf on the GSAP ticker
  → ScrollTrigger.update
  → pin / xPercent / drawSVG
  → compositor (transform, stroke)
```

Forbidden in the hot path:

- `useState` for pointer coordinates
- `useState` for scroll progress
- animating `top`, `left`, `width`, `height`, `margin`, or grid tracks
- prop-drilling the active cell through every sibling

Opacity on the table is allowed because it is a CSS transition on a compositor property, triggered by `:hover` and `:focus-visible`, not by a render.

## 5. States

| Surface | Empty | Loading | Error |
| --- | --- | --- | --- |
| Practice table | “No element selected”, dashed frame, instruction | Cluster image is reserved space once selected | The route `error.tsx` offers a retry |
| Career route | A faint full path is the undrawn route | Stroke starts at 0% before paint | Same route error boundary |
| Unknown URL | `not-found.tsx` returns to the index | — | — |
| Hero image | Night field remains if the image is slow | `priority` on the core only | `alt` text remains |

Reduced motion is a designed state, not an error. The reel is a column. The stroke is drawn. The cursor is the system cursor.

## 6. Target metrics

Measured on a desktop navigation of the production build, with the devtools CPU at no extra throttle beyond a typical laptop.

| Metric | Target | How the build pursues it |
| --- | --- | --- |
| Lighthouse Performance | ≥ 90 | Server-rendered copy, one priority image, no coordinate state |
| Lighthouse Accessibility | ≥ 95 | Skip link, focus rings, live region on the note, button names |
| Frame rate during hero, tilt, reel, and draw | 60 fps | `transform` and `opacity` only, plus SVG stroke dash |
| Main-thread blocking during pointer move | No React render | Refs, `quickTo`, ticker sampling |
| Layout thrash during tilt | None | Read `getBoundingClientRect` once per event, write transforms inside GSAP |
| Cumulative layout shift | < 0.1 | Image width and height reserved, hero stage is absolute |
| Motion preference | Honored | `prefers-reduced-motion` skips Lenis smoothing, pin, tilt, and cursor |

Lighthouse on a machine under load can miss 90. The structural requirements above are the acceptance criteria when a lab score is noisy: no layout-property animation, no per-frame React render, and a reduced-motion path that still contains every sentence.

## 7. Out of scope

Accounts, a CMS, a contact form backend, and the other nine visual variations. Those variations are specified in `docs/VARIATIONS.md` and reuse this motion code unchanged.
