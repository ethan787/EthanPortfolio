import resumeUrl from '../assets/resume.pdf'

export default function Hero() {
  return (
    <section id="home" className="container hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> Hello, I’m Ethan Ortiz
        </p>
        <h1 id="hero-title">
          Thoughtful code.
          <br />
          Meaningful <span className="accent">experiences.</span>
        </h1>
        <p className="hero-description">
          A home for my work, ideas, and the things I’m learning along the way.
          I enjoy turning interesting problems into useful digital experiences.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#projects">
            Explore my work <span aria-hidden="true">↗</span>
          </a>
          <a
            className="text-link"
            href={resumeUrl}
            download="Ethan-Ortiz-Resume.pdf"
          >
            Download résumé <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="art-star">✳</div>
        <div className="code-tile">
          <span>&lt;</span>
          <span>/</span>
          <span>&gt;</span>
        </div>
        <div className="art-caption">
          A little curiosity.
          <br />A lot of possibility.
        </div>
        <span className="art-coordinate">EO — 001</span>
      </div>
      <div className="hero-bottom">
        <span>Curiosity → craft → creation</span>
        <a href="#projects">Scroll to explore ↓</a>
      </div>
    </section>
  )
}
