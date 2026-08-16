# Current Design System

This document describes the implemented visual system. Historical proposals under `docs/archive/redesign-history/` are context, not authority.

## Foundations

The visual language is warm, restrained, and editorial. `src/styles/redesign-tokens.css` is the source of truth for color, typography, spacing, radii, borders, and shadows. Components should consume semantic tokens instead of introducing one-off values when an appropriate token exists.

The body face is the readable sans-serif stack defined by the tokens. Display headings and the wordmark use the serif display stack. Type size and line height use the existing responsive token scale; page-local CSS may adjust measure and hierarchy but must not replace the global families.

## Layouts

- `BaseLayout` is the only global document shell.
- Maria collection and standard-page layouts provide the default site rhythm.
- Project workspace and document layouts provide intentional deep-route structure.
- Specialized layouts may change information density, but retain the same header, footer, tokens, focus treatment, and reading-width principles.

## Navigation

The primary navigation is exactly: **Haley Parks → Home**, **Projects**, **Writing**, **Memories**, and **Explore**. The Haley Parks wordmark links to `/`. About is a secondary footer destination. Search is also secondary. Field Log is retired and must not appear in navigation.

Navigation must retain a visible keyboard focus state, accurate `aria-current`, meaningful landmarks, and a working skip link. Mobile navigation may wrap, but must not reorder, hide, or rename destinations.

## Cards and collections

Collection cards use shared Maria borders, surface colors, radii, spacing, and restrained hover/focus feedback. Semantic labels and relationship text may vary by collection while the interaction remains predictable.

Current collection cards use controlled/equal sizing. Variable semantic card sizes are planned future work and should not be invented during unrelated tasks.

## Accessibility and motion

Text and controls must preserve readable contrast, keyboard visibility, semantic heading order, link purpose, and reduced-motion behavior. Decorative treatment must not be the only carrier of meaning. Existing responsive breakpoints should be reused before adding new ones.
