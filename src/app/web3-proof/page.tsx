import Link from "next/link";
import type { Metadata } from "next";
import { WalletProofClient } from "@/components/web3/wallet-proof-client";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web3 Proof | Aarti Sri Ravikumar",
  description:
    "Wallet-based verification proof for academic profile authenticity.",
  alternates: {
    canonical: "/web3-proof",
  },
  openGraph: {
    title: "Web3 Proof | Aarti Sri Ravikumar",
    description:
      "Wallet-based verification proof for academic profile authenticity.",
    type: "website",
    url: absoluteUrl("/web3-proof"),
  },
  twitter: {
    card: "summary",
    title: "Web3 Proof | Aarti Sri Ravikumar",
    description:
      "Wallet-based verification proof for academic profile authenticity.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Web3ProofPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--background)] site-shell">
      <div className="max-w-3xl mx-auto px-4 py-10 sm:py-12">
        <Link
          href="/"
          className="text-sm font-medium text-[color:var(--primary)] hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-[color:var(--foreground)]">
          Web3 Verification Proof
        </h1>

        <p className="mt-3 text-base text-[color:var(--muted-foreground)]">
          This page provides a practical Web3-style identity signal: wallet control + cryptographic signature proof.
        </p>

        <div className="mt-8">
          <WalletProofClient />
        </div>
      </div>
    </main>
  );
}
