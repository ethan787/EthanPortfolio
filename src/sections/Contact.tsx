// Replace this placeholder with your actual email address before publishing.
const email = 'your.email@example.com'

export default function Contact() {
  return (
    <section
      id="contact"
      className="container contact-section"
      aria-labelledby="contact-title"
    >
      <p className="eyebrow">03 / Say hello</p>
      <h2 id="contact-title">
        Good things start
        <br />
        with a <span className="accent">conversation.</span>
      </h2>
      <p>
        Have a project in mind, an interesting idea, or just want to connect?
      </p>
      <a className="button button-dark" href={`mailto:${email}`}>
        Get in touch <span aria-hidden="true">↗</span>
      </a>
      <p className="edit-note">Contact placeholder: {email}</p>
    </section>
  )
}
