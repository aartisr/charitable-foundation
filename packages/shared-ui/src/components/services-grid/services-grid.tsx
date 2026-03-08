"use client";

import { Icon } from "../icon-map";

export type Service = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

export type ServicesGridProps = {
  heading: string;
  description: string;
  services: Service[];
};

export function ServicesGrid({
  heading,
  description,
  services,
}: ServicesGridProps) {
  return (
    <section className="bg-[var(--surface)] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Tag = service.href ? "a" : "div";
            const linkProps = service.href
              ? { href: service.href }
              : {};

            return (
              <Tag
                key={index}
                {...linkProps}
                className="group flex cursor-pointer flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] p-7 no-underline transition-all duration-200 hover:border-[var(--primary)] hover:shadow-[0_8px_32px_color-mix(in_oklch,var(--primary)_15%,transparent)]"
              >
                {service.icon && (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklch,var(--primary)_12%,transparent)] text-3xl text-[var(--primary)]">
                    <Icon name={service.icon} size={24} />
                  </div>
                )}
                <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                  {service.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {service.description}
                </p>
                {service.href && (
                  <span className="mt-5 flex items-center gap-1 text-sm font-semibold text-[var(--primary)]">
                    Learn more
                    <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform inline-block">
                      →
                    </span>
                  </span>
                )}
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
