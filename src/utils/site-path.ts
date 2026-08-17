export function withBasePath(href: string, basePath = "/") {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const base = `/${basePath.replace(/^\/+|\/+$/g, "")}`;
  if (base === "/") return href;
  if (href === base || href.startsWith(`${base}/`)) return href;
  if (href === "/") return `${base}/`;
  return `${base}${href}`;
}
