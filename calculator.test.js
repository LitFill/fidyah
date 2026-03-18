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

  it('should calculate multi-year doubling correctly (1 year elapsed = 2 mudds per day)', () => {
    const result = calculateFidyah({ daysMissed: 1, yearsElapsed: 1 })
    expect(result.totalMudds).toBe(2)
  })

  it('should calculate multi-year doubling for multiple days and years', () => {
    // 10 days missed, 2 years elapsed -> 10 * (2 + 1) = 30 mudds
    const result = calculateFidyah({ daysMissed: 10, yearsElapsed: 2 })
    expect(result.totalMudds).toBe(30)
  })

  describe('Weight Conversion', () => {
    it('should convert mudds to kg correctly with default conversion (0.75)', () => {
      const result = calculateFidyah({ daysMissed: 1, yearsElapsed: 0, muddToKg: 0.75 })
      expect(result.totalWeightKg).toBe(0.75)
    })

    it('should convert mudds to kg correctly with 0.675 conversion', () => {
      const result = calculateFidyah({ daysMissed: 4, yearsElapsed: 0, muddToKg: 0.675 })
      expect(result.totalWeightKg).toBe(2.7)
    })

    it('should convert mudds to kg correctly with 0.8 conversion', () => {
      const result = calculateFidyah({ daysMissed: 5, yearsElapsed: 0, muddToKg: 0.8 })
      expect(result.totalWeightKg).toBe(4)
    })
  })
})
