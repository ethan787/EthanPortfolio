import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProjectCard from './ProjectCard'
import type { Project } from './ProjectCard'

const project: Project = {
  title: 'Test project',
  category: 'Web app',
  description: 'A project description.',
  tags: ['React', 'TypeScript'],
  image: '/project.svg',
  theme: 'mint',
}

describe('Project links', () => {
  it('shows project content without inventing links for missing URLs', () => {
    render(<ProjectCard project={project} index={0} />)
    expect(
      screen.getByRole('heading', { name: project.title }),
    ).toBeInTheDocument()
    expect(screen.getByText(project.description)).toBeInTheDocument()
    expect(
      within(screen.getByRole('list', { name: 'Technologies' })).getAllByRole(
        'listitem',
      ),
    ).toHaveLength(2)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it.each([
    { demoUrl: 'https://example.com/demo' },
    { sourceUrl: 'https://example.com/source' },
    {
      demoUrl: 'https://example.com/demo',
      sourceUrl: 'https://example.com/source',
    },
  ])(
    'renders only configured links with safe external navigation: %o',
    (urls) => {
      render(<ProjectCard project={{ ...project, ...urls }} index={1} />)
      expect(screen.getAllByRole('link')).toHaveLength(Object.keys(urls).length)
      for (const [field, url] of Object.entries(urls)) {
        const link = screen.getByRole('link', {
          name: field === 'demoUrl' ? /Live demo/ : /Source code/,
        })
        expect(link).toHaveAttribute('href', url)
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    },
  )
})
