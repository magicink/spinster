import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface GameState {
  /** Current passage or scene */
  scene: string
  /** Player score */
  score: number
  /** Items collected by the player */
  inventory: string[]
  setScene: (scene: string) => void
  incrementScore: (amount?: number) => void
  addItem: (item: string) => void
  removeItem: (item: string) => void
  reset: () => void
}

const initialState = {
  scene: '',
  score: 0,
  inventory: [] as string[]
}

export const useGameStore = create<GameState>()(
  immer(set => ({
    ...initialState,
    setScene: scene =>
      set(state => {
        state.scene = scene
      }),
    incrementScore: (amount = 1) =>
      set(state => {
        state.score += amount
      }),
    addItem: item =>
      set(state => {
        if (!state.inventory.includes(item)) state.inventory.push(item)
      }),
    removeItem: item =>
      set(state => {
        const index = state.inventory.indexOf(item)
        if (index !== -1) state.inventory.splice(index, 1)
      }),
    reset: () =>
      set(() => ({
        ...initialState
      }))
  }))
)
