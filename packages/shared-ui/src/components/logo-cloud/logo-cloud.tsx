import React from "react";

export type LogoItem = {
  src: string;
  alt: string;
  href: string;
};

export type LogoCloudProps = {
  heading: string;
  logos: LogoItem[];
};

export function LogoCloud({ heading, logos }: LogoCloudProps) {
  return (
    <section className="w-full py-14 px-4">
      <div className="max-w-5xl mx-auto">
        {heading && (
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            {heading}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, index) => {
            const image = (
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto object-contain grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              />
            );

            return logo.href ? (
              <a
                key={index}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.alt}
                className="flex items-center"
              >
                {image}
              </a>
            ) : (
              <span key={index} className="flex items-center">
                {image}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
