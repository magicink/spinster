import { produce } from 'immer'
import { create } from 'zustand'

export interface GameState<T = Record<string, unknown>> {
  /** Arbitrary game state */
  gameData: T
  /** Merge partial data into existing gameData */
  setGameData: (data: Partial<T>) => void
  /** Reset gameData to an empty object */
  reset: () => void
}

const initialState: Pick<GameState<Record<string, unknown>>, 'gameData'> = {
  gameData: {}
}

export const useGameStore = create<GameState<Record<string, unknown>>>(set => ({
  ...initialState,
  setGameData: data =>
    set(
      produce((state: GameState<Record<string, unknown>>) => {
        state.gameData = { ...state.gameData, ...data }
      })
    ),
  reset: () =>
    set(() => ({
      gameData: {}
    }))
}))
