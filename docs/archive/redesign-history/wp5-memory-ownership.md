# WP5 memory ownership

| Concern                             | Owner                     | Notes                                                                                   |
| ----------------------------------- | ------------------------- | --------------------------------------------------------------------------------------- |
| Candidate facts and source evidence | Producing system          | A producer remains authoritative for what happened.                                     |
| Portable candidate/public types     | `wonderful-digital-world` | Defines stable IDs, provenance, decisions, and the public DTO/schema.                   |
| Significance recommendation         | Bridget evaluator         | Advisory only; malformed output becomes abstention.                                     |
| Publication decision                | Named human reviewer      | WP5 requires explicit approval. Evaluators cannot publish.                              |
| Sanitization and export             | Bridget                   | Applies the allowlist, validates evidence, and writes atomically with retry.            |
| Public presentation                 | Website                   | Renders the projection without accessing private stores or reconstructing omitted data. |

Bridget owns the workflow, not the underlying facts or authorship. A candidate can be rejected or left pending without changing its source record.

Automatic publication is deliberately disabled in WP5. A future policy could make low-risk cases eligible, but it must be introduced as a separate reviewed change.
