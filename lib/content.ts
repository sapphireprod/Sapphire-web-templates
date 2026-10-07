export type Project = {
  id: string
  index: string
  title: string
  client: string
  place: string
  year: string
  summary: string
  role: string
  mark: "badge" | "rule" | "cues"
}

export type PracticeElement = {
  id: string
  symbol: string
  name: string
  number: string
  note: string
}

export type ReelFrame = {
  id: string
  index: string
  kicker: string
  title: string
  body: string
}

export type Station = {
  year: string
  place: string
  title: string
  body: string
}

export const projects: Project[] = [
  {
    id: "helix",
    index: "01",
    title: "Helix",
    client: "North Atlas Imaging",
    place: "Hamburg",
    year: "2021–2024",
    summary:
      "A cryo-EM console where distance from center is defocus and a detent is dose. The joystick and the dose slider no longer fight.",
    role: "Interface lead",
    mark: "badge",
  },
  {
    id: "kite",
    index: "02",
    title: "Kite",
    client: "Cadence Press",
    place: "Porto",
    year: "2024",
    summary:
      "A reading system for essays past eight thousand words. The margin rule draws with the piece. Footnotes open without pushing the column.",
    role: "Design engineer",
    mark: "rule",
  },
  {
    id: "lumen",
    index: "03",
    title: "Lumen",
    client: "House of Quiet",
    place: "Lisbon",
    year: "2025",
    summary:
      "A lighting desk for a ninety-seat room in Alfama. The cue list scrubs like tape. The stage plot tilts so a bar can be identified by hand.",
    role: "Solo",
    mark: "cues",
  },
]

export const elements: PracticeElement[] = [
  {
    id: "mo",
    symbol: "Mo",
    name: "Motion",
    number: "01",
    note: "If it changes every frame, it is transform or opacity. Layout is not a motion channel.",
  },
  {
    id: "st",
    symbol: "St",
    name: "State",
    number: "02",
    note: "One store holds the element under the pointer. The table itself dims in CSS.",
  },
  {
    id: "in",
    symbol: "In",
    name: "Input",
    number: "03",
    note: "Pointer position lives in a ref. It is sampled once per frame and never written to React state.",
  },
  {
    id: "sc",
    symbol: "Sc",
    name: "Scroll",
    number: "04",
    note: "Lenis owns inertia. ScrollTrigger owns pins. The ticker drives both so they share a clock.",
  },
  {
    id: "pn",
    symbol: "Pn",
    name: "Pin",
    number: "05",
    note: "A vertical gesture can hold a section still and translate a row along X.",
  },
  {
    id: "dr",
    symbol: "Dr",
    name: "Draw",
    number: "06",
    note: "A stroke’s length is a scroll progress bar. DrawSVG maps progress onto the path.",
  },
  {
    id: "ty",
    symbol: "Ty",
    name: "Type",
    number: "07",
    note: "Display type is server rendered. The motion layer does not own the sentences.",
  },
  {
    id: "gd",
    symbol: "Gd",
    name: "Grid",
    number: "08",
    note: "Hover is a parent state. Siblings fall back. One floating asset mounts for the group.",
  },
  {
    id: "dp",
    symbol: "Dp",
    name: "Depth",
    number: "09",
    note: "rotateX and rotateY are calculated from the node’s own rectangle, then written with GSAP.",
  },
  {
    id: "rf",
    symbol: "Rf",
    name: "Refs",
    number: "10",
    note: "A value that updates every frame does not go through setState. The DOM node is the store.",
  },
  {
    id: "la",
    symbol: "La",
    name: "Latency",
    number: "11",
    note: "The cursor uses quickTo. React is not in the path between the pointer and the pixels.",
  },
  {
    id: "pc",
    symbol: "Pc",
    name: "Pace",
    number: "12",
    note: "Scroll-linked motion uses scrub. A duration would lie about where you are in the page.",
  },
  {
    id: "ob",
    symbol: "Ob",
    name: "Observe",
    number: "13",
    note: "Resize refreshes ScrollTrigger. It does not remount the page.",
  },
  {
    id: "ax",
    symbol: "Ax",
    name: "Access",
    number: "14",
    note: "Reduced motion is a finished vertical layout, not a broken horizontal one.",
  },
  {
    id: "lb",
    symbol: "Lb",
    name: "Lab",
    number: "15",
    note: "Instrument interfaces for people who cannot look away from the work.",
  },
  {
    id: "ed",
    symbol: "Ed",
    name: "Edit",
    number: "16",
    note: "Reading systems that do not reflow under the thumb mid-gesture.",
  },
  {
    id: "mp",
    symbol: "Mp",
    name: "Map",
    number: "17",
    note: "Spatial data wants to be read side by side. Meridian is five shorelines, not five modals.",
  },
  {
    id: "qt",
    symbol: "Qt",
    name: "Quiet",
    number: "18",
    note: "The interface gets out of the way. Frame rate is part of that courtesy.",
  },
]

export const frames: ReelFrame[] = [
  {
    id: "helix-focus",
    index: "01",
    kicker: "Helix · Hamburg",
    title: "One spatial instrument",
    body: "Operators were missing focus because the dose slider and the stage joystick competed for the same hand. On Helix, distance from the center of the pad is defocus. A physical detent in the software is dose. The two decisions no longer share a widget.",
  },
  {
    id: "helix-quarter",
    index: "02",
    kicker: "Helix · First quarter",
    title: "Fewer mis-taps on dose",
    body: "North Atlas put the console on a microscope used every weekday. Mis-taps on the dose control fell 38 percent in the first quarter. The team was four people. Elena led the interface and sat with operators through the night shifts that produce the actual sessions.",
  },
  {
    id: "kite-margin",
    index: "03",
    kicker: "Kite · Porto",
    title: "A rule that reads with you",
    body: "Cadence Press needed essays longer than eight thousand words to feel continuous. Kite draws a margin rule with scroll progress and opens footnotes beside the column. The measure never changes while a thumb is down.",
  },
  {
    id: "meridian",
    index: "04",
    kicker: "Meridian · Rotterdam",
    title: "Five shorelines, one gesture",
    body: "Coastal Exchange asked for a revision of Meridian in 2025. Five sea-level ensembles for the Scheldt sit in a row. Vertical scroll pins the chapter and translates the row, which is the same machine as this reel. The data wanted to be compared, not stacked.",
  },
  {
    id: "lumen-cue",
    index: "05",
    kicker: "Lumen · Lisbon",
    title: "The bar under the hand",
    body: "House of Quiet borrowed a tablet app the board operator disliked. Lumen is a cue list that scrubs, and a stage plot that tilts with the pointer so the electrician can see which bar they are about to touch. Ninety seats, one booth, Alfama.",
  },
]

export const stations: Station[] = [
  {
    year: "2016",
    place: "Porto",
    title: "Oficina Lenta",
    body: "Apprentice. Wayfinding for the Campanhã market hall, and a great deal of paper. Learned to draw a line that someone can follow while walking.",
  },
  {
    year: "2018",
    place: "Lisbon",
    title: "Harbor Office",
    body: "Operations screens for the Tagus ferry pilots. Gloved hands, noon sun on the glass, and no patience for a control that moves after you have already pressed it.",
  },
  {
    year: "2021",
    place: "Hamburg",
    title: "North Atlas Imaging",
    body: "Interface lead. Helix begins as a console for a cryo-electron microscope and becomes the four-year center of the work.",
  },
  {
    year: "2024",
    place: "Porto, then Lisbon",
    title: "Cadence Press",
    body: "Kite, eleven weeks, for a publisher that still believes in essays. The studio opens in Lisbon the same autumn.",
  },
  {
    year: "2025",
    place: "Lisbon",
    title: "House of Quiet",
    body: "Lumen, for a ninety-seat room in Alfama. The same year, a revision of Meridian for Coastal Exchange in Rotterdam.",
  },
  {
    year: "2026",
    place: "Lisbon",
    title: "Orbit, with IST",
    body: "One day a week with the CubeSat group at Instituto Superior Técnico. The rest of the year is open for a single instrument project.",
  },
]
