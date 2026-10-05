import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar'

describe('Navigation menu', () => {
  it('starts collapsed and opens and closes using the menu button', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const button = screen.getByRole('button', { name: 'Menu' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveAttribute('aria-controls', 'navigation-links')
    await user.click(button)
    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    await user.click(button)
    expect(button).toHaveAccessibleName('Menu')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it.each(['Projects', 'About', /Let’s talk/, /ethan/])(
    'closes after selecting %s',
    async (name) => {
      const user = userEvent.setup()
      render(<Navbar />)
      await user.click(screen.getByRole('button', { name: 'Menu' }))
      await user.click(screen.getByRole('link', { name }))
      expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute(
        'aria-expanded',
        'false',
      )
    },
  )
})
