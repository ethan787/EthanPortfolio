export default function About() {
  const skills = [
    'React',
    'TypeScript',
    'JavaScript',
    'HTML & CSS',
    'Git',
    'Vite',
  ]

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="container about-grid">
        <div>
          <p className="eyebrow">02 / A little about me</p>
          <h2 id="about-title">
            Always curious.
            <br />
            Always building.
          </h2>
        </div>
        <div className="about-copy">
          <p>
            I’m Ethan. This is where I share the projects I build and the ideas
            I explore. I’m interested in clean interfaces, thoughtful details,
            and software that makes everyday tasks easier.
          </p>
          <p className="muted">
            Make this space yours: add your background, experience, interests,
            and what you want to work on next.
          </p>
          <h3>My toolkit</h3>
          <ul className="tags skills" aria-label="Skills and tools">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <p className="edit-note">
            Starter skills — update these to reflect your experience.
          </p>
        </div>
      </div>
    </section>
  )
}
