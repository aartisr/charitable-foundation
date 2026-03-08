"use client";

import { type AnimationType, useScrollReveal } from "../scroll-reveal";
import type { RoyalStyle } from "../royal/types";
import { RoyalFrame } from "../royal/royal-frame";
import { RoyalDivider } from "../royal/royal-divider";

export type Stat = {
  value: string;
  label: string;
};

export type AboutSectionProps = {
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
  stats: Stat[];
  reverse: boolean;
  animation?: AnimationType;
  royalStyle?: RoyalStyle;
};

export function AboutSection({
  heading,
  body,
  image,
  imageAlt,
  stats,
  reverse,
  animation,
  royalStyle = "none",
}: AboutSectionProps) {
  const defaultAnim: AnimationType = reverse ? "slide-right" : "slide-left";
  const { ref } = useScrollReveal(animation ?? defaultAnim);

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background)]"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            reverse ? "lg:flex lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text content */}
          <div className={reverse ? "lg:pl-12" : "lg:pr-12"}>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-[color:var(--text-primary)]">
              {heading}
            </h2>
            {body && (
              <p className="mt-6 text-lg leading-relaxed whitespace-pre-line text-[color:var(--text-secondary)]">
                {body}
              </p>
            )}

            {/* Stats row */}
            {stats && stats.length > 0 && (
              <>
                {royalStyle === "ornate" ? (
                  <RoyalDivider royalStyle={royalStyle} />
                ) : (
                  <div className="mt-10" />
                )}
                <div
                  className={`grid grid-cols-2 sm:grid-cols-3 gap-6 ${royalStyle === "ornate" ? "" : "pt-8 border-t border-[color:var(--border)]"}`}
                >
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <p className="text-3xl font-bold text-[color:var(--primary)]">
                        {stat.value}
                      </p>
                      <p className="text-sm mt-1 text-[color:var(--text-secondary)]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Image */}
          {image && (
            <RoyalFrame royalStyle={royalStyle}>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-full object-cover max-h-[520px]"
                />
              </div>
            </RoyalFrame>
          )}
        </div>
      </div>
    </section>
  );
}
