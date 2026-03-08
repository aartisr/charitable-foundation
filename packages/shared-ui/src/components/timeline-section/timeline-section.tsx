"use client";

import { useState } from "react";
import { type AnimationType, useScrollReveal } from "../scroll-reveal";
import type { RoyalStyle } from "../royal/types";
import { RoyalCorners } from "../royal/royal-corners";
import { RoyalDivider } from "../royal/royal-divider";

export type TimelineVariant = "alternating" | "left" | "centered";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  image: string;
};

export type TimelineSectionProps = {
  heading: string;
  description: string;
  items: TimelineItem[];
  variant: TimelineVariant;
  animation: AnimationType;
  royalStyle?: RoyalStyle;
};

function TimelineCard({
  item,
  index,
  side,
  animation,
  royalStyle = "none",
}: {
  item: TimelineItem;
  index: number;
  side: "left" | "right" | "center";
  animation: AnimationType;
  royalStyle?: RoyalStyle;
}) {
  const [expanded, setExpanded] = useState(index === 0);
  const revealAnimation: AnimationType =
    animation === "none"
      ? "none"
      : side === "left"
        ? "slide-right"
        : side === "right"
          ? "slide-left"
          : animation;

  const { ref } = useScrollReveal(revealAnimation);

  return (
    <div
      ref={ref}
      className={`relative flex ${
        side === "right"
          ? "md:justify-end md:text-left"
          : side === "left"
            ? "md:justify-start md:text-right"
            : "justify-center"
      }`}
    >
      <div
        className={`relative w-full cursor-pointer overflow-hidden rounded-xl bg-[var(--card)] md:w-5/12 ${
          royalStyle === "ornate"
            ? "border border-[var(--royal-gold)]"
            : "border border-[var(--border)]"
        }`}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {royalStyle === "ornate" && <RoyalCorners royalStyle="subtle" />}
        {/* Year badge */}
        <div className="bg-[color:color-mix(in_oklch,var(--primary)_12%,transparent)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
          {item.year}
        </div>

        {/* Card body */}
        <div className="px-5 py-4">
          <h3 className="mb-1 text-lg font-semibold text-[var(--text-primary)]">
            {item.title}
          </h3>

          {/* Expandable description */}
          <div className={`overflow-hidden transition-[max-height] duration-300 ${expanded ? "max-h-96" : "max-h-0"}`}>
            <div className="overflow-hidden">
              <p className="pb-2 pt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.description}
              </p>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mt-2"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TimelineSection({
  heading,
  description,
  items,
  variant = "alternating",
  animation = "slide-up",
  royalStyle = "none",
}: TimelineSectionProps) {
  return (
    <section className="bg-[var(--background)] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        {(heading || description) && (
          <div className="text-center mb-14">
            {heading && (
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
                {description}
              </p>
            )}
          </div>
        )}

        {royalStyle !== "none" && (heading || description) && (
          <RoyalDivider royalStyle={royalStyle} />
        )}

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-[var(--border)] md:left-1/2" />

          <div className="flex flex-col gap-10">
            {items.map((item, index) => {
              const side: "left" | "right" | "center" =
                variant === "centered"
                  ? "center"
                  : variant === "left"
                    ? "right"
                    : index % 2 === 0
                      ? "right"
                      : "left";

              return (
                <div key={index} className="relative pl-10 md:pl-0">
                  {/* Dot on the line */}
                  <div
                    className="absolute left-4 top-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--primary)] shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_20%,transparent)] md:left-1/2"
                  />

                  <TimelineCard
                    item={item}
                    index={index}
                    side={side}
                    animation={animation}
                    royalStyle={royalStyle}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
