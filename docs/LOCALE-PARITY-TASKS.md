# English / Persian parity tasks

## Completed in this pass

- [x] Keep the same route families in both locales: home, services, service details, work, project details, about, FAQ, contact and privacy.
- [x] Keep service slugs, service assets, workflow steps, audience lists and plan counts aligned.
- [x] Keep portfolio records and live destinations shared while translating only the case-study copy.
- [x] Move page-level labels that were duplicated in components into the typed locale source.
- [x] Centralize locale switching and test root, nested service and nested work paths.
- [x] Add structural parity tests for all page sections and service content cardinality.
- [x] Use the verified `.ir` production host for canonical, alternate and service JSON-LD URLs when no deployment override is supplied.

## Follow-up before the next content release

- [ ] When Persian copy changes, update the matching English translation in `src/content/site.ts` in the same change.
- [ ] When a project is added or removed, update both `fa` and `en` records in `src/content/projects.ts` and run the portfolio tests.
- [ ] Review English translations with the owner before publishing; structural parity does not replace human translation review.
- [ ] Run the locale route checklist and browser QA at desktop and mobile widths before deployment.

## Root cause

The site already rendered the same shared components for both locales. The drift risk came from several visible labels being written as `locale === "fa" ? ... : ...` inside page components instead of being part of the typed `copy` source. That allowed one language to be updated without an obvious missing-field or parity-test failure.
