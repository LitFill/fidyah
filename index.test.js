import { describe, it, expect, beforeEach } from 'vitest'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import { initApp } from './ui.js'

describe('index.html structure', () => {
  let dom
  let document

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8')
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    document = dom.window.document
    global.document = document
    global.window = dom.window
    global.localStorage = {
      getItem: () => null,
      setItem: () => {}
    }
    initApp()
  })

  it('should have a lang attribute set to "id"', () => {
    expect(document.documentElement.getAttribute('lang')).toBe('id')
  })

  it('should include the Tailwind CDN script', () => {
    const scripts = Array.from(document.querySelectorAll('script'))
    const hasTailwind = scripts.some(script => 
      script.getAttribute('src')?.includes('cdn.tailwindcss.com')
    )
    expect(hasTailwind).toBe(true)
  })

  it('should have a title containing "Fidyah"', () => {
    expect(document.title).toContain('Fidyah')
  })

  describe('Calculator Layout', () => {
    it('should have an input for "Days Missed"', () => {
      const input = document.getElementById('days-missed')
      expect(input).not.toBeNull()
      expect(input.tagName).toBe('INPUT')
      expect(input.type).toBe('number')
    })

    it('should have an input for "Years Elapsed"', () => {
      const input = document.getElementById('years-elapsed')
      expect(input).not.toBeNull()
      expect(input.tagName).toBe('INPUT')
      expect(input.type).toBe('number')
    })

    it('should have a display area for the total fidyah calculation', () => {
      const display = document.getElementById('fidyah-result')
      expect(display).not.toBeNull()
    })

    it('should have a select field for weight conversion (Qoul)', () => {
      const select = document.getElementById('mudd-conversion')
      expect(select).not.toBeNull()
      expect(select.tagName).toBe('SELECT')
    })

    it('should have a theme toggle button', () => {
      const themeToggle = document.getElementById('theme-toggle')
      expect(themeToggle).not.toBeNull()
      expect(themeToggle.tagName).toBe('BUTTON')
    })

    it('should have a calculation breakdown section', () => {
      const breakdown = document.getElementById('calculation-breakdown')
      expect(breakdown).not.toBeNull()
    })
  })

  describe('UI Interaction and Calculation', () => {
    it('should update results when days and years are changed', () => {
      const daysInput = document.getElementById('days-missed')
      const yearsInput = document.getElementById('years-elapsed')
      const totalDaysDisplay = document.getElementById('total-days')
      const resultArea = document.getElementById('fidyah-result')

      // Set values
      daysInput.value = '10'
      yearsInput.value = '1' // multiplier is 2
      
      // Trigger input event
      daysInput.dispatchEvent(new dom.window.Event('input'))
      
      // Should show calculated result: days × (years + 1) = 10 × 2 = 20
      expect(totalDaysDisplay.textContent).toBe('20')
      expect(resultArea.classList.contains('hidden')).toBe(false)
    })

    it('should hide results if days missed is 0 or empty', () => {
      const daysInput = document.getElementById('days-missed')
      const resultArea = document.getElementById('fidyah-result')

      daysInput.value = '0'
      daysInput.dispatchEvent(new dom.window.Event('input'))
      expect(resultArea.classList.contains('hidden')).toBe(true)

      daysInput.value = ''
      daysInput.dispatchEvent(new dom.window.Event('input'))
      expect(resultArea.classList.contains('hidden')).toBe(true)
    })

    it('should show step-by-step calculation breakdown', () => {
      const daysInput = document.getElementById('days-missed')
      const yearsInput = document.getElementById('years-elapsed')
      const priceInput = document.getElementById('price-per-kg')
      const breakdownEl = document.getElementById('step-formula')

      daysInput.value = '10'
      yearsInput.value = '2'
      priceInput.value = '15000'
      daysInput.dispatchEvent(new dom.window.Event('input'))

      expect(breakdownEl.innerHTML).toContain('30 mudd')
      expect(breakdownEl.innerHTML).toContain('337.500')
    })
  })

  describe('Theme Toggle', () => {
    it('should toggle dark class on body when theme button is clicked', () => {
      const themeToggle = document.getElementById('theme-toggle')
      const body = document.body

      expect(body.classList.contains('dark')).toBe(false)

      themeToggle.click()
      expect(body.classList.contains('dark')).toBe(true)
      expect(themeToggle.getAttribute('aria-pressed')).toBe('true')

      themeToggle.click()
      expect(body.classList.contains('dark')).toBe(false)
      expect(themeToggle.getAttribute('aria-pressed')).toBe('false')
    })
  })
})
