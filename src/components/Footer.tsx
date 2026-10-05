export default function Footer() {
  return (
    <footer className="container footer">
      <p>© {new Date().getFullYear()} Ethan Ortiz</p>
      <p>Built with care. And React.</p>
      <a href="#home">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  )
}
