# Website redesign — WP1 handoff

Date: 2026-08-14

## Changes

- Audited the current site, including its routes, content organization, typography, visual language, responsive behavior, and implementation debt.
- Defined a product position for the site as the public interface to an independent, one-person technology lab.
- Defined a four-part information architecture: Projects, Writing, Memory, and About.
- Defined a progressive-disclosure model for the home page, indexes, detail pages, and deep technical evidence.
- Compared three typography systems against representative site copy and recommended Instrument Sans, Newsreader, and a system monospace stack.
- Defined a visual system based on editorial hierarchy, restrained geometry, and evidence-led interaction.
- Added an opt-in CSS token layer for future redesign work.
- Added a standalone TypeScript content model for project, writing, and memory records, including explicit disclosure depth and human/agent authorship metadata.
- Documented the technical migration strategy for the existing Astro and GitHub Pages stack.

## Not changed

- No public route, layout, component, content collection, or navigation item was changed.
- No global font, color, spacing, or motion rule was changed.
- No redesign stylesheet is imported by the current site.
- No content was migrated into the proposed schema.
- No homepage or project-page redesign was implemented.
- No World View artwork, interface, iframe, or imitation was added.

These omissions are intentional: WP1 establishes the foundation and decision record; WP2 applies it to visible pages.

## Decisions

1. Keep Astro, TypeScript, static output, and GitHub Pages.
2. Treat Projects, Writing, Memory, and About as distinct content modes rather than forcing everything into a generic card grid.
3. Use explicit disclosure levels from D0 (identity) through D3 (deep evidence).
4. Lead with two flagship systems: The Human Model and Wonderful Digital World.
5. Treat World View as a separate spatial viewer and piece of evidence for Wonderful Digital World, not as the website's visual shell.
6. Require agent-assisted public work to record a human reviewer and revision note.
7. Keep privacy fail-closed: private memory records must never enter public collections or builds.
8. Apply the redesign through an opt-in root attribute before retiring legacy styles.

## Decisions for Haley

- Confirm the final typeface choice and licensing before self-hosting fonts. The recommendation is Instrument Sans + Newsreader + system monospace.
- Confirm whether "Memory" is the final public label or whether "Field Log" should remain as the reader-facing name.
- Confirm which existing projects remain first-class in the new Projects index after the two flagships.
- Confirm whether agent-contribution disclosure appears inline on every relevant artifact or in a consistent metadata panel.
- Confirm the canonical public destination for Wonderful Digital World before its flagship page ships.

## Risks

- The current global stylesheet contains accumulated selector overlap and responsive exceptions. A wholesale replacement would create avoidable regressions; migrate route by route.
- Adding the proposed schema directly to the current Astro content collections would force premature content migration. It remains standalone until WP2 establishes the first redesigned template.
- Web-font loading can introduce layout shift and privacy/performance costs. Self-host only the approved weights and retain robust fallbacks.
- World View can overpower the editorial site if treated as decorative identity. Keep it linked and contextual unless a later work package explicitly designs a bounded integration.
- Private memory content needs an upstream storage boundary; a frontmatter flag alone is not a sufficient security control.

## WP2 boundary

WP2 should implement one vertical slice: the shared redesigned shell, the homepage, the Projects index, and one flagship detail page. It should:

- import the token layer only beneath the redesign root;
- self-host the approved font files;
- introduce real Astro content collections derived from the standalone model;
- migrate only the content required by that slice;
- preserve existing URLs or add explicit redirects;
- test the slice at narrow mobile, tablet, and wide desktop widths; and
- leave remaining routes on the current presentation until migrated deliberately.

WP2 should not recreate World View, redesign every legacy route at once, or turn the site into a dashboard, startup landing page, or decorative portfolio.

## Validation

`npm run validate` passed on 2026-08-14:

- Prettier: all matched files formatted.
- Live QA artifact contract and boundary assertions: passed.
- Curated artifact relationships: 26 valid relationships.
- Astro diagnostics: 74 files, 0 errors, 0 warnings, 0 hints.
- Production build: 39 static pages generated.
- Internal links: 39 HTML files checked, no failures.

## References

- [Current-state audit](./current-state-audit.md)
- [Product and information architecture](./product-information-architecture.md)
- [Progressive disclosure](./progressive-disclosure.md)
- [Typography decision](./typography.md)
- [Typography comparison artifact](./artifacts/typography-comparison.html)
- [Visual system](./visual-system.md)
- [Content architecture](./content-architecture.md)
- [Technical foundation](./technical-foundation.md)
- [Opt-in redesign tokens](../../src/styles/redesign-tokens.css)
- [Standalone redesign content model](../../src/data/redesign-content-model.ts)
- [Wonderful Digital World repository](https://github.com/Wonderful-Digital-World/wonderful-digital-world)
- [World View repository](https://github.com/Wonderful-Digital-World/world-view)
