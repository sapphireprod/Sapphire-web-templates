"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  ;(window as Window & { gsap: typeof gsap }).gsap = gsap
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP)
  gsap.ticker.lagSmoothing(0)
}

export { DrawSVGPlugin, gsap, ScrollTrigger, useGSAP }
