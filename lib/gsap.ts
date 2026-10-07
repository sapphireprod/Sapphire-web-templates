"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP)
  gsap.ticker.lagSmoothing(0)
}

export { DrawSVGPlugin, gsap, ScrollTrigger, useGSAP }
