# Granja Villa Alegre

A Spanish-language farm and product website presenting the farm's story, animals, artisanal products, process photography and contact options.

## Purpose and status

The current entry point renders `Landing`, a single-page React site with product and animal cards, a gallery, section navigation and telephone/WhatsApp/Instagram links. No cart, checkout, inventory management, booking system, account system or inquiry backend is tracked.

`jspdf` remains in the manifest, but the current source does not import it or expose a PDF/label-generation workflow. Historical print work should not be described as part of the active application without separate evidence. This root README is newly created.

Reviewed November 17, 2026 against `main` at `5d7b6b9e4f8b7c5e9d158fa655fc74e060d5fa01`. This review describes the tracked source, not verified production behavior. Current hosting, commercial readiness and the next owner-approved milestone remain unverified.

## Repository map

| Path | Responsibility |
|---|---|
| [src/main.tsx](src/main.tsx) and [src/App.tsx](src/App.tsx) | React bootstrap and landing-page entry |
| [src/Landing.tsx](src/Landing.tsx) | Page narrative, product/animal arrays and photo map |
| [src/components/](src/components/) | Hero, navigation, cards, gallery and contact section |
| [src/index.css](src/index.css) | Shared styles and external font import |
| [public/images/](public/images/) | Farm, product, process and animal photographs |
| [tailwind.config.ts](tailwind.config.ts) | Theme configuration |
| [vite.config.ts](vite.config.ts) and [tsconfig.app.json](tsconfig.app.json) | Bundler and application type-check configuration |

## Architecture and integrations

React 18 and TypeScript run in the browser, built with Vite 5 and styled with Tailwind CSS 3/PostCSS. `Landing` uses `IntersectionObserver` for section reveal effects. Content is stored in source arrays and components rather than a CMS or database.

Google Fonts is imported in CSS. Contact actions open external telephone, WhatsApp and Instagram destinations. They do not automatically place orders or send messages. No runtime API, Neon resource, authentication, payment or email service is implemented in the tracked source.

## Setup and environments

For future authorized development, use Node.js/npm compatible with the locked toolchain, install with `npm ci`, then use `npm run dev` and open Vite's printed local URL. No root Node-version pin, environment template or source environment-variable references are tracked. Credentials and backend provisioning are not needed for the current static site.

For content maintenance, update the arrays/photo map in `src/Landing.tsx`, reusable cards in `src/components/`, and assets in `public/images/`. Confirm permission and accurate descriptions for each photograph. Canonical domain, provider linkage and staging/production mappings remain unverified.

## Safe commands

For documentation work, inspect the repository without starting the application:

```sh
git status --short --branch
git ls-tree -r --name-only HEAD
git diff --check
git diff -- README.md
git diff --cached --name-only
```

Use an isolated documentation branch and stage only `README.md`. The package commands described elsewhere are for separately authorized development; none needs to run for a README edit. Preserve existing work and do not run installs, builds, tests, provider requests or deployment commands during documentation maintenance.

## Testing and validation

[package.json](package.json) defines only `dev`, `build` (`tsc -b && vite build`) and `preview` (`vite preview`). TypeScript compilation is part of the build; there is no separate typecheck, lint or test script, tracked test suite or CI workflow.

Future authorized application validation should cover section links, image paths/alt text, small-screen cards, contact destinations and reduced-motion/accessibility behavior. These are proposed checks, not results from this README pass.

This README pass checked document structure, relative links, original-link preservation and README-only diffs. No application tests, lint, type checks, builds, browser flows or live services were run.

## Deployment and rollback

The configured Vite build produces static assets in the default `dist/` directory. No provider-specific deployment file or release/recovery runbook is tracked. A future release must confirm the actual host and retain the previous artifact/configuration for rollback. Reverting static code does not undo messages sent through external contact services.

README changes can still trigger hosting automation when pushed. Keep this documentation branch local until publication is approved with a confirmed no-deployment path. No settings, deployments, merges or databases are changed by this documentation pass. For a documentation rollback, propose a reviewed revert of the README commit.

## Risks and guardrails

- Product descriptions in source are marketing content, not independent evidence of medical efficacy, certifications or current availability. Changes to those claims need owner review.
- Preserve image attribution/permissions and avoid publishing additional personal information, private orders or contact records in this public repository.
- External contact links and fonts have availability/privacy considerations; this documentation review did not contact those destinations.
- Do not remove the unused PDF dependency or alter product content as part of a README-only update.

## Related documentation

No prior root README, project runbook, `AGENTS.md`, `.agents/skills`, CI workflow or root license file is tracked. Use [the landing source](src/Landing.tsx), [contact component](src/components/ContactCard.tsx), [package manifest](package.json) and [Vite configuration](vite.config.ts) as implementation references. This edit does not grant a new license for code or images.
