import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header">
      <nav className="container navbar" aria-label="Main navigation">
        <a className="wordmark" href="#home" onClick={() => setIsOpen(false)}>
          ethan<span>.</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="navigation-links"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
        <div
          id="navigation-links"
          className={`nav-links ${isOpen ? 'is-open' : ''}`}
        >
          <a href="#projects" onClick={() => setIsOpen(false)}>
            Projects
          </a>
          <a href="#about" onClick={() => setIsOpen(false)}>
            About
          </a>
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setIsOpen(false)}
          >
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
