# EthanPortfolio

Ethan Ortiz's responsive portfolio, built with React, TypeScript, and Vite.

## Getting started

Requires Node.js 20.19+, 22.13+, or 24+. CI uses Node.js 22.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

```sh
npm run typecheck  # Check TypeScript
npm run build      # Create the production site in dist/
npm run preview    # Preview the production build locally
```

## Structure

```text
src/
├── components/
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   └── Footer.tsx
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
├── assets/
│   ├── images/
│   └── resume.pdf
├── App.tsx
├── main.tsx
└── index.css
```

## Make it yours

- Update the introduction in `src/sections/Hero.tsx`.
- Add your background and actual skills in `src/sections/About.tsx`.
- Replace the sample entries in `src/sections/Projects.tsx`. Optional `demoUrl` and `sourceUrl` fields enable project links.
- Put your project images in `src/assets/images/` and import them in `Projects.tsx`.
- Replace `src/assets/resume.pdf` with your real résumé. The included PDF is explicitly a placeholder.
- Change the placeholder email in `src/sections/Contact.tsx` before publishing. The contact button opens an email client; there is no backend or form service.
- Adjust colors and spacing in `src/index.css`, and metadata in `index.html`.

The starter uses Google Fonts with local system font fallbacks. Project illustrations are local SVG files. Vite uses a relative base path so production assets can work under a repository subdirectory.

## Continuous integration

`.github/workflows/ci.yml` runs on every push, every pull request, and manual dispatch. No paths are excluded: every change runs the full suite. It uses Node.js 22, locked dependencies (`npm ci`), read-only repository permissions, and two jobs:

- **Code quality, tests, and build:** Prettier, ESLint, React Hooks checks, TypeScript, Vitest coverage, production build, and bundle budgets.
- **Desktop and mobile browser tests:** Playwright checks the production build in Chromium at desktop and mobile sizes, including navigation, layout overflow, browser errors, and the actual résumé download.

ESLint flags redundant conditions, duplicated branches, unused collections, expensive regular expression patterns, and cognitive complexity above 15. Compressed bundle budgets limit total JavaScript to 90 KiB and CSS to 20 KiB across emitted chunks. These checks catch common inefficiencies; they do not replace profiling or prove every algorithm is optimal.

Coverage must stay at or above 90% for lines, statements, and functions, and 85% for branches. All application components and sections count, including untested new files; the bootstrap and test setup are excluded. Add tests alongside changed behavior. Passing tests cover the behaviors defined in the suite, not every possible defect.

Run the same checks locally:

```sh
npm run format        # Apply consistent formatting
npm run check         # Formatting, lint, types, coverage, build, bundle budgets
npx playwright install chromium
npm run test:e2e      # Uses the production build created by npm run check
```

CI uploads HTML coverage and Playwright reports, including failure traces, as run artifacts for seven days. Browser tests block external font requests to avoid depending on a third-party font service.

To prevent merging failing pull requests, configure a GitHub branch rule for `main` requiring **Code quality, tests, and build** and **Desktop and mobile browser tests**. The workflow reports failures automatically; merge enforcement is a separate repository setting.

Tooling references: [Playwright CI](https://playwright.dev/docs/ci), [Vitest coverage](https://vitest.dev/guide/coverage), and [SonarJS ESLint rules](https://github.com/SonarSource/SonarJS/tree/master/packages/analysis/src/jsts/rules).
