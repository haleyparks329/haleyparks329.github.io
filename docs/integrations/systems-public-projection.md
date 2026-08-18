# Systems public projection

The `/systems/` page is a static consumer of `src/data/systems.json`. Wonderful Digital World creates that file from private local state through the `wdw.systems.v1` public projection contract. The website never reads the Command Center database directly.

## Refresh

From the `wonderful-digital-world` repository, with the website repository in the sibling directory shown below:

```sh
PYTHONPATH=packages python3 -m wdw_observability.export_public \
  --workspace .. \
  --output ../haleyparks329.github.io/src/data/systems.json
```

Then validate and build from `haleyparks329.github.io`:

```sh
npm run validate:systems
npm run test:systems
npm run build
```

Review the JSON diff, commit the refreshed snapshot with the website, and publish through the website's normal deployment workflow. This last commit/deploy step is manual. If refresh fails, the deployed static site keeps its last committed snapshot.

## Boundary

- The exporter excludes observations newer than the 24-hour release delay.
- Only the root, resident aggregate, and intelligence aggregate fields in `wdw.systems.v1` are accepted.
- The website validator rejects extra fields, private identifiers, activity payloads, local paths, local endpoints, and release delays below 24 hours.
- The renderer copies known fields and ignores additive fields defensively, but publication validation remains fail-closed until an additive schema change is reviewed and allowlisted.
- The page marks a committed snapshot stale after 72 hours. Missing or malformed data renders an unavailable state rather than invented values.

Residents are intentionally aggregate-only. Thought Intelligence metrics use `null` for unavailable evidence; similarity is not presented as correctness, and model quality remains unknown until human-reviewed labels support it.
