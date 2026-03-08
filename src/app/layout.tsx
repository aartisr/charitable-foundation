import type { Metadata } from "next";
import "./globals.css";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Harmony Hope Foundation | Donate for Measurable Community Impact",
    template: "%s | Harmony Hope Foundation",
  },
  description:
    "Support a transparent charitable foundation delivering measurable impact through education support, family essentials, and volunteer-led community programs.",
  keywords: [
    "charity",
    "nonprofit",
    "donate",
    "monthly donor",
    "volunteer",
    "community impact",
    "education support",
    "family essentials",
    "charitable foundation",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Harmony Hope Foundation | Donate for Measurable Community Impact",
    description:
      "Give with confidence through clear impact reporting, strong stewardship, and donor-first transparency.",
    url: absoluteUrl("/"),
    siteName: "Harmony Hope Foundation",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Harmony Hope Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmony Hope Foundation | Donate for Measurable Community Impact",
    description:
      "Support measurable community impact through transparent, dignity-first charitable programs.",
    images: [absoluteUrl("/twitter-image")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Harmony Hope Foundation",
    url: getSiteUrl(),
    logo: absoluteUrl("/favicon.ico"),
    sameAs: [],
    description:
      "A transparent charitable foundation delivering measurable impact through education support, family essentials, and volunteer-led community programs.",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Harmony Hope Foundation",
    url: getSiteUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${getSiteUrl()}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <p className="pointer-events-none w-full px-4 pb-3 text-right text-[10px] text-[var(--muted-foreground)] opacity-60">
          Designed by Aarti Sri Ravikumar
        </p>
      </body>
    </html>
  );
}
