import { describe, it, expect, beforeEach } from 'bun:test'
import { useCounterStore } from '../store'

// Reset store state before each test
beforeEach(() => {
  useCounterStore.setState({ count: 0 })
})

describe('useCounterStore', () => {
  it('increments and resets the counter', () => {
    expect(useCounterStore.getState().count).toBe(0)
    useCounterStore.getState().increment()
    expect(useCounterStore.getState().count).toBe(1)
    useCounterStore.getState().decrement()
    expect(useCounterStore.getState().count).toBe(0)
    useCounterStore.getState().increment()
    useCounterStore.getState().increment()
    expect(useCounterStore.getState().count).toBe(2)
    useCounterStore.getState().reset()
    expect(useCounterStore.getState().count).toBe(0)
  })
})
