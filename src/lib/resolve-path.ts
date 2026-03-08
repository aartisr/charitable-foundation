/**
 * Resolves a URL path segments array to a content file name.
 * - [] or undefined -> "homepage"
 * - ["about"] -> "about"
 * - ["privacy-policy"] -> "privacy-policy"
 */
export function resolvePageSlug(puckPath?: string[]): string {
  if (!puckPath || puckPath.length === 0) return "homepage";
  return puckPath.join("-");
}
