# Ten architectural variations

The motion code does not change. `MotionRoot`, `ParallaxHero`’s ticker and `quickTo`, `TiltCard`’s rectangle math, the Zustand id plus CSS `:has()` table, the ScrollTrigger pin with `xPercent: -100 * (n - 1) / n`, the cursor `quickTo`, and the DrawSVG scrub stay as specified in `docs/TRD.md`.

What changes is the DOM, the grid tracks, and the story those primitives tell. Variation 01 is the interface shipped in this repository.

Shared skeleton for every variation:

```tsx
<MotionRoot>
  <CursorTracker />
  <SiteHeader />
  <ParallaxHero>{/* server copy */}</ParallaxHero>
  <TiltCard>{/* server article */}</TiltCard>
  <PeriodicGrid elements={elements} />
  <HorizontalReel frames={frames} />
  <CareerRoute stations={stations} />
</MotionRoot>
```

`data-depth`, `data-cursor`, `data-reel-track`, and `data-route-stroke` stay. Only the elements wearing those hooks, and the CSS grid around them, are redesigned.

---

## 01 — Field Notes

**Concept.** Elena Voss’s monograph. Night plate, warm paper, a machined core. Shipped.

**Hero.** The core floats in the right half. A hairline ring moves less. A caption moves opposite. The name does not move, so the type stays sharp.

**Grid.** Eighteen rules of the practice (`Mo` through `Qt`) on six columns. The floating asset is the glass cluster plus a one-sentence note.

**Reel.** Five frames: Helix focus, Helix’s first quarter, Kite’s margin, Meridian’s five shorelines, Lumen’s cue.

**Stroke.** A stepped copper route from Porto in 2016 to Orbit in 2026.

## 02 — Cryo Lab

**Concept.** The Helix console as the whole page. A dark instrument bezel. Operators are the audience.

**Hero.** The core is the microscope column, center stage. `data-depth` layers are the three lens rings, each a different depth, so pointer movement reads as parallax inside the column. Copy is a single status line: session, dose, defocus.

**Grid.** CSS grid `repeat(8, 1fr)` with the first two tracks doubled (`span 2`) for dose and focus. Cells are sample slots, not essays. The floating asset is a diffraction thumbnail that mounts beside the slot under the pointer. Sibling slots drop to 0.34 opacity with the same `:has()` rule.

**Reel.** Pinned strip of six session plates: grid prep, load, focus, expose, unblank, notes. Each plate is one viewport. Same pin, same `xPercent` formula.

**Stroke.** The stroke is the beam path: gun, condenser, specimen, detector. Stations are those four optics, not years.

## 03 — Coastal Desk

**Concept.** Meridian, for Coastal Exchange. A wide, low, paper desk. Five shorelines want to be compared.

**Hero.** No object in the center. The hero subject is a horizon: three rules (`data-depth` 0.3, 0.7, 1.1) and a tide numeral that counters them. The generated core image is withheld; the parallax engine still runs on the rules.

**Grid.** A 5×4 tide table. Rows are return periods, columns are reaches of the Scheldt. Hovering a cell dims the rest and mounts a glass cluster used here as a water-level token, with the ensemble name in the inspector.

**Reel.** The reel *is* the product. Five ensembles side by side, one viewport each. The pin is the reading gesture the case study argues for.

**Stroke.** A river centerline. Stations are gauges, upstream to the estuary.

## 04 — Stage Electrics

**Concept.** Lumen, House of Quiet. Black booth, one warm practical.

**Hero.** The core hangs like a fixture, top-weighted. Pointer parallax is small (depth 0.4) so it feels heavy. The badge asset is the electrician’s tag, tilted on the hero rather than on a card.

**Grid.** A lighting plot: CSS grid of bars (`grid-template-rows: repeat(6, 48px)`), each cell a channel. The floating asset mounts as a gel swatch. Non-hovered channels dim. This is the same state machine as the periodic table, with row tracks fixed in pixels so the plot looks like a schedule.

**Reel.** Cue list as the horizontal strip: house to half, preset, blackout, bow, restore. Scrub is the cue gesture.

**Stroke.** A DMX run from booth to first electric to the grid. The line steps the way a cable run steps.

## 05 — Ferry Pilot

**Concept.** Harbor Office, 2018. Noon sun, large type, gloved-hand targets.

**Hero.** The core is a compass card. Parallax is limited to 8 pixels of depth-scaled travel so the instrument does not feel loose. Status copy is server-rendered: wind, tide, next sailing.

**Grid.** `repeat(4, 1fr)` of berths. Cells are tall (`min-height: 8rem`) because the historical UI was used with gloves. The floating note names the ferry on that berth. Opacity dim is unchanged.

**Reel.** One sailing, five legs, pinned: terminal, river, traffic lane, dock approach, lines. Horizontal travel is the passage.

**Stroke.** The Tagus from terminal to terminal. Stations are bridges and turns, not jobs.

## 06 — Press Room

**Concept.** Kite, Cadence Press. A reading room. Almost no chrome.

**Hero.** Type is the subject. The only parallax layers are a margin rule and a folio number. The core image is absent. Depths stay under 0.5 so text nearby is not dragged; the headline itself still has no `data-depth`.

**Grid.** A contents table, two columns on desktop (`1fr 2fr` via spanning), one on a phone. Entries are essays. The floating asset is the practice plate (asset 04) used as a printer’s proof, mounted when an essay is hovered.

**Reel.** The essay’s five sections, pinned, each a column of measure `34rem` inside a full-viewport panel. The hijack is the “long read” demo.

**Stroke.** The margin rule of the essay, full height of the route section, which here is the colophon and the printing history.

## 07 — Lens Bench

**Concept.** A calibration bench for a lens shop. Elena consulted; the page speaks as the bench UI.

**Hero.** The core is the lens under test, dead center. Three `data-depth` rings are the calibration targets. Pointer motion reads as the lens shifting against a fixed chart.

**Grid.** A 10×3 chart of focal lengths by aperture. Dense, monospaced, small cells. The inspector mounts the cluster as a “group under test” marker. Same store, same `:has()` dim, tighter `gap: 2px`.

**Reel.** Five calibration steps: mount, collimate, center, edge, sign-off. Pinned filmstrip.

**Stroke.** A modulation-transfer curve drawn as a single path. Scroll reveals the curve from the axis outward. Stations are spatial frequencies, labeled in HTML beside the path.

## 08 — CubeSat Wall

**Concept.** Orbit, with the IST student group. A wall of quiet numbers. One day a week.

**Hero.** The core is the satellite bus. Parallax depths are bus, antenna, and a tiny ground-track caption. Copy is downlink status, server-rendered so it is present before hydration.

**Grid.** Telemetry channels in `repeat(6, 1fr)`, each cell a subsystem (power, radio, attitude, payload, thermal, computer). The floating asset is the cluster, read as a “selected subsystem” model. Dimmed siblings are the unselected channels.

**Reel.** One orbit, five ground contacts. The pin turns a pass into a horizontal timeline. This is the variation where the reel’s progress rule is the only decoration.

**Stroke.** The ground track. Stations are cities of visibility. The path is smoother (fewer corners) than Field Notes, same DrawSVG tween.

## 09 — Type Foundry

**Concept.** A small foundry Elena advises. The page is a specimen.

**Hero.** A single enormous glyph is the parallax subject (`data-depth="1"` on the glyph, `0.25` on its outline duplicate). The photographic core is not used. The engine is identical.

**Grid.** A character map, `repeat(8, minmax(0, 1fr))`, cells square (`aspect-ratio: 1`). Hover dims the map and mounts a large setting of that character in the inspector, where the cluster image is replaced by the glyph at display size. The store still holds only an id. The inspector decides what to mount.

**Reel.** The specimen’s five settings: text, deck, display, italic, numerals. Pinned, one viewport each, same formula.

**Stroke.** A Bézier extracted from the letter ‘n’, scrubbed as the foundry’s “how the curve is drawn” note. Stations explain nodes, not biography.

## 10 — Conservation Archive

**Concept.** A paper archive Elena prototyped and did not ship. Included because the grid wants to be a catalogue.

**Hero.** The practice plate (asset 04) is the hero subject, top-down, slight pointer drift (depth 0.35). The core sits small, behind it, at depth 0.8, so two cutouts parallax against each other.

**Grid.** Shelf locations. `grid-template-columns: 80px repeat(5, 1fr)`. The first track is the aisle label and spans all rows (`grid-row: span 6`). Object cells dim together. The floating asset is the cluster, standing in for a crate that has no photograph yet. Empty cells are real buttons with the empty-state sentence in the inspector, not holes in the grid.

**Reel.** Five crates in a shipment, pinned left to right: textiles, paper, glass, metal, photographs. The horizontal hijack is the loading dock.

**Stroke.** The aisle walked during intake. Stations are shelf ranges. DrawSVG progress is how far the archivist has walked.

---

## What must not change between variations

- No `useState` for pointer or scroll values.
- No animation of `top`, `left`, width, or grid template during a gesture. Grid templates differ by variation, but they are static CSS.
- Lenis stays on the GSAP ticker with `autoRaf: false`.
- The floating asset has one subscriber, the inspector.
- Reduced motion still renders every sentence, unpinned, in document order.
