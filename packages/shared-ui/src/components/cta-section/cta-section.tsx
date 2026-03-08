import React from "react";
import type { RoyalStyle } from "../royal/types";
import { RoyalCorners } from "../royal/royal-corners";
import { YantraBackground } from "../royal/yantra-background";

export type CtaLink = {
  label: string;
  href: string;
};

export type CtaSectionProps = {
  variant: "banner" | "split";
  heading: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  royalStyle?: RoyalStyle;
};

function PrimaryButton({ label, href }: CtaLink) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-[var(--primary-foreground,#fff)] transition-all hover:opacity-90 active:scale-[0.98]"
    >
      {label}
    </a>
  );
}

function SecondaryButton({ label, href }: CtaLink) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-transparent px-8 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-all hover:opacity-80 active:scale-[0.98]"
    >
      {label}
    </a>
  );
}

export function CtaSection({
  variant,
  heading,
  description,
  primaryCta,
  secondaryCta,
  royalStyle = "none",
}: CtaSectionProps) {
  if (variant === "banner") {
    return (
      <section className="w-full py-20 px-4">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[linear-gradient(135deg,var(--primary)_0%,color-mix(in_oklch,var(--primary)_70%,var(--secondary,#6366f1))_100%)] px-8 py-16 text-center">
          {royalStyle !== "none" && <YantraBackground royalStyle={royalStyle} />}
          {royalStyle !== "none" && <RoyalCorners royalStyle={royalStyle} />}
          <h2 className="relative z-[2] mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {heading}
          </h2>
          {description && (
            <p className="relative z-[2] mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              {description}
            </p>
          )}
          <div className="relative z-[2] flex justify-center gap-3 sm:flex-row flex-col">
            {primaryCta?.label && (
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[var(--primary)] transition-all hover:opacity-90 active:scale-[0.98]"
              >
                {primaryCta.label}
              </a>
            )}
            {secondaryCta?.label && (
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-white/50 bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Split variant
  return (
    <section className="w-full bg-[var(--card)] py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text side */}
        <div className="flex-1 max-w-xl">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
            {heading}
          </h2>
          {description && (
            <p className="text-base leading-relaxed text-[var(--muted-foreground)]">
              {description}
            </p>
          )}
        </div>

        {/* CTA side */}
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          {primaryCta?.label && (
            <PrimaryButton label={primaryCta.label} href={primaryCta.href} />
          )}
          {secondaryCta?.label && (
            <SecondaryButton
              label={secondaryCta.label}
              href={secondaryCta.href}
            />
          )}
        </div>
      </div>
    </section>
  );
}
