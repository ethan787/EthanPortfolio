import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import App from './App'

it('provides a main landmark, reachable section links, contact, and a resume download', () => {
  render(<App />)
  expect(screen.getByRole('main')).toHaveAttribute('id', 'main')
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getAllByRole('article')).toHaveLength(3)
  for (const link of screen.getAllByRole('link')) {
    const href = link.getAttribute('href')
    if (href?.startsWith('#')) {
      expect(document.getElementById(href.slice(1))).toBeInTheDocument()
    }
  }
  expect(screen.getByRole('link', { name: /Get in touch/ })).toHaveAttribute(
    'href',
    expect.stringMatching(/^mailto:/),
  )
  expect(screen.getByRole('link', { name: /Download résumé/ })).toHaveAttribute(
    'download',
    'Ethan-Ortiz-Resume.pdf',
  )
  expect(screen.getByRole('contentinfo')).toHaveTextContent(
    `© ${new Date().getFullYear()} Ethan Ortiz`,
  )
})
