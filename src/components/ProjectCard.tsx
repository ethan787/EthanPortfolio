export interface Project {
  title: string
  category: string
  description: string
  tags: string[]
  image: string
  theme: 'mint' | 'lavender' | 'sand'
  demoUrl?: string
  sourceUrl?: string
}

export default function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  return (
    <article className="project-card">
      <div className={`project-art ${project.theme}`}>
        <img
          src={project.image}
          alt=""
          loading="lazy"
          width="640"
          height="440"
        />
        <span className="sample-label">Sample project</span>
      </div>
      <div className="project-heading">
        <h3>{project.title}</h3>
        <span className="project-number">0{index + 1}</span>
      </div>
      <p className="project-category">{project.category}</p>
      <p>{project.description}</p>
      <ul className="tags" aria-label="Technologies">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      {(project.demoUrl || project.sourceUrl) && (
        <div className="project-links">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Live demo ↗
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code ↗
            </a>
          )}
        </div>
      )}
    </article>
  )
}
