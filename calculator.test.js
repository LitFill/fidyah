import { describe, it, expect } from 'vitest'
import { calculateFidyah } from './calculator.js'

describe('Fidyah Calculation Logic', () => {
  it('should calculate basic fidyah correctly (1 day = 1 mudd)', () => {
    const result = calculateFidyah({ daysMissed: 1, yearsElapsed: 0 })
    expect(result.totalMudds).toBe(1)
  })

  it('should return 0 mudds if 0 days missed', () => {
    const result = calculateFidyah({ daysMissed: 0, yearsElapsed: 0 })
    expect(result.totalMudds).toBe(0)
  })

  it('should calculate multiple days correctly', () => {
    const result = calculateFidyah({ daysMissed: 10, yearsElapsed: 0 })
    expect(result.totalMudds).toBe(10)
  })

  it('should return 0 mudds if days missed is negative', () => {
    const result = calculateFidyah({ daysMissed: -1, yearsElapsed: 0 })
    expect(result.totalMudds).toBe(0)
  })
})
