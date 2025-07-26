import { produce } from 'immer'
import { create } from 'zustand'

export interface GameState {
  /** Arbitrary game state */
  gameData: Record<string, any>
  /** Merge partial data into existing gameData */
  setGameData: (data: Record<string, any>) => void
  /** Reset gameData to an empty object */
  reset: () => void
}

const initialState: Pick<GameState, 'gameData'> = {
  gameData: {}
}

export const useGameStore = create<GameState>(set => ({
  ...initialState,
  setGameData: data =>
    set(
      produce((state: GameState) => {
        state.gameData = { ...state.gameData, ...data }
      })
    ),
  reset: () =>
    set(() => ({
      gameData: {}
    }))
}))
