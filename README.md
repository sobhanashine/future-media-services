# Future Media Services

A bilingual, light-theme digital agency website built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, GSAP and React Three Fiber.

Persian is served at `/` with RTL document direction. English mirrors the full route structure under `/en` with LTR document direction. The visual system uses `#d90a2c` as the signal colour and `#161519` as the primary ink colour.

## Requirements

- Node.js 22.13 or newer. On this Mac, the current Homebrew runtime can be selected with `PATH=/opt/homebrew/bin:$PATH`.
- npm 10 or newer.

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). English is available at [http://localhost:3000/en](http://localhost:3000/en).

## Commands

```bash
npm run dev        # development server
npm run lint       # ESLint
npm run typecheck  # TypeScript strict check
npm run test       # Vitest content tests
npm run test:e2e   # Playwright flows, accessibility and overflow tests
npm run build      # production build
npm run start      # run the production build
```

If Playwright's pinned browser is not installed, run `npx playwright install chromium` once.

## Routes

| Persian | English | Purpose |
| --- | --- | --- |
| `/` | `/en` | Home and conversion path |
| `/services` | `/en/services` | Services index |
| `/services/[slug]` | `/en/services/[slug]` | Service detail and metadata |
| `/work` | `/en/work` | Responsive three-device portfolio cards with direct live links |
| `/work/[slug]` | `/en/work/[slug]` | Bilingual project case study with verified Future Media Services records |
| `/about` | `/en/about` | Approach and values |
| `/contact` | `/en/contact` | Phone-only project contact |
| `/privacy` | `/en/privacy` | Privacy notice for phone and external links |

The app also generates `sitemap.xml`, `robots.txt`, localized Open Graph images and localized not-found states. The 3D experience has its own immediate static fallback.

## Content and assets

All bilingual copy and service data live in `src/content/site.ts`. Route components consume that typed source so Persian and English slugs stay aligned.

- `docs/content-inventory.md` records verified, proposed and missing business facts.
- `public/asset-manifest.json` records replaceable assets and their current fallbacks.
- Portfolio claims remain limited to the owner-provided CV, Future Media Services project records and what can be verified on each live website; team, address, email, metrics and testimonials are intentionally not invented.
- Instagram links are normal outbound links. No media is hotlinked and no embed is loaded on the critical path.

Before launch, replace or approve every `missing`, `proposed`, `inferred` or `provisional` item in those files.

Run `npm run assets:portfolio` after replacing any desktop, tablet or mobile project capture. The generator composites the refreshed captures into the supplied device mockup used by the portfolio cards.

## Phone-only contact

Project forms and their delivery backend have been removed. Project CTAs are call buttons whose shared `tel:` target opens the device dialler; the number itself is not displayed. The website does not collect names, budgets or project descriptions.

Instagram content management has its own local bilingual service route with Economic, Silver and Gold monthly plans. The current package quantities and inclusions were adapted from the owner-provided reference and are maintained in the typed content model.

## Motion and 3D

`FutureCoreLoader` keeps Three.js outside the server-rendered content path and skips WebGL for reduced-motion and data-saver users. The procedural scene:

- uses one canvas only;
- clamps DPR to 1–1.5;
- reduces particles and antialiasing on small screens;
- reuses geometry/material resources;
- pauses the frame loop outside the viewport or in a hidden tab;
- leaves all copy, navigation and calls to action available without JavaScript or WebGL.

GSAP reveal motion is a progressive enhancement. Native scrolling remains unchanged.

## Deployment and rollback

1. Run lint, typecheck, unit tests, production build and Playwright checks.
2. Configure `NEXT_PUBLIC_SITE_URL`.
3. Review the content inventory and asset manifest with the owner.
4. Deploy a preview and re-run browser checks against the preview URL.
5. Promote the verified deployment and retain the previous deployment as the rollback target.

No production deployment is considered complete until the phone number, pricing, privacy notice, favicon and launch assets are owner-approved.
