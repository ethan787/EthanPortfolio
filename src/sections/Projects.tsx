import ProjectCard from '../components/ProjectCard'
import type { Project } from '../components/ProjectCard'
import dashboardImage from '../assets/images/dashboard.svg'
import plannerImage from '../assets/images/planner.svg'
import portfolioImage from '../assets/images/portfolio.svg'

// Replace these examples with your own projects. Add demoUrl and sourceUrl
// to each entry when you have real links to share.
const projects: Project[] = [
  {
    title: 'Insight dashboard',
    category: 'Data visualization / Web app',
    description:
      'An example dashboard concept that makes complex information easier to explore at a glance.',
    tags: ['React', 'TypeScript', 'CSS'],
    image: dashboardImage,
    theme: 'mint',
  },
  {
    title: 'Everyday planner',
    category: 'Productivity / Interface design',
    description:
      'A sample planning app concept for organizing tasks and making room for what matters.',
    tags: ['React', 'TypeScript', 'Local storage'],
    image: plannerImage,
    theme: 'lavender',
  },
  {
    title: 'Personal portfolio',
    category: 'Personal website / Frontend',
    description:
      'A sample showcase for projects, background, and contact details, built around a simple component structure.',
    tags: ['React', 'Vite', 'Responsive design'],
    image: portfolioImage,
    theme: 'sand',
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      className="container section"
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Selected work</p>
          <h2 id="projects-title">Ideas made tangible.</h2>
        </div>
        <p>
          A few examples to get you started.
          <br />
          Replace them with your own work.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
