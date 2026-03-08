"use client";

import { useState } from "react";

type ShareButtonsProps = {
  url: string;
  title: string;
};

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2" aria-label="Share this article">
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this article on LinkedIn"
        className="text-xs rounded-full px-3 py-1.5 border border-[color:var(--border)] text-[color:var(--muted-foreground)] hover:text-[color:var(--primary)]"
      >
        Share on LinkedIn
      </a>
      <a
        href={shareLinks.x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this article on X"
        className="text-xs rounded-full px-3 py-1.5 border border-[color:var(--border)] text-[color:var(--muted-foreground)] hover:text-[color:var(--primary)]"
      >
        Share on X
      </a>
      <a
        href={shareLinks.email}
        aria-label="Share this article by email"
        className="text-xs rounded-full px-3 py-1.5 border border-[color:var(--border)] text-[color:var(--muted-foreground)] hover:text-[color:var(--primary)]"
      >
        Share via Email
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy article link"
        className="text-xs rounded-full px-3 py-1.5 border border-[color:var(--border)] text-[color:var(--muted-foreground)] hover:text-[color:var(--primary)]"
      >
        {copied ? "Link Copied" : "Copy Link"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
