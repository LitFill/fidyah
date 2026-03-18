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
    dom = new JSDOM(html)
    document = dom.window.document
    global.document = document
    global.window = dom.window
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
      
      // Since we haven't wired it yet, it should still be 0 or hidden
      // But after wiring, it should be 10 and resultArea should be visible
      expect(totalDaysDisplay.textContent).toBe('10')
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
  })
})
