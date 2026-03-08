import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  estimateReadingTimeMinutes,
  getAllBlogSlugs,
  getBlogPost,
  getRelatedBlogPosts,
} from "@/lib/blog";
import { ShareButtons } from "@/components/blog/share-buttons";
import { absoluteUrl } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Harmony Hope Foundation",
    };
  }

  return {
    title: `${post.title} | Harmony Hope Foundation`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.date,
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              alt: post.title,
            },
          ]
        : [
            {
              url: absoluteUrl("/opengraph-image"),
              alt: post.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [absoluteUrl("/twitter-image")],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const readingTimeMinutes = estimateReadingTimeMinutes(post);
  const relatedPosts = getRelatedBlogPosts(post.slug, 2);
  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author ?? "Harmony Hope Foundation",
    },
    publisher: {
      "@type": "Organization",
      name: "Harmony Hope Foundation",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.ico"),
      },
    },
    mainEntityOfPage: postUrl,
    image: post.coverImage || absoluteUrl("/opengraph-image"),
  };

  return (
    <main id="main-content" className="min-h-screen bg-[var(--background)] site-shell">
      <article className="max-w-3xl mx-auto px-4 py-10 sm:py-12 md:py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="mb-8 rounded-2xl border border-[color:var(--border)] bg-[color:color-mix(in_oklch,var(--card)_94%,transparent)] p-5 sm:p-7 md:p-8">
          <Link
            href="/blog"
            className="text-sm font-medium text-[color:var(--primary)] hover:underline"
          >
            ← Back to Blog
          </Link>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[color:var(--foreground)]">
            {post.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted-foreground)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.author ?? "Harmony Hope Foundation"}</span>
            <span>•</span>
            <span>{readingTimeMinutes} min read</span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs rounded-full px-3 py-1 border border-[color:var(--border)] text-[color:var(--muted-foreground)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5">
            <ShareButtons url={postUrl} title={post.title} />
          </div>
        </div>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-2xl mb-8"
          />
        )}

        <div className="space-y-5 text-base leading-8 text-[color:var(--foreground)]">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-12 border-t pt-8 border-[color:var(--border)]">
            <h2 className="text-xl font-semibold text-[color:var(--foreground)]">
              Related Reading
            </h2>
            <div className="mt-4 grid gap-4">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.slug}
                  className="rounded-lg border p-4 border-[color:var(--border)] bg-[var(--card)]"
                >
                  <h3 className="font-semibold text-[color:var(--foreground)]">
                    <Link href={`/blog/${relatedPost.slug}`} className="hover:underline">
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                    {relatedPost.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
