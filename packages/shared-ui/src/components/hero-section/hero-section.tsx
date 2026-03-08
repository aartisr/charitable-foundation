"use client";

import { type AnimationType, useScrollReveal } from "../scroll-reveal";
import type { RoyalStyle } from "../royal/types";
import { RoyalCorners } from "../royal/royal-corners";
import { YantraBackground } from "../royal/yantra-background";

export type HeroVariant =
  | "centered"
  | "split-image"
  | "background-image"
  | "gradient-overlay"
  | "editorial"
  | "stacked-narrative"
  | "minimal-type"
  | "dark-split"
  | "dark-centered"
  | "dark-device";

export type HeroCta = {
  label: string;
  href: string;
};

export type HeroProofPoint = {
  value: string;
  label: string;
};

export type HeroHighlight = string | { text?: string };

export type HeroSectionProps = {
  variant: HeroVariant;
  heading: string;
  subheading: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  image: string;
  imageAlt: string;
  animation?: AnimationType;
  overlayOpacity?: number;
  minHeight?: string;
  highlights?: HeroHighlight[];
  proofPoints?: HeroProofPoint[];
  royalStyle?: RoyalStyle;
};

function CtaButtons({
  primaryCta,
  secondaryCta,
  highlights,
  proofPoints,
  align,
  inverted,
}: {
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  highlights?: HeroHighlight[];
  proofPoints?: HeroProofPoint[];
  align: "center" | "left";
  inverted?: boolean;
}) {
  const normalizedHighlights = (highlights ?? [])
    .map((highlight) =>
      typeof highlight === "string" ? highlight : highlight?.text || ""
    )
    .filter(Boolean);

  return (
    <div>
      <div
        className={`flex flex-wrap gap-3 mt-8 ${align === "center" ? "justify-center" : "justify-start"}`}
      >
        {primaryCta.label && (
          <a
            href={primaryCta.href}
            className={`px-6 py-3 text-base font-semibold rounded-full transition-opacity hover:opacity-90 ${
              inverted
                ? "bg-white text-primary"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {primaryCta.label}
          </a>
        )}
        {secondaryCta.label && (
          <a
            href={secondaryCta.href}
            className={`px-6 py-3 text-base font-semibold rounded-full border bg-transparent transition-colors hover:opacity-80 ${
              inverted ? "border-white/50 text-white" : "border-primary text-primary"
            }`}
          >
            {secondaryCta.label}
          </a>
        )}
      </div>

      {!!normalizedHighlights.length && (
        <ul
          className={`mt-5 flex flex-wrap gap-2 ${align === "center" ? "justify-center" : "justify-start"}`}
        >
          {normalizedHighlights.map((highlight, index) => (
            <li
              key={`${highlight}-${index}`}
              className={`px-3 py-1 rounded-full text-xs sm:text-sm border ${
                inverted ? "border-white/35 text-white/90" : "border-border text-muted-foreground"
              }`}
            >
              {highlight}
            </li>
          ))}
        </ul>
      )}

      {!!proofPoints?.length && (
        <div
          className={`mt-7 grid grid-cols-1 sm:grid-cols-3 gap-4 ${align === "center" ? "max-w-3xl mx-auto" : "max-w-2xl"}`}
        >
          {proofPoints.slice(0, 3).map((point, index) => (
            <div
              key={`${point.label}-${index}`}
              className={`rounded-xl px-4 py-3 border ${
                inverted ? "border-white/35" : "border-border"
              }`}
            >
              <p className={`text-xl sm:text-2xl font-semibold ${inverted ? "text-white" : "text-foreground"}`}>
                {point.value}
              </p>
              <p className={`text-xs sm:text-sm ${inverted ? "text-white/75" : "text-muted-foreground"}`}>
                {point.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Variant 1: Centered ────────────────────────────────── */
function CenteredHero({
  heading,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  highlights,
  proofPoints,
  image,
  imageAlt,
  animation = "fade-in",
}: HeroSectionProps) {
  const { ref, style: revealStyle } = useScrollReveal(animation);

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        {subheading && (
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-primary">
            {subheading}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
          {heading}
        </h1>
        {description && (
          <p className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto text-muted-foreground">
            {description}
          </p>
        )}
        <CtaButtons
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          highlights={highlights}
          proofPoints={proofPoints}
          align="center"
        />
        {image && (
          <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Variant 2: Split Image ─────────────────────────────── */
function SplitImageHero({
  heading,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  highlights,
  proofPoints,
  image,
  imageAlt,
  animation = "fade-in",
}: HeroSectionProps) {
  const { ref, style: revealStyle } = useScrollReveal(animation);

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          {subheading && (
            <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-primary">
              {subheading}
            </p>
          )}
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-foreground">
            {heading}
          </h1>
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
          <CtaButtons
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            highlights={highlights}
            proofPoints={proofPoints}
            align="left"
          />
        </div>
        {image && (
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover max-h-[560px]"
            />
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Variant 3: Background Image ────────────────────────── */
function BackgroundImageHero({
  heading,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  highlights,
  proofPoints,
  image,
  imageAlt,
  animation = "fade-in",
}: HeroSectionProps) {
  const { ref } = useScrollReveal(animation);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-[80vh]"
    >
      {/* Background image */}
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        {subheading && (
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/80">
            {subheading}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
          {heading}
        </h1>
        {description && (
          <p className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto text-white/85">
            {description}
          </p>
        )}
        <CtaButtons
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          highlights={highlights}
          proofPoints={proofPoints}
          align="center"
          inverted
        />
      </div>
    </section>
  );
}

/* ── Variant 4: Gradient Overlay ─────────────────────────── */
function GradientOverlayHero({
  heading,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  highlights,
  proofPoints,
  image,
  imageAlt,
  animation = "fade-in",
}: HeroSectionProps) {
  const { ref } = useScrollReveal(animation);

  return (
    <section
      ref={ref}
      className="relative flex items-center px-4 sm:px-6 lg:px-8 min-h-[80vh]"
    >
      {/* Background image */}
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      {/* Gradient overlay — left-heavy for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/15" />
      {/* Content pinned left */}
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <div className="max-w-xl">
          {subheading && (
            <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-white/80">
              {subheading}
            </p>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
            {heading}
          </h1>
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {description}
            </p>
          )}
          <CtaButtons
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            highlights={highlights}
            proofPoints={proofPoints}
            align="left"
            inverted
          />
        </div>
      </div>
    </section>
  );
}

/* ── Variant 5: Editorial (asymmetric grid) ──────────────── */
function EditorialHero({
  heading,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  highlights,
  proofPoints,
  image,
  imageAlt,
  animation = "fade-in",
}: HeroSectionProps) {
  const { ref, style: revealStyle } = useScrollReveal(animation);

  return (
    <section
      ref={ref}
      className="py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Asymmetric grid: 7/5 split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Large heading spanning left 7 columns */}
          <div className="lg:col-span-7">
            {subheading && (
              <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-primary">
                {subheading}
              </p>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight lg:leading-none tracking-tight text-foreground">
              {heading}
            </h1>
          </div>
          {/* Description + CTAs in the right 5 columns */}
          <div className="lg:col-span-5 lg:pb-2">
            {description && (
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
            <CtaButtons
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              highlights={highlights}
              proofPoints={proofPoints}
              align="left"
            />
          </div>
        </div>
        {/* Full-width image below */}
        {image && (
          <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-[260px] sm:h-[360px] lg:h-[520px] object-contain bg-transparent"
            />
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Variant 6: Stacked Narrative ────────────────────────── */
function StackedNarrativeHero({
  heading,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  highlights,
  proofPoints,
  image,
  imageAlt,
  animation = "fade-in",
}: HeroSectionProps) {
  const { ref, style: revealStyle } = useScrollReveal(animation);

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        {subheading && (
          <p className="text-sm font-semibold uppercase tracking-widest mb-8 text-primary">
            {subheading}
          </p>
        )}
        {/* Oversized heading — full width, left-aligned */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight lg:leading-none tracking-tight text-foreground">
          {heading}
        </h1>
        {/* Divider */}
        <div className="mt-10 mb-10 h-px w-full bg-border" />
        {/* Bottom row: description + image side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            {description && (
              <p className="text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
            <CtaButtons
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              highlights={highlights}
              proofPoints={proofPoints}
              align="left"
            />
          </div>
          {image && (
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover max-h-[400px]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Variant 7: Minimal Typography ──────────────────────── */
function MinimalTypeHero({
  heading,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  highlights,
  proofPoints,
  animation = "fade-in",
}: HeroSectionProps) {
  const { ref, style: revealStyle } = useScrollReveal(animation);

  return (
    <section
      ref={ref}
      className="flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-[70vh]"
    >
      <div className="max-w-5xl mx-auto text-center">
        {subheading && (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-6 text-primary">
            {subheading}
          </p>
        )}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight text-foreground">
          {heading}
        </h1>
        {description && (
          <p className="mt-8 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto text-muted-foreground">
            {description}
          </p>
        )}
        <CtaButtons
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          highlights={highlights}
          proofPoints={proofPoints}
          align="center"
        />
      </div>
    </section>
  );
}

/* ── Variant 8: Dark Split ────────────────────────────────
 *  Dark background, left-aligned bold text, right image (no frame).
 *  Inspired by modern SaaS / startup dark hero patterns.
 */
function DarkSplitHero({
  heading,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
  animation = "fade-in",
}: HeroSectionProps) {
  const { ref } = useScrollReveal(animation);

  return (
    <section
      ref={ref}
      className="relative flex items-center px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] min-h-[80vh]"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        {/* Text side */}
        <div>
          {subheading && (
            <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-primary">
              {subheading}
            </p>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
            {heading}
          </h1>
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              {description}
            </p>
          )}
          {/* Outline-style CTA buttons on dark */}
          <div className="flex flex-wrap gap-3 mt-8">
            {primaryCta.label && (
              <a
                href={primaryCta.href}
                className="px-6 py-3 text-base font-semibold rounded-full transition-all hover:scale-105 border border-primary text-primary bg-transparent"
              >
                {primaryCta.label} &rarr;
              </a>
            )}
            {secondaryCta.label && (
              <a
                href={secondaryCta.href}
                className="px-6 py-3 text-base font-semibold rounded-full border border-white/20 text-white/70 bg-transparent transition-colors hover:opacity-80"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>

        {/* Image side — rounded with subtle glow */}
        {image && (
          <div className="flex justify-center lg:justify-end">
            <div
              className="rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(var(--primary-rgb,100,50,50),0.15)]"
            >
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-auto object-cover max-h-[520px]"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Variant 9: Dark Centered ────────────────────────────
 *  Dark background, centered text, optional image below.
 *  Clean, dramatic, high-contrast.
 */
function DarkCenteredHero({
  heading,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  highlights,
  proofPoints,
  image,
  imageAlt,
  animation = "fade-in",
}: HeroSectionProps) {
  const { ref } = useScrollReveal(animation);

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] min-h-[80vh]"
    >
      {/* Subtle radial gradient glow behind content */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,color-mix(in_oklch,var(--primary)_8%,transparent),transparent)]" />
      <div className="relative max-w-4xl mx-auto text-center py-20">
        {subheading && (
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-primary">
            {subheading}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
          {heading}
        </h1>
        {description && (
          <p className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto text-white/60">
            {description}
          </p>
        )}
        <CtaButtons
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          highlights={highlights}
          proofPoints={proofPoints}
          align="center"
          inverted
        />
        {image && (
          <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Variant 10: Dark Device Mockup ──────────────────────
 *  Dark background, left text, right image inside a phone frame.
 *  Matches the original yoga-inspired style from the reference.
 */
function DarkDeviceHero({
  heading,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
  animation = "fade-in",
}: HeroSectionProps) {
  const { ref } = useScrollReveal(animation);

  return (
    <section
      ref={ref}
      className="relative flex items-center px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] min-h-[80vh]"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
        {/* Text side */}
        <div>
          {subheading && (
            <p className="text-sm font-semibold uppercase tracking-widest mb-4 text-primary">
              {subheading}
            </p>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            {heading}
          </h1>
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              {description}
            </p>
          )}
          <div className="flex flex-wrap gap-3 mt-8">
            {primaryCta.label && (
              <a
                href={primaryCta.href}
                className="px-6 py-3 text-base font-semibold rounded-full transition-all hover:scale-105 border border-primary text-primary bg-transparent"
              >
                {primaryCta.label} &rarr;
              </a>
            )}
            {secondaryCta.label && (
              <a
                href={secondaryCta.href}
                className="px-6 py-3 text-base font-semibold rounded-full border border-white/20 text-white/70 bg-transparent transition-colors hover:opacity-80"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>

        {/* Phone device mockup */}
        {image && (
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative w-[280px] max-w-full"
            >
              {/* Phone frame */}
              <div
                className="rounded-[2.5rem] p-3 shadow-2xl bg-[#1a1a1a] border-2 border-[#2a2a2a] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_25px_60px_rgba(0,0,0,0.6)]"
              >
                {/* Notch */}
                <div
                  className="mx-auto mb-2 rounded-full w-[80px] h-[6px] bg-[#2a2a2a]"
                />
                {/* Screen */}
                <div className="rounded-[1.75rem] overflow-hidden">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="w-full h-auto object-cover aspect-[9/16] max-h-[480px]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Main Component ─────────────────────────────────────── */
const variantMap: Record<HeroVariant, React.FC<HeroSectionProps>> = {
  centered: CenteredHero,
  "split-image": SplitImageHero,
  "background-image": BackgroundImageHero,
  "gradient-overlay": GradientOverlayHero,
  editorial: EditorialHero,
  "stacked-narrative": StackedNarrativeHero,
  "minimal-type": MinimalTypeHero,
  "dark-split": DarkSplitHero,
  "dark-centered": DarkCenteredHero,
  "dark-device": DarkDeviceHero,
};

export function HeroSection(props: HeroSectionProps) {
  const Variant = variantMap[props.variant] ?? CenteredHero;
  const royal = props.royalStyle ?? "none";

  if (royal === "none") {
    return <Variant {...props} />;
  }

  return (
    <div className="relative">
      <YantraBackground royalStyle={royal} />
      <RoyalCorners royalStyle={royal} />
      <Variant {...props} />
    </div>
  );
}
