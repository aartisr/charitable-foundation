import React from "react";

export type BlogPost = {
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  date: string;
  href: string;
};

export type BlogSectionProps = {
  anchorId?: string;
  heading: string;
  description: string;
  posts: BlogPost[];
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function BlogSection({
  anchorId = "blog",
  heading,
  description,
  posts,
}: BlogSectionProps) {
  return (
    <section id={anchorId} className="w-full py-16 px-4 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {(heading || description) && (
          <div className="mb-12 text-center max-w-2xl mx-auto">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-[color:var(--foreground)]">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-base md:text-lg leading-relaxed text-[color:var(--muted-foreground)]">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.href}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all hover:-translate-y-1 bg-[var(--card)] border border-[color:var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            >
              {/* Image */}
              {post.image && (
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                {post.date && (
                  <time
                    dateTime={post.date}
                    className="text-xs font-medium uppercase tracking-wider mb-3 text-[color:var(--primary)]"
                  >
                    {formatDate(post.date)}
                  </time>
                )}
                <h3 className="text-lg font-semibold leading-snug mb-2 group-hover:underline text-[color:var(--foreground)]">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm leading-relaxed line-clamp-3 flex-1 text-[color:var(--muted-foreground)]">
                    {post.excerpt}
                  </p>
                )}
                <span className="mt-4 text-sm font-semibold inline-flex items-center gap-1 text-[color:var(--primary)]">
                  Read more
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
