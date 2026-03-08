import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";

const BLOG_DIR = join(process.cwd(), "content", "blog");

type BlogPostFile = {
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  tags?: string[];
  coverImage?: string;
  body: string[];
};

export type BlogPost = BlogPostFile & {
  slug: string;
};

function readPostFile(slug: string): BlogPost | null {
  const filePath = join(BLOG_DIR, `${slug}.json`);

  if (!existsSync(filePath)) {
    return null;
  }

  const raw = readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw) as BlogPostFile;

  return {
    slug,
    ...parsed,
  };
}

export function getAllBlogSlugs(): string[] {
  if (!existsSync(BLOG_DIR)) {
    return [];
  }

  return readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => fileName.replace(/\.json$/, ""));
}

export function getAllBlogPosts(): BlogPost[] {
  return getAllBlogSlugs()
    .map((slug) => readPostFile(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((first, second) => {
      return (
        new Date(second.date).getTime() -
        new Date(first.date).getTime()
      );
    });
}

export function getBlogPost(slug: string): BlogPost | null {
  return readPostFile(slug);
}

export function getAllBlogTags(): string[] {
  const tags = new Set<string>();

  for (const post of getAllBlogPosts()) {
    for (const tag of post.tags ?? []) {
      tags.add(tag);
    }
  }

  return [...tags].sort((first, second) => first.localeCompare(second));
}

export function estimateReadingTimeMinutes(post: BlogPost): number {
  const fullText = [post.title, post.excerpt, ...post.body].join(" ");
  const words = fullText.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

export function getRelatedBlogPosts(
  slug: string,
  limit = 2
): BlogPost[] {
  const posts = getAllBlogPosts();
  const current = posts.find((post) => post.slug === slug);

  if (!current) {
    return posts.filter((post) => post.slug !== slug).slice(0, limit);
  }

  const currentTags = new Set(current.tags ?? []);

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sharedTagCount = (post.tags ?? []).filter((tag) =>
        currentTags.has(tag)
      ).length;

      return { post, sharedTagCount };
    })
    .sort((first, second) => {
      if (second.sharedTagCount !== first.sharedTagCount) {
        return second.sharedTagCount - first.sharedTagCount;
      }

      return (
        new Date(second.post.date).getTime() -
        new Date(first.post.date).getTime()
      );
    })
    .slice(0, limit)
    .map(({ post }) => post);
}
