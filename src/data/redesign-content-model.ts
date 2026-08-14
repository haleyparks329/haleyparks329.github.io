/**
 * WP1 reference model for the redesigned editorial system.
 * These types are intentionally not wired into the current Astro collections yet.
 */

export type DisclosureDepth = "D0" | "D1" | "D2" | "D3";
export type PublicationStatus = "draft" | "review" | "published" | "archived";

export type ContentReference =
  | {
      kind: "internal";
      collection: "projects" | "writing" | "memories";
      id: string;
    }
  | { kind: "external"; url: string };

export interface ContentRelationship {
  predicate:
    | "explains"
    | "demonstrates"
    | "informed-by"
    | "continues"
    | "related-to"
    | "remembers";
  target: ContentReference;
  note?: string;
}

export type Authorship =
  | {
      mode: "human";
      byline: string;
    }
  | {
      mode: "agent-assisted";
      byline: string;
      agentName: string;
      reviewedBy: string;
      sourceRevision: string;
    };

export interface EditorialRecord {
  id: string;
  title: string;
  summary: string;
  path: `/${string}`;
  status: PublicationStatus;
  depth: DisclosureDepth;
  createdAt: string;
  updatedAt: string;
  topics: string[];
  relationships: ContentRelationship[];
  authorship: Authorship;
}

export interface ProjectEvidence {
  kind: "repository" | "demo" | "document" | "dataset" | "image" | "validation";
  label: string;
  url: string;
  checkedAt?: string;
}

export interface ProjectRecord extends EditorialRecord {
  recordType: "project";
  kind: "flagship" | "system" | "experiment" | "infrastructure";
  stage: "active" | "maintained" | "paused" | "complete" | "archived";
  premise: string;
  evidence: ProjectEvidence[];
}

export interface WritingRecord extends EditorialRecord {
  recordType: "writing";
  format: "essay" | "note" | "field-report" | "investigation" | "documentation";
  publishedAt?: string;
  readingMinutes?: number;
}

export interface MemoryRecord extends EditorialRecord {
  recordType: "memory";
  capturedAt: string;
  sourceContext: string;
  place?: string;
  privacy: "public" | "restricted" | "private";
}

export type RedesignContentRecord =
  ProjectRecord | WritingRecord | MemoryRecord;
