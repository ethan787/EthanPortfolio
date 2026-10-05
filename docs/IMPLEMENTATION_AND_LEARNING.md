# Portfolio implementation and learning reflection

This document records the portfolio and continuous integration implementation introduced in [commit `bd3b7e2`](https://github.com/ethan787/EthanPortfolio/commit/bd3b7e2909415b150472677070c2d2a7d82213c0). That implementation is already on `main`. The accompanying documentation pull request adds this explanation and a README link; it does not introduce the application or workflow a second time.

The first-person reflection below is a draft for Ethan to adapt. It describes learning opportunities supported by the actual implementation, rather than claiming independently verified personal experience or expertise.

## 1. Starting point and resulting behavior

The repository initially contained a README identifying Ethan Ortiz's portfolio. It had no application entry point, reusable UI components, package scripts, automated tests, or CI workflow.

The implementation created a working React and TypeScript portfolio using the requested folder structure. Visitors can explore an introduction, sample projects, background and skills, contact information, and a résumé download. The page adapts to desktop and mobile screen sizes. Developers can run the app locally, build production assets, and run automated checks before submitting changes.

The site remains a customizable starter. Sample projects, skills, the contact email, and the résumé are labeled placeholders. The implementation does not establish that those example projects were completed or that the listed skills reflect Ethan's experience.

## 2. Application structure and responsibilities

| File or directory                | Responsibility                                                     | Why it matters                                                        |
| -------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `src/main.tsx`                   | Mounts the React application and loads the stylesheet              | Provides one clear browser entry point                                |
| `src/App.tsx`                    | Composes navigation, sections, and footer                          | Makes the overall page structure easy to understand                   |
| `src/components/Navbar.tsx`      | Provides section links and mobile menu state                       | Keeps navigation behavior separate from page content                  |
| `src/components/ProjectCard.tsx` | Renders a typed project record and optional links                  | Makes project presentation reusable and consistent                    |
| `src/components/Footer.tsx`      | Shows the current year and a back-to-top link                      | Centralizes shared footer content                                     |
| `src/sections/`                  | Holds Hero, About, Projects, and Contact                           | Gives each portfolio section a focused editing location               |
| `src/assets/images/`             | Stores local SVG project illustrations                             | Avoids relying on remote image services for starter artwork           |
| `src/assets/resume.pdf`          | Supplies the downloadable placeholder PDF                          | Establishes a working asset path that can be replaced                 |
| `src/index.css`                  | Defines visual styling, responsive layouts, and interaction states | Keeps visual customization in one stylesheet                          |
| `vite.config.ts`                 | Enables React integration and relative production asset paths      | Supports a static build that can live under a repository subdirectory |
| `tsconfig.*.json`                | Defines strict application and tooling checks                      | Catches type errors in both the UI and test configuration             |

The `Project` interface defines a title, category, description, tags, image, theme, and optional `demoUrl` and `sourceUrl`. Project data lives in `Projects.tsx`; the card component handles presentation. Missing URLs produce no link, so the starter does not send visitors to fabricated demos or repositories. Configured external links use `noopener noreferrer` with a new tab.

The contact action uses a `mailto:` link. It opens the visitor's email client rather than submitting a message through a backend. A successful browser test verifies that link, not email delivery.

## 3. Responsive behavior and accessibility foundations

The layout uses a desktop project grid and stacks cards on smaller screens. Navigation becomes a toggleable mobile menu. Its `aria-expanded` attribute communicates whether the menu is open, and `aria-controls` identifies the controlled navigation links. Selecting a section or the wordmark closes the menu.

The page includes a skip-to-content link, a main landmark, labeled navigation and sections, a single top-level heading, and visible keyboard focus styles. Decorative illustrations use empty alternative text or are hidden from assistive technology. Reduced-motion preferences disable smooth scrolling and transitions.

These are accessibility foundations, not a complete accessibility certification. The tests do not replace screen-reader testing or a full contrast and keyboard audit.

## 4. CI triggers and execution model

The workflow in `.github/workflows/ci.yml` runs on every push, every pull request, and manual dispatch. There are no path filters, so documentation changes also run the complete suite. It uses GitHub-hosted Ubuntu runners, Node.js 22, and `npm ci` with the committed lockfile.

Two jobs run independently:

| Job                              | Steps                                                                             | Purpose                                                                                      |
| -------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Code quality, tests, and build   | Formatting, ESLint, TypeScript, Vitest coverage, production build, bundle budgets | Detect source-quality issues, behavior regressions, type errors, and unexpected asset growth |
| Desktop and mobile browser tests | Install Chromium, build the application, run Playwright, upload reports           | Exercise the actual production site in a browser                                             |

The quality job has a 10-minute timeout; the browser job has a 15-minute timeout. Concurrency groups cancel superseded runs for the same branch or pull request. The workflow requests read-only repository contents access, and checkout does not persist credentials. It does not require custom secrets or deploy the site.

Coverage reports and browser reports are retained for seven days. Playwright retains traces for failures, giving a reviewer a way to investigate browser actions and errors instead of relying only on a short failure message.

## 5. Code quality and efficiency checks

Prettier establishes consistent formatting. `.gitattributes` normalizes text files to LF and treats the PDF as binary. This helps keep cross-platform changes focused on actual content.

ESLint applies JavaScript and TypeScript recommendations, React Hooks rules, React Refresh export checks, and selected SonarJS rules. The command uses `--max-warnings 0`, so warnings also fail the lint step.

The targeted checks include:

- Identical conditions and duplicated branches that can hide redundant logic or mistakes.
- Redundant boolean expressions that make decisions harder to read.
- Collections that are populated without being used.
- Potentially expensive regular expression patterns.
- Cognitive complexity above 15, encouraging functions with clearer control flow.

The bundle script examines all emitted JavaScript and CSS chunks under `dist/assets`, including nested and lazy-loaded chunks. It gzips each file, sums the results by extension, and fails if either aggregate budget is exceeded. It also fails if the expected JavaScript or CSS output is missing.

| Asset category | Initial measured compressed total | Enforced limit |
| -------------- | --------------------------------- | -------------- |
| JavaScript     | About 71.7 KiB                    | 90 KiB         |
| CSS            | About 2.4 KiB                     | 20 KiB         |

These are size guards and static quality checks. They do not measure runtime frame rates, prove optimal algorithmic complexity, or enforce image and résumé size budgets. Real performance work would also need profiling, network measurements, and representative devices. A budget increase should be accompanied by an explanation of the added feature and its cost.

## 6. Test strategy and what the tests establish

### Component and application tests

Vitest runs with jsdom, React Testing Library, user-event, and jest-dom matchers. Tests interact with accessible roles and visible behavior rather than comparing large snapshots.

The initial suite contains 10 tests across three files:

- `Navbar.test.tsx`: verifies the collapsed initial state, opening and closing, and closing after each navigation choice.
- `ProjectCard.test.tsx`: verifies displayed project content, absence of links when URLs are missing, and demo-only, source-only, and combined link configurations. It also verifies safe external link attributes.
- `App.test.tsx`: verifies the main landmark, a single primary heading, three starter projects, valid internal link destinations, contact and download attributes, and the current footer year.

Coverage includes application components and sections, including newly added untested application files. It excludes the browser bootstrap, Vite declaration file, test setup, and test files.

| Metric     | Required minimum | Initial measured result |
| ---------- | ---------------- | ----------------------- |
| Statements | 90%              | 100%                    |
| Lines      | 90%              | 100%                    |
| Functions  | 90%              | 100%                    |
| Branches   | 85%              | 100%                    |

Coverage measures executed code. Even 100% coverage does not prove that every useful assertion exists or every defect is impossible. Future features need behavior-specific cases, including error paths where applicable.

### Production browser tests

Playwright runs three scenarios in desktop Chromium and mobile Chromium, producing six test executions. The mobile project uses device emulation, not a physical phone. The tests:

1. Verify the document title, rendered heading and project count, section presence, absence of uncaught page errors, and absence of horizontal overflow at 320, 390, 768, and 1280 pixels.
2. Verify navigation reaches the projects section and the mobile menu starts hidden, opens, and closes after selection.
3. Download the résumé, verify its suggested filename, confirm that the download succeeds, inspect its `%PDF-` file signature, and check the contact email link.

The browser job tests the production build through Vite preview. External font requests are blocked during tests to keep them independent of the font provider. Firefox, WebKit, physical devices, external font rendering, and email delivery are outside this suite's current scope.

## 7. A concrete debugging lesson: testing a download

The first résumé browser test attempted to request the download link through Playwright's HTTP request API. The small starter PDF was inlined by Vite as a `data:` URL, so that request failed because the API expected an HTTP URL.

The corrected test listens for the browser's download event, clicks the link, reads the downloaded file, and checks its PDF signature. This verifies the visitor-facing outcome whether Vite embeds a small PDF or emits a larger replacement as a separate asset.

The browser tests also required DOM types in the tooling TypeScript configuration because code passed to `page.evaluate` references browser objects such as `document` and `window`. Adding those libraries allowed the browser test source to be type-checked alongside the tooling configuration.

## 8. Learning reflection draft

### Structuring a frontend project

I learned how to organize a React application around reusable components and focused page sections. Keeping project data separate from `ProjectCard` means I can add or replace projects without copying the markup. The typed `Project` interface also makes the required information and optional links explicit.

### Understanding the build toolchain

I learned the different roles of React, TypeScript, and Vite: React defines the UI, TypeScript checks the code's types, and Vite serves and builds the application. Running the development server is useful for iteration, but checking the production build matters because assets and output behave differently after bundling.

### Writing tests that describe behavior

I learned to test what a visitor or component consumer can observe: menu state, reachable section links, configured project links, and a downloadable file. Component tests provide focused feedback, while browser tests check that the built application works as a whole. The résumé failure showed why a test should follow the user's action instead of assuming how the build stores an asset.

### Reading coverage honestly

I learned that coverage thresholds can help prevent new application code from bypassing tests, but a high percentage is only one signal. I still need assertions that explain what correct behavior looks like, and I need to add cases when the application gains new decisions or failure modes.

### Automating consistent review checks

I learned how a GitHub Actions workflow connects repository events to repeatable checks. Committing the lockfile and using `npm ci` keeps dependency installation tied to a known resolution. Running the same commands locally helps me catch issues before pushing, while saved reports make remote failures easier to investigate.

### Treating efficiency as measurable work

I learned that static rules can reveal suspicious logic and unnecessary complexity, while bundle budgets make dependency growth visible. These tools give me concrete signals to review. They do not replace measuring runtime behavior when a real performance issue appears.

### Connecting accessibility to implementation

I learned that responsive design includes interaction behavior as well as layout. A mobile menu needs meaningful state, navigation needs reachable targets, and keyboard users need focus styles and a way to skip repeated navigation. These details belong in the implementation and should be considered when writing tests.

### Keeping review history accurate

I learned that commits record changes and pull requests propose differences between branches. Because the implementation was already pushed to `main`, this documentation PR records and explains that work rather than pretending it is still unmerged. For future work, I can create a feature branch first, make focused commits, and open a PR before merging.

## 9. Verification evidence

The implementation's local validation passed formatting, linting, TypeScript, all 10 component tests, all six browser test executions, coverage thresholds, the production build, and both bundle budgets.

The [first GitHub Actions run](https://github.com/ethan787/EthanPortfolio/actions/runs/37386948863) also completed successfully in both jobs for implementation commit `bd3b7e2`. These results establish the baseline for that commit. The documentation PR receives its own checks; its status should be read from the PR rather than inferred from the earlier run.

## 10. Practical next steps

Replace the sample portfolio content, contact address, and résumé with real information before publishing. When adding a feature, add tests for its intended behavior and relevant edge cases, then run:

```sh
npm run format
npm run check
npx playwright install chromium
npm run test:e2e
```

If merges must be blocked when checks fail, configure a branch rule for `main` requiring both CI job names. The workflow reports results, but branch protection is a separate setting and has not been enabled as part of this work.

Possible future improvements include a full accessibility audit, additional browser engines, deployment automation, runtime performance measurements, and a richer test suite as the portfolio grows. These are follow-up ideas, not completed features.
