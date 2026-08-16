# WP6.1 layout consolidation

Date: 2026-08-16

## Decision

`BaseLayout.astro` is the single document shell. It owns the HTML document, metadata, Maria site header and footer, breadcrumbs, skip link, and global styles.

`EditorialLayout.astro` remains only as a thin convenience adapter for editorial routes. It forwards `title`, `description`, `canonicalPath`, `imagePath`, and `breadcrumbs` to `BaseLayout`, optionally renders an eyebrow, and then passes through the page slot. It does not duplicate document structure, navigation, or metadata logic.

Writing detail pages continue to use `BaseLayout` directly because their document header and reading structure are specific to the writing corpus. This keeps both layout paths on the same Maria shell while avoiding a second site-frame implementation.
