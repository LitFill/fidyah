import { describe, it, expect, beforeEach } from 'vitest'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

describe('index.html structure', () => {
  let dom
  let document

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8')
    dom = new JSDOM(html)
    document = dom.window.document
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
})
