"use client";

import { Icon } from "../icon-map";
import { type AnimationType, useScrollReveal } from "../scroll-reveal";
import type { RoyalStyle } from "../royal/types";
import { YantraBackground } from "../royal/yantra-background";

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export type FeaturesGridProps = {
  heading: string;
  description: string;
  features: Feature[];
  columns: 2 | 3 | 4;
  animation?: AnimationType;
  royalStyle?: RoyalStyle;
};

const columnClasses: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function FeaturesGrid({
  heading,
  description,
  features,
  columns,
  animation = "slide-up",
  royalStyle = "none",
}: FeaturesGridProps) {
  const gridClass = columnClasses[columns] ?? columnClasses[3];
  const { ref } = useScrollReveal(animation);

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background)]"
    >
      {royalStyle !== "none" && <YantraBackground royalStyle={royalStyle} />}
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        {(heading || description) && (
          <div className="text-center mb-14">
            {heading && (
              <h2
                className="text-3xl sm:text-4xl font-bold text-[color:var(--text-primary)]"
              >
                {heading}
              </h2>
            )}
            {description && (
              <p
                className="mt-4 text-lg max-w-2xl mx-auto text-[color:var(--text-secondary)]"
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Feature cards */}
        <div className={`grid ${gridClass} gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col p-6 rounded-2xl bg-[var(--surface)] ${royalStyle === "ornate" ? "border border-[var(--royal-gold)]" : "border border-[var(--border)]"}`}
            >
              {feature.icon && (
                <div
                  className="text-3xl mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-[color:color-mix(in_oklch,var(--primary)_12%,transparent)] text-[var(--primary)]"
                >
                  <Icon name={feature.icon} size={24} />
                </div>
              )}
              <h3
                className="text-lg font-semibold mb-2 text-[color:var(--text-primary)]"
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed text-[color:var(--text-secondary)]"
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
