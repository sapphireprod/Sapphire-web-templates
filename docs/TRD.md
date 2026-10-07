# Technical requirements

These rules are enforced by the components in this repository. Variation blueprints in `docs/VARIATIONS.md` reuse the same functions and change only DOM structure, grid tracks, and copy.

GSAP 3 includes ScrollTrigger and DrawSVG as free plugins. Lenis is constructed with `autoRaf: false` and advanced from `gsap.ticker`, so scroll and tweens share one clock. `gsap.ticker.lagSmoothing(0)` stays on, or Lenis and ScrollTrigger drift apart.

## 1. Parallax hero engine

**Rule.** Pointer coordinates are not React state. A `pointermove` listener writes a normalized pair into a plain object. The GSAP ticker consumes that pair at most once per frame and calls `quickTo`, which writes `x` and `y`. Those map to `translate3d`. The layer is taken out of flow (`position: absolute`) before it is translated, so the write cannot change layout.

**Normalization.**

```
nx = clientX / viewportWidth  - 0.5
ny = clientY / viewportHeight - 0.5
x  = nx * depth * 48
y  = ny * depth * 48
```

`depth` is read from `data-depth` on each layer. The core is `1.05`. The ring is `0.42`. The caption is `-0.7` so it travels the other way. Depth `0` is refused by skipping the node.

**Ticker gate.** `pointermove` only sets a `queued` flag. The ticker returns immediately when the flag is clear. That is the throttle. Do not also debounce with `setTimeout`; the ticker is the frame clock.

**Coarse pointers.** When `(pointer: fine)` does not match, skip the pointer map. A scrubbed `y` on the core, tied to the hero leaving the viewport, is the fallback. Do not run both writers on `y`.

**Server boundary.** Sentences live in `HeroCopy`, a Server Component passed as `children`. The client stage must not import `lib/content.ts`.

## 2. 3D tilt physics

**Rule.** Use a ref and GSAP. Do not use VanillaTilt’s own loop and do not mirror rotation into `useState`.

On `pointermove`, for mouse and pen only:

```
rect = element.getBoundingClientRect()
px = (clientX - rect.left) / rect.width
py = (clientY - rect.top)  / rect.height
rotateY = (px - 0.5) * 18
rotateX = (0.5 - py) * 18
```

Write with one `gsap.to` per event, `overwrite: "auto"`, `transformPerspective: 900`, duration about `0.45`, ease `power2.out`. On leave, tween both angles back to `0`.

The scene element sets `perspective: 1100px`. The tilted element sets `transform-style: preserve-3d`. A child badge may set `translateZ(42px)` on its own transform. GSAP must not target that child, or it will clobber the Z lift.

The glare is a sibling overlay. GSAP animates its `opacity` only. The gradient center is set as a CSS background string from `px` and `py`. That is paint, not layout.

Touch and `prefers-reduced-motion: reduce` leave the card at rest.

## 3. Periodic table state machine

**Rule.** Sibling opacity is CSS. The floating asset is a store. Do not prop-drill the active id through the cells.

Opacity:

```css
.periodic:has(.cell:hover, .cell:focus-visible) .cell { opacity: 0.34; }
.periodic:has(.cell:hover) .cell:hover,
.periodic:has(.cell:focus-visible) .cell:focus-visible { opacity: 1; }
```

`opacity` is the only property this rule animates. Background and color may change on the hovered cell itself. Do not change grid tracks, borders that affect box size, or font size.

Store:

```ts
useGridStore.getState().setActive(id)   // from the cell, no subscription
useGridStore((s) => s.activeId)          // inspector only
```

Cells must call `getState()` so a selection does not re-render the table. The inspector is the only subscriber. It mounts the cluster image when `activeId` is non-null and unmounts it when the pointer or focus leaves the list. Switching from one id to another updates the note in place so the image is not decoded again.

`aria-live="polite"` wraps the note text. The empty state is a dashed frame and a sentence, present in the server HTML before any hover.

## 4. Virtual scroll hijack

**Rule.** Lenis scrolls the window vertically. ScrollTrigger pins one section and translates a flex row by `xPercent`. Do not set `overflow: hidden` on `body`. Do not animate `margin-left` or `left`.

The row is already horizontal in the server HTML: the section is `100svh`, the track is `n * 100%` wide, and each panel is `100/n %` of the track. That keeps the first paint the same shape as the pinned state. The effect only sets `overflow: hidden` and creates the tween. Reduced motion overrides those widths in CSS and the effect returns before the pin.

Then:

```ts
gsap.timeline({
  defaults: { ease: "none", duration: 1 },
  scrollTrigger: {
    trigger: section,
    pin: true,
    scrub: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    end: () => "+=" + section.offsetWidth * (n - 1),
  },
}).to(track, { xPercent: -100 * (n - 1) / n }, 0)
```

GSAP `xPercent` is a percentage of the element being tweened. The track is `n` viewports wide and must travel `n - 1` viewports, which is `-(n - 1) / n * 100` percent of the track. For two panels that value is `-50`. A literal `-100` would move the track by its own full width and hide the last panel. The requirement’s `xPercent: -100` describes the travel of one viewport-sized panel, not the travel of the whole row.

The per-panel form used in GSAP’s own demo is different because each panel’s own width is one viewport:

```ts
gsap.to(panels, { xPercent: -100 * (n - 1), ease: "none" })
```

This codebase tweens the flex row, so it uses the container formula. Both are the same pixels when every panel is one viewport wide.

A `scaleX` rule shares the timeline at position `0`. The corner index is written to `textContent` inside `onUpdate`. That node is a ref. It is not state.

Default CSS, before JavaScript and under reduced motion, is a vertical stack (`flex-direction: column`, auto height). The pin is an enhancement. Content is not trapped if the script fails.

Lenis integration, in the parent layout effect so it runs after the child ScrollTriggers exist:

```ts
const lenis = new Lenis({ autoRaf: false, lerp: 0.085 })
lenis.on("scroll", ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
ScrollTrigger.refresh()
```

## 5. Zero-latency cursor

**Rule.** No `useState` for coordinates. `quickTo` is the only writer.

The layers are `position: fixed; top: 0; left: 0`. GSAP `x` and `y` provide the translation. This is the compositor-safe form of absolute positioning. Animating the `top` and `left` properties themselves is forbidden: they miss the compositor and fail the frame-rate target in the PRD.

```ts
gsap.set(dot, { xPercent: -50, yPercent: -50 })
const xTo = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3.out" })
const yTo = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3.out" })
```

Three layers, three durations, so the ring lags the dot and the plate lags the ring. The plate is offset by `+28` and `+32` pixels so it does not sit under the pointer. Scale of the ring is a CSS transform on an inner element. GSAP must not also tween that inner element’s transform.

Mode comes from event delegation. `pointerover` reads the closest `[data-cursor]` value (`default`, `view`, `reveal`) and sets `data-mode` on the cursor root. CSS shows the practice plate only for `reveal`. The root is `aria-hidden` and `pointer-events: none`.

The cursor mounts only for `(pointer: fine)` and `prefers-reduced-motion: no-preference`. The `has-cursor` class on `html` hides the native cursor. It is removed on cleanup.

A boolean `enabled` flag is allowed in React state because it changes once per session, not once per frame.

## 6. Scroll-bound SVG stroke

**Rule.** One path. Total length comes from DrawSVG, not from a hand-copied pixel value. Scroll progress maps onto that length with `scrub: true`. There is no duration.

```ts
gsap.set(path, { drawSVG: "0%" })
gsap.to(path, {
  drawSVG: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: section,
    start: "top 72%",
    end: "bottom 60%",
    scrub: true,
  },
})
```

DrawSVG sets `stroke-dasharray` and `stroke-dashoffset` from `getTotalLength()` (exposed as `DrawSVGPlugin.getLength`). Do not duplicate that math unless the plugin fails to register.

A second, non-animated path with the same `d` is drawn underneath at low opacity. That is the empty state. Under reduced motion the animated path is set to `drawSVG: "100%"` and left there.

The path uses `vector-effect: non-scaling-stroke` and `preserveAspectRatio="none"` so the route stretches with the station list without thickening. Station text is HTML, not SVG text, so it remains selectable and translatable.

## 7. Registration and cleanup

Client modules import `@/lib/gsap`, which registers ScrollTrigger, DrawSVG, and `useGSAP` only when `window` is defined. Animations are created inside `useGSAP` so the context reverts on unmount. Listeners added by hand are removed in the returned cleanup.

Do not call `ScrollTrigger.normalizeScroll`. It fights Lenis.

## 8. Performance budget for new motion

A new effect is allowed only if all of these hold:

1. It writes `transform`, `opacity`, or an SVG stroke property.
2. It does not call `setState` on a frame or scroll callback.
3. It reads layout (`getBoundingClientRect`, `offsetWidth`) outside of a write loop, or once per event with the write deferred to GSAP.
4. It has a `prefers-reduced-motion` branch that still shows the content.
5. It lives in a client island and receives copy as props or children.
