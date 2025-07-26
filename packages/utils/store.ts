import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>()(
  immer(set => ({
    count: 0,
    increment: () =>
      set(state => {
        state.count++
      }),
    decrement: () =>
      set(state => {
        state.count--
      }),
    reset: () =>
      set(state => {
        state.count = 0
      })
  }))
)
