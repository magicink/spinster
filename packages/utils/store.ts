import { produce } from 'immer'
import { create } from 'zustand'

export interface GameState<T = Record<string, unknown>> {
  /** Arbitrary game state */
  gameData: T
  /** Initialize gameData and remember the initial state */
  init: (data: T) => void
  /** Merge partial data into existing gameData */
  setGameData: (data: Partial<T>) => void
  /** Reset gameData to the initial state */
  reset: () => void
}

export const useGameStore = create<GameState<Record<string, unknown>>>(set => {
  let initialGameData: Record<string, unknown> = {}

  return {
    gameData: initialGameData,
    init: data =>
      set(() => {
        initialGameData = { ...data }
        return { gameData: { ...initialGameData } }
      }),
    setGameData: data =>
      set(
        produce((state: GameState<Record<string, unknown>>) => {
          state.gameData = { ...state.gameData, ...data }
        })
      ),
    reset: () =>
      set(() => ({
        gameData: { ...initialGameData }
      }))
  }
})
