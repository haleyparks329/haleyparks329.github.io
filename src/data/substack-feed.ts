import { XMLParser } from "fast-xml-parser";
import { siteConfig } from "@/site.config";

export type WritingPost = {
  title: string;
  url: string;
  publishedAt: Date;
  excerpt?: string;
  image?: string;
};

type FeedItem = Record<string, unknown>;

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

export async function getSubstackPosts(): Promise<WritingPost[]> {
  const feedUrl =
    import.meta.env.SUBSTACK_FEED_URL || siteConfig.substackFeedUrl;

  try {
    const response = await fetch(feedUrl, {
      headers: { Accept: "application/rss+xml, application/xml;q=0.9" },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const parsed = parser.parse(await response.text()) as {
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
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(
      `[writing] Unable to load Substack feed from ${feedUrl}: ${message}`,
    );
    return [];
  }
}
