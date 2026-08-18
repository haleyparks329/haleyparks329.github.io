import { XMLParser } from "fast-xml-parser";
import { siteConfig } from "@/site.config";
import { cachedSubstackPosts } from "@/data/substack-feed-cache";

export type WritingPost = {
  title: string;
  url: string;
  publishedAt: Date;
  excerpt?: string;
  image?: string;
};

type FeedItem = Record<string, unknown>;

const RETRY_DELAYS_MS = [0, 750, 2_000] as const;
const REQUEST_TIMEOUT_MS = 8_000;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

const textValue = (value: unknown): string | undefined => {
  if (typeof value === "string") return value.trim() || undefined;
  if (typeof value === "number") return String(value);
  return undefined;
};

const validUrl = (value: unknown): string | undefined => {
  const candidate = textValue(value);
  if (!candidate) return undefined;

  try {
    return new URL(candidate).toString();
  } catch {
    return undefined;
  }
};

const excerptFromHtml = (value: unknown): string | undefined => {
  const html = textValue(value);
  if (!html) return undefined;

  const excerpt = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

  if (!excerpt) return undefined;
  return excerpt.length > 240 ? `${excerpt.slice(0, 237).trimEnd()}…` : excerpt;
};

const imageFromItem = (item: FeedItem): string | undefined => {
  const enclosure = item.enclosure;
  if (enclosure && typeof enclosure === "object") {
    const enclosureUrl = validUrl((enclosure as FeedItem)["@_url"]);
    if (enclosureUrl) return enclosureUrl;
  }

  const media = item["media:content"];
  if (media && typeof media === "object") {
    const mediaUrl = validUrl((media as FeedItem)["@_url"]);
    if (mediaUrl) return mediaUrl;
  }

  const description = textValue(item.description);
  const imageMatch = description?.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imageMatch ? validUrl(imageMatch[1]) : undefined;
};

const normalizeItem = (item: FeedItem): WritingPost | undefined => {
  const title = textValue(item.title);
  const url = validUrl(item.link);
  const publishedAt = new Date(textValue(item.pubDate) ?? "");

  if (!title || !url || Number.isNaN(publishedAt.getTime())) return undefined;

  return {
    title,
    url,
    publishedAt,
    excerpt: excerptFromHtml(item.description),
    image: imageFromItem(item),
  };
};

const parseFeed = (xml: string): WritingPost[] => {
  const parsed = parser.parse(xml) as {
    rss?: { channel?: { item?: FeedItem | FeedItem[] } };
  };
  const rawItems = parsed.rss?.channel?.item;
  const items = rawItems
    ? Array.isArray(rawItems)
      ? rawItems
      : [rawItems]
    : [];

  return items
    .map(normalizeItem)
    .filter((post): post is WritingPost => Boolean(post))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
};

const cachedPosts = (): WritingPost[] =>
  cachedSubstackPosts.map((post) => ({
    ...post,
    publishedAt: new Date(post.publishedAt),
  }));

const wait = (delayMs: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, delayMs));

const fetchFeed = async (feedUrl: string): Promise<WritingPost[]> => {
  let lastError: unknown;

  for (const [index, delayMs] of RETRY_DELAYS_MS.entries()) {
    if (delayMs > 0) await wait(delayMs);

    try {
      const response = await fetch(feedUrl, {
        headers: {
          Accept:
            "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.1",
          "Accept-Language": "en-US,en;q=0.9",
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const posts = parseFeed(await response.text());
      if (posts.length === 0) throw new Error("Feed contained no valid posts");
      return posts;
    } catch (error) {
      lastError = error;
      if (index < RETRY_DELAYS_MS.length - 1) continue;
    }
  }

  throw lastError;
};

export async function getSubstackPosts(): Promise<WritingPost[]> {
  const feedUrl =
    import.meta.env.SUBSTACK_FEED_URL || siteConfig.substackFeedUrl;

  try {
    return await fetchFeed(feedUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const fallbackPosts = cachedPosts();
    console.warn(
      `[writing] Unable to load Substack feed from ${feedUrl}: ${message}. Using ${fallbackPosts.length} cached posts.`,
    );
    return fallbackPosts;
  }
}
