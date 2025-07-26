import { describe, it, expect, beforeEach } from 'bun:test'
import { useGameStore } from '../store'

// Reset store state before each test
beforeEach(() => {
  useGameStore.setState({ scene: '', score: 0, inventory: [] })
})

describe('useGameStore', () => {
  it('handles scene, inventory and score updates', () => {
    expect(useGameStore.getState().scene).toBe('')
    expect(useGameStore.getState().score).toBe(0)
    expect(useGameStore.getState().inventory).toHaveLength(0)

    useGameStore.getState().setScene('intro')
    expect(useGameStore.getState().scene).toBe('intro')

    useGameStore.getState().incrementScore()
    useGameStore.getState().incrementScore(4)
    expect(useGameStore.getState().score).toBe(5)

    useGameStore.getState().addItem('key')
    expect(useGameStore.getState().inventory).toContain('key')

    useGameStore.getState().removeItem('key')
    expect(useGameStore.getState().inventory).toHaveLength(0)

    useGameStore.getState().reset()
    expect(useGameStore.getState().scene).toBe('')
    expect(useGameStore.getState().score).toBe(0)
    expect(useGameStore.getState().inventory).toHaveLength(0)
  })
})
