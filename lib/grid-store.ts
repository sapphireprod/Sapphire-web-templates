"use client"

import { create } from "zustand"

type GridState = {
  activeId: string | null
  setActive: (id: string | null) => void
}

/**
 * Discrete hover identity only. Pointer coordinates never enter this store.
 * Cells call getState() so they do not subscribe, and only the inspector re-renders.
 */
export const useGridStore = create<GridState>((set) => ({
  activeId: null,
  setActive: (activeId) => set({ activeId }),
}))
