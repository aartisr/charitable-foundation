import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageData } from "@/lib/get-page-data";
import { resolvePageSlug } from "@/lib/resolve-path";
import { PuckRenderer } from "@/lib/puck-render";
import { absoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ puckPath?: string[] }>;
};

function slugToTitle(slug: string): string {
  if (slug === "homepage") {
    return "Harmony Hope Foundation | Donate for Measurable Community Impact";
  }

  return `${slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())} | Harmony Hope Foundation`;
}

function extractPageDescription(data: ReturnType<typeof getPageData>, slug: string): string {
  const content = Array.isArray(data?.content)
    ? (data?.content as Array<{ type?: string; props?: Record<string, unknown> }>)
    : [];

  const hero = content.find((block) => block.type === "HeroSection");
  const about = content.find((block) => block.type === "AboutSection");
  const fallback =
    slug === "homepage"
      ? "Support a transparent charitable foundation delivering measurable impact through education support, family essentials, and volunteer-led community programs."
      : "Explore Harmony Hope Foundation programs, updates, and practical ways to support communities through donations and volunteering.";

  const heroDescription =
    typeof hero?.props?.description === "string" ? hero.props.description : "";
  if (heroDescription.trim()) {
    return heroDescription.trim().slice(0, 260);
  }

  const aboutBody = typeof about?.props?.body === "string" ? about.props.body : "";
  if (aboutBody.trim()) {
    return aboutBody.replace(/\s+/g, " ").trim().slice(0, 260);
  }

  return fallback;
}

function extractPageImage(data: ReturnType<typeof getPageData>): string {
  const content = Array.isArray(data?.content)
    ? (data?.content as Array<{ type?: string; props?: Record<string, unknown> }>)
    : [];

  const hero = content.find((block) => block.type === "HeroSection");
  const heroImage = typeof hero?.props?.image === "string" ? hero.props.image : "";
  if (heroImage.trim()) {
    return heroImage;
  }

  return absoluteUrl("/opengraph-image");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { puckPath } = await params;
  const slug = resolvePageSlug(puckPath);
  const data = getPageData(slug);

  if (!data) {
    return {
      title: "Page Not Found | Harmony Hope Foundation",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const path = slug === "homepage" ? "/" : `/${slug}`;
  const title = slugToTitle(slug);
  const description = extractPageDescription(data, slug);
  const image = extractPageImage(data);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      type: "website",
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { puckPath } = await params;
  const slug = resolvePageSlug(puckPath);
  const data = getPageData(slug);

  if (!data) {
    notFound();
  }

  const path = slug === "homepage" ? "/" : `/${slug}`;
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: slugToTitle(slug).replace(" | Harmony Hope Foundation", ""),
    url: absoluteUrl(path),
    description: extractPageDescription(data, slug),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <PuckRenderer data={data} />
    </>
  );
}
