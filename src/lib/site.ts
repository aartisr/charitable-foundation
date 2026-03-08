export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelUrl) {
    const withProtocol = /^https?:\/\//.test(vercelUrl)
      ? vercelUrl
      : `https://${vercelUrl}`;
    return withProtocol.replace(/\/$/, "");
  }

  const legacyVercelUrl = process.env.VERCEL_URL?.trim();
  if (legacyVercelUrl) {
    const withProtocol = /^https?:\/\//.test(legacyVercelUrl)
      ? legacyVercelUrl
      : `https://${legacyVercelUrl}`;
    return withProtocol.replace(/\/$/, "");
  }

  return "https://example.com";
}

export function absoluteUrl(path: string) {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
