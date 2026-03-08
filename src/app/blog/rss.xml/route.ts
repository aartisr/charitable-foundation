import { getAllBlogPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllBlogPosts();

  const rssItems = posts
    .map((post) => {
      const postUrl = absoluteUrl(`/blog/${post.slug}`);
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${postUrl}</link>
          <guid>${postUrl}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description><![CDATA[${post.excerpt}]]></description>
        </item>
      `;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Harmony Hope Foundation Blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>Stories, updates, and impact notes from Harmony Hope Foundation.</description>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
