import Link from "next/link";
import type { Metadata } from "next";
import { BlogListClient } from "@/components/blog/blog-list-client";
import { getAllBlogPosts, getAllBlogTags } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog | Harmony Hope Foundation",
  description:
    "Volunteer stories from the field, program updates, and transparent impact reporting.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Harmony Hope Foundation",
    description:
      "Volunteer stories from the field, program updates, and transparent impact reporting.",
    type: "website",
    url: absoluteUrl("/blog"),
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        alt: "Harmony Hope Foundation blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Harmony Hope Foundation",
    description:
      "Volunteer stories from the field, program updates, and transparent impact reporting.",
    images: [absoluteUrl("/twitter-image")],
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const tags = getAllBlogTags();

  return (
    <main id="main-content" className="min-h-screen bg-[var(--background)] site-shell">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-12 md:py-14">
        <div className="mb-10 rounded-2xl border border-[color:var(--border)] bg-[color:color-mix(in_oklch,var(--card)_92%,transparent)] p-6 sm:p-8 md:p-10">
          <Link
            href="/"
            className="text-sm font-medium text-[color:var(--primary)] hover:underline"
          >
            ← Back to Home
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[color:var(--foreground)]">
            Blog
          </h1>
          <p className="mt-3 text-base text-[color:var(--muted-foreground)]">
            Volunteer stories, kindness-in-action updates, and measurable impact insights.
          </p>
          <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
            {posts.length} published posts • {tags.length} active themes
          </p>
        </div>

        <BlogListClient posts={posts} tags={tags} />

        <section className="mt-10 rounded-xl border p-6 border-[color:var(--border)] bg-[var(--card)]">
          <h2 className="text-lg font-semibold text-[color:var(--foreground)]">
            Partner & Donor Inquiries
          </h2>
          <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
            For donation partnerships, volunteering, and institutional collaboration, contact our team.
          </p>
          <div className="mt-3">
            <Link href="/support-center" className="text-sm font-semibold text-[color:var(--primary)]">
              Go to Support Center →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
