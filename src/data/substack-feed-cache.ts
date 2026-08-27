// Last-known-good posts keep the writing page deployable when Substack blocks
// requests from GitHub-hosted runners. Live feed sources are always tried first.
export const cachedSubstackPosts = [
  {
    title: "I Don’t Want to Be a Woman in Tech",
    url: "https://haleyparks329.substack.com/p/i-dont-want-to-be-a-woman-in-tech",
    publishedAt: "2026-08-24T14:42:43.490Z",
    excerpt:
      "I want to be a woman who happens to work in tech — and help make the regular room feel like it belongs to all of us.",
  },
  {
    title: "I Am Not a Markdown File",
    url: "https://haleyparks329.substack.com/p/i-am-not-a-markdown-file",
    publishedAt: "2026-08-20T10:10:09.652Z",
    excerpt:
      "What building persistent agents taught me about memory, models, and how I actually want computers to know me.",
  },
  {
    title: "Questions I’ve Been Asking Myself",
    url: "https://haleyparks329.substack.com/p/questions-ive-been-asking-myself",
    publishedAt: "2026-08-17T17:14:24.374Z",
    excerpt: "On work, ambition, and figuring out where I fit",
  },
  {
    title: "Why is the Human Still the Orchestration Layer?",
    url: "https://haleyparks329.substack.com/p/why-is-the-human-still-the-orchestration",
    publishedAt: "2026-08-12T17:46:19.618Z",
    excerpt:
      "My biggest gripe with software today is that I am still doing the work.",
  },
] as const;
