# WP4 Writing Corpus Audit

This audit covers every entry in `src/content/writing`. Published work remains public; evolving drafts remain excluded from routes and library counts.

| Slug                                                         | Title                                                      | Current URL                                  | Date       | Current metadata            | Themes                                                | Project                         | External   | Migration notes                                                                                 |
| ------------------------------------------------------------ | ---------------------------------------------------------- | -------------------------------------------- | ---------- | --------------------------- | ----------------------------------------------------- | ------------------------------- | ---------- | ----------------------------------------------------------------------------------------------- |
| `i-did-not-want-another-app`                                 | I Did Not Want Another App                                 | `/writing/i-did-not-want-another-app/`       | 2026-07-20 | published, featured, 8 min  | orchestration, context, personal AI                   | Bridget                         | repository | Add stable ID, two collections, and explicit project/writing relationships.                     |
| `what-i-built-instead-of-an-agent`                           | What I Built Instead of an Agent                           | `/writing/what-i-built-instead-of-an-agent/` | 2026-07-20 | published, featured, 12 min | deterministic systems, evidence, human reconciliation | Bridget                         | repository | Add stable ID, two collections, and explicit project/writing relationships.                     |
| `why-fika-jobs-felt-familiar`                                | Why Fika Jobs Felt Familiar                                | `/writing/why-fika-jobs-felt-familiar/`      | 2026-07-17 | published, featured, 7 min  | career intelligence, knowledge graphs, humane hiring  | Career Intelligence             | Fika Jobs  | Preserve the independent-research disclaimer; represent Fika as a source, not a canonical host. |
| `extending-deterministic-replay-with-an-investigation-layer` | Extending Deterministic Replay with an Investigation Layer | `/projects/qa-agents/meticulous/`            | 2026-07-16 | published, route-backed     | replay evidence, investigation policy, human review   | QA Agents                       | none       | Keep the project route canonical and render the complete content there.                         |
| `attention-is-the-scarce-resource`                           | Attention Is the Scarce Resource                           | excluded (draft)                             | 2026-07-14 | evolving, draft, 4 min      | attention, personal AI, human agency                  | QA Agents (legacy)              | none       | Keep private. Curate collections before publication; revisit the overly narrow project link.    |
| `the-desk-as-workbench`                                      | The Desk as Workbench                                      | excluded (draft)                             | 2026-07-13 | evolving, draft, 2 min      | public work, portfolio, design systems                | `website` (invalid legacy slug) | none       | Keep private; repair the project slug to `this-website`.                                        |

## Recommended collections

- **Keeping Context** — systems that preserve continuity across fragmented information, tools, and time.
- **Evidence Before Autonomy** — deterministic foundations, inspection, and human authority before agentic action.
- **Tools for Whole People** — technology that models lived context rather than reducing people to transactions or records.

Each recommended collection has at least two published members and emerges from repeated concerns in the current corpus.

## Cleanup and canonical decisions

- Use stable `writingId` values independent of URLs.
- Keep local canonical URLs for all four published pieces. The replay essay's canonical route remains `/projects/qa-agents/meticulous/`.
- Model external references separately from canonical URLs. Fika Jobs is a named source; repositories remain supporting links.
- Replace implicit `relatedProject` navigation with typed, editorially curated relationships while retaining the legacy field temporarily for compatibility.
- Correct the draft desk note's invalid `website` project slug.

## Excluded from WP4

- The two drafts remain unpublished.
- Memories, a world-view page, search, filtering, CMS work, and automatic recommendation logic are deferred.
- Essay prose is not rewritten as part of this migration.
