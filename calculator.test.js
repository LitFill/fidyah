import { describe, it, expect } from 'vitest'
import { calculateFidyah } from './calculator.js'

describe('Fidyah Calculation Logic', () => {
  describe('Linear Method (default)', () => {
    it('should calculate basic fidyah correctly: 0 years = 0 mudds', () => {
      const result = calculateFidyah({ daysMissed: 10, yearsElapsed: 0 })
      expect(result.totalMudds).toBe(0) // 10 * 0 = 0
      expect(result.method).toBe('linear')
    })

    it('should return 0 mudds if 0 days missed', () => {
      const result = calculateFidyah({ daysMissed: 0, yearsElapsed: 0 })
      expect(result.totalMudds).toBe(0)
    })

    it('should return 0 mudds if days missed is negative', () => {
      const result = calculateFidyah({ daysMissed: -1, yearsElapsed: 0 })
      expect(result.totalMudds).toBe(0)
    })

    it('should calculate linear: 1 year elapsed = D × 1 mudds', () => {
      const result = calculateFidyah({ daysMissed: 10, yearsElapsed: 1 })
      expect(result.totalMudds).toBe(10) // 10 * 1 = 10
    })

    it('should calculate linear: 2 years elapsed = D × 2 mudds', () => {
      const result = calculateFidyah({ daysMissed: 10, yearsElapsed: 2 })
      expect(result.totalMudds).toBe(20) // 10 * 2 = 20
    })

    it('should calculate linear: 3 years elapsed = D × 3 mudds', () => {
      const result = calculateFidyah({ daysMissed: 5, yearsElapsed: 3 })
      expect(result.totalMudds).toBe(15) // 5 * 3 = 15
    })
  })

  describe('Exponential Method', () => {
    it('should calculate exponential fidyah: 0 years = 1x multiplier', () => {
      const result = calculateFidyah({ daysMissed: 10, yearsElapsed: 0, method: 'exponential' })
      expect(result.totalMudds).toBe(10) // 10 * 1 = 10
      expect(result.method).toBe('exponential')
    })

    it('should calculate exponential fidyah: 1 year = 1x multiplier', () => {
      const result = calculateFidyah({ daysMissed: 10, yearsElapsed: 1, method: 'exponential' })
      expect(result.totalMudds).toBe(10) // 10 * 1 = 10
    })

    it('should calculate exponential fidyah: 2 years = 2x multiplier', () => {
      const result = calculateFidyah({ daysMissed: 10, yearsElapsed: 2, method: 'exponential' })
      expect(result.totalMudds).toBe(20) // 10 * 2^(2-1) = 10 * 2 = 20
    })

    it('should calculate exponential fidyah: 3 years = 4x multiplier', () => {
      const result = calculateFidyah({ daysMissed: 5, yearsElapsed: 3, method: 'exponential' })
      expect(result.totalMudds).toBe(20) // 5 * 2^(3-1) = 5 * 4 = 20
    })

    it('should calculate exponential fidyah: 4 years = 8x multiplier', () => {
      const result = calculateFidyah({ daysMissed: 3, yearsElapsed: 4, method: 'exponential' })
      expect(result.totalMudds).toBe(24) // 3 * 2^(4-1) = 3 * 8 = 24
    })
  })

  describe('Weight Conversion', () => {
    it('should convert mudds to kg correctly with 1 year elapsed', () => {
      const result = calculateFidyah({ daysMissed: 1, yearsElapsed: 1, muddToKg: 0.75 })
      expect(result.totalWeightKg).toBe(0.75) // 1 mudd * 0.75
    })

    it('should convert mudds to kg correctly with 2 years elapsed', () => {
      const result = calculateFidyah({ daysMissed: 4, yearsElapsed: 2, muddToKg: 0.675 })
      expect(result.totalWeightKg).toBe(5.4) // 8 mudds * 0.675 = 5.4
    })

    it('should convert mudds to kg correctly with exponential method', () => {
      const result = calculateFidyah({ daysMissed: 5, yearsElapsed: 3, muddToKg: 0.8, method: 'exponential' })
      expect(result.totalWeightKg).toBe(16) // 20 mudds * 0.8 = 16
    })
  })

  describe('Cost Estimation', () => {
    it('should calculate total cost correctly with 0 years', () => {
      const result = calculateFidyah({ daysMissed: 1, yearsElapsed: 0, muddToKg: 0.75, pricePerKg: 15000 })
      expect(result.totalCost).toBe(0) // 0 * 0.75 * 15000 = 0
    })

    it('should calculate total cost for 1 year elapsed', () => {
      // 10 days, 1 year elapsed -> 10 mudds. 10 * 0.75 = 7.5kg. 7.5 * 15000 = 112500
      const result = calculateFidyah({ daysMissed: 10, yearsElapsed: 1, muddToKg: 0.75, pricePerKg: 15000 })
      expect(result.totalCost).toBe(112500)
    })
  })
})
