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

interface InternalState<T> extends GameState<T> {
  /** Internal storage for the initial state */
  _initialGameData: T
}

export const useGameStore = create<InternalState<Record<string, unknown>>>(
  set => ({
    gameData: {},
    _initialGameData: {},
    init: data =>
      set(() => ({
        gameData: { ...data },
        _initialGameData: { ...data }
      })),
    setGameData: data =>
      set(
        produce((state: InternalState<Record<string, unknown>>) => {
          state.gameData = { ...state.gameData, ...data }
        })
      ),
    reset: () =>
      set(state => ({
        gameData: { ...state._initialGameData }
      }))
  })
)
