import { useGameStore } from '../store'
import { describe, it, expect, beforeEach } from 'bun:test'

// Reset store state before each test
beforeEach(() => {
  useGameStore.setState({ gameData: {} })
})

describe('useGameStore', () => {
  it('merges partial game data and resets state', () => {
    expect(useGameStore.getState().gameData).toEqual({})

    useGameStore.getState().setGameData({ health: 100 })
    expect(useGameStore.getState().gameData).toEqual({ health: 100 })

    useGameStore.getState().setGameData({ mana: 50 })
    expect(useGameStore.getState().gameData).toEqual({ health: 100, mana: 50 })

    useGameStore.getState().reset()
    expect(useGameStore.getState().gameData).toEqual({})
  })
})
