"use client";

import type { RoyalStyle } from "../royal/types";
import { YantraBackground } from "../royal/yantra-background";
import { RoyalCorners } from "../royal/royal-corners";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export type TestimonialsSectionProps = {
  heading: string;
  testimonials: Testimonial[];
  royalStyle?: RoyalStyle;
};

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-[var(--primary)]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ src, name }: { src: string; name: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="h-11 w-11 rounded-full border-2 border-[var(--border)] object-cover"
      />
    );
  }

  // Fallback initials avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklch,var(--primary)_20%,transparent)] text-sm font-bold text-[var(--primary)]">
      {initials}
    </div>
  );
}

export function TestimonialsSection({
  heading,
  testimonials,
  royalStyle = "none",
}: TestimonialsSectionProps) {
  return (
    <section className="relative bg-[var(--background)] py-20 px-4 sm:px-6 lg:px-8">
      {royalStyle !== "none" && <YantraBackground royalStyle={royalStyle} />}
      <div className="max-w-7xl mx-auto">
        {heading && (
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              {heading}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-2xl bg-[var(--surface)] p-7 ${
                royalStyle === "ornate"
                  ? "border border-[var(--royal-gold)]"
                  : "border border-[var(--border)]"
              }`}
            >
              {royalStyle === "ornate" && <RoyalCorners royalStyle="subtle" />}
              <StarRating />

              <blockquote className="mb-6 flex-1 text-base leading-relaxed text-[var(--text-secondary)]">
                <span className={royalStyle !== "none" ? "text-[var(--royal-gold)]" : ""}>
                  &ldquo;
                </span>
                {testimonial.quote}
                <span className={royalStyle !== "none" ? "text-[var(--royal-gold)]" : ""}>
                  &rdquo;
                </span>
              </blockquote>

              <div className="flex items-center gap-3">
                <Avatar src={testimonial.avatar} name={testimonial.name} />
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
