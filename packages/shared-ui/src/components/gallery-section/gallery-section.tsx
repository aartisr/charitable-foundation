import React from "react";
import type { RoyalStyle } from "../royal/types";
import { RoyalFrame } from "../royal/royal-frame";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type GallerySectionProps = {
  heading: string;
  description: string;
  images: GalleryImage[];
  columns: 2 | 3 | 4;
  royalStyle?: RoyalStyle;
};

const columnClasses: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function GallerySection({
  heading,
  description,
  images,
  columns,
  royalStyle = "none",
}: GallerySectionProps) {
  const colClass = columnClasses[columns] ?? columnClasses[3];

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {(heading || description) && (
          <div className="mb-12 text-center max-w-2xl mx-auto">
            {heading && (
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Image grid */}
        <div className={`grid ${colClass} gap-4`}>
          {images.map((image, index) => (
            <RoyalFrame key={index} royalStyle={royalStyle}>
              <figure className="group relative overflow-hidden rounded-2xl bg-[var(--card)]">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Caption overlay */}
                {image.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-[linear-gradient(to_top,rgba(0,0,0,0.75)_0%,transparent_100%)] px-4 py-3 transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-sm font-medium text-white leading-snug">
                      {image.caption}
                    </p>
                  </figcaption>
                )}
              </figure>
            </RoyalFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
