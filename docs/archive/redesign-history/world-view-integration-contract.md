# World View integration contract

Status: future-facing contract derived from the public Wonderful Digital World and World View repositories. It does not describe a live integration.

## System boundary

| Layer                   | Owns                                                                                       | Does not own                              |
| ----------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------- |
| Wonderful Digital World | Canonical domain state, evidence, authority, work, and projection policy                   | Viewer layout or visual interpretation    |
| Projection adapter      | Selection, sanitization, authorization, schema conversion, and freshness metadata          | Canonical truth or durable domain state   |
| World View              | Presentation of an authorized projection and its loading, stale, empty, and failure states | Mutation of Wonderful Digital World state |

World View receives a projection. It is not a database, an orchestration layer, or the Wonderful Digital World itself.

## Minimum projection envelope

The live boundary should be versioned and replaceable. Field names remain provisional until a shared schema is published.

```ts
type WorldProjection = {
  schemaVersion: string;
  projectionId: string;
  generatedAt: string;
  status: "current" | "stale" | "partial";
  places: PlaceProjection[];
  residents: ResidentProjection[];
  activities: ActivityProjection[];
  attention: AttentionProjection[];
};
```

Every collection must contain stable public identifiers and presentation-safe labels. The adapter may omit fields or whole objects that the viewer is not authorized to receive.

## Authority and privacy

- The source domain remains authoritative for its state.
- The projection adapter enforces viewer authorization before serialization.
- Sanitization happens before the payload crosses into World View.
- Private prompts, resident memory, credentials, hidden evidence, and lived personal data are excluded by default.
- The UI cannot infer permission from the presence of a route, place, or resident name.
- A projection is read-only. Any later action path requires a separate capability-checked contract.

## Freshness and failure

World View must make these states visible rather than silently substituting fixture data:

| State          | Viewer behavior                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| Loading        | Preserve the last authorized projection when safe and identify that an update is in progress.         |
| Current        | Show the projection timestamp and normal scene.                                                       |
| Stale          | Keep the last projection visible with a prominent freshness signal.                                   |
| Partial        | Mark unavailable places or residents without inventing values.                                        |
| Unauthorized   | Render no protected content and offer no cached fallback.                                             |
| Invalid schema | Reject the payload, report the version mismatch, and retain diagnostic context outside the public UI. |
| Unavailable    | Show a bounded error state; never imply that fixture residents are live.                              |

## Adapter lifecycle

1. Wonderful Digital World creates a viewer-bounded projection from canonical state.
2. Authorization and sanitization are applied before transport.
3. The adapter validates `schemaVersion`, identifiers, and timestamps.
4. World View renders only the validated projection.
5. Refreshes replace the projection atomically; failed refreshes change freshness state, not truth.

The adapter boundary should allow the public fixture provider to be replaced by a live provider without coupling scene components to transport or storage.

## Current public evidence

The World View repository demonstrates a deterministic fixture projection with semantic places, residents, activities, and attention states. It has no live Wonderful Digital World backend, persistence, authentication, identity policy, or production sanitization. The Wonderful Digital World repository defines freshness-aware, viewer-authorized projections in its public reference seam, but a live World View adapter remains planned.

## Acceptance criteria for a future live connection

- A published, versioned schema and compatibility policy.
- Server-side authorization and sanitization tests.
- Explicit current, stale, partial, unauthorized, invalid, and unavailable UI states.
- No fixture fallback in a live context.
- Stable identifiers and a canonical activity/attention taxonomy.
- Observable projection generation and delivery without leaking payload contents.
- Security and privacy review for identity and resident presentation.
- Distribution and dependency license review, including World View's GPL-3.0 terms.

## Public sources

- [Wonderful Digital World architecture](https://github.com/Wonderful-Digital-World/wonderful-digital-world/tree/main/docs)
- [Wonderful Digital World reference packages](https://github.com/Wonderful-Digital-World/wonderful-digital-world/tree/main/packages)
- [World View projection proof](https://github.com/Wonderful-Digital-World/world-view/blob/main/docs/wp3-world-projection.md)
- [World View repository](https://github.com/Wonderful-Digital-World/world-view)
