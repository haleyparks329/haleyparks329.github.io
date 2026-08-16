# WP6.1 visual QA

Date: 2026-08-16

## Coverage

The requested routes are checked at desktop and mobile sizes:

- `/`
- `/projects/`
- a representative project detail
- `/writing/`
- a representative writing detail
- `/memories/`
- `/explore/`
- `/about/`

## Checks

- Warm cream canvas and Maria paper surfaces render consistently.
- Display titles remain prominent without overwhelming the first viewport.
- Homepage and project cards retain equal structures and show decorative branded geometry without implying screenshots.
- Writing detail content forms a readable editorial measure and returns to a single column on mobile.
- Memories renders the audited empty state with no seeded records.
- Explore contains only the short threshold statement and Field Log link.
- Existing navigation, breadcrumbs, project links, and writing links remain operable.
- Browser console is checked for errors on the covered routes.

## Results

All requested routes passed visual inspection at 1440 × 900 and 390 × 844 viewports. The browser sweep found no horizontal overflow and no console warnings or errors. The writing-detail display face was also verified after correcting its Maria font token.

Repository validation passed in full with `npm run validate`:

- Prettier formatting check
- projection pipeline tests
- memories, relationships, projection, asset-reference, and alt-text validators
- Astro diagnostics: 81 files, 0 errors, 0 warnings, 0 hints
- production build: 41 pages
- internal-link validation across all 41 generated HTML files
