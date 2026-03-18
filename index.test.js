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
})
