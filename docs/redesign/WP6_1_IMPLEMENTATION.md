# WP6.1 implementation record

Date: 2026-08-16

WP6.1 calibrates the Maria visual system without changing its information architecture.

## Implemented

- Replaced the cool gray global canvas with the approved warm cream `#f5f0e7`; the paper, ink, stone, rule, olive, rust, and blue tokens now match the documented palette.
- Reduced the Maria display-title scale globally and tightened collection title sizing so headings retain hierarchy without dominating the page.
- Added deterministic, branded geometric compositions to the existing homepage and project-index cards. They are decorative, derive their variation from each real project slug, and make no claim to be product screenshots.
- Reworked individual writing pages into a restrained reading column while preserving the Maria header, footer, metadata, replay, source, and relationship structures.
- Reduced Explore to a short, honest threshold statement and one link to the existing Field Log experiment.
- Removed the five seeded memory examples after a provenance review. The page now reports an honest empty state until a memory has verified public evidence.
- Consolidated document ownership in `BaseLayout`; `EditorialLayout` is now a thin convenience wrapper only.

## Preserved

The existing generated social artwork remains unchanged:

- `public/images/haley-parks-social-card.png`
- `public/og.png`
- `public/og-image.svg`
- the existing favicon assets

No stock photography, fabricated interface capture, or new generated artwork was introduced.

## Scope boundary

WP6.1 did not change routes, project taxonomy, writing taxonomy, relationship data, publication policy, or the Maria shell architecture. It stops at visual calibration, content-integrity cleanup, and the requested documentation and QA.
