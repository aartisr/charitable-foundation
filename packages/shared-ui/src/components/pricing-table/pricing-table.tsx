"use client";

export type PricingCta = {
  label: string;
  href: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: PricingCta;
  featured: boolean;
};

export type PricingTableProps = {
  heading: string;
  description: string;
  plans: PricingPlan[];
};

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 shrink-0 text-[color:var(--primary)]"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function PricingTable({
  heading,
  description,
  plans,
}: PricingTableProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        {(heading || description) && (
          <div className="text-center mb-14">
            {heading && (
              <h2 className="text-3xl sm:text-4xl font-bold text-[color:var(--text-primary)]">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg max-w-2xl mx-auto text-[color:var(--text-secondary)]">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-2xl overflow-hidden ${
                plan.featured
                  ? "bg-[var(--primary)] border-2 border-[color:var(--primary)] shadow-[0_20px_60px_color-mix(in_oklch,var(--primary)_30%,transparent)]"
                  : "bg-[var(--surface)] border border-[color:var(--border)]"
              }`}
            >
              {plan.featured && (
                <div className="py-1.5 px-4 text-center text-xs font-semibold uppercase tracking-widest bg-[color:color-mix(in_oklch,var(--primary-foreground)_20%,transparent)] text-[color:var(--primary-foreground)]">
                  Most Popular
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Plan name */}
                <p className={`text-sm font-semibold uppercase tracking-widest mb-2 ${
                  plan.featured
                    ? "text-[color:var(--primary-foreground)] opacity-80"
                    : "text-[color:var(--text-secondary)]"
                }`}>
                  {plan.name}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl sm:text-5xl font-bold ${
                    plan.featured
                      ? "text-[color:var(--primary-foreground)]"
                      : "text-[color:var(--text-primary)]"
                  }`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${
                      plan.featured
                        ? "text-[color:var(--primary-foreground)] opacity-75"
                        : "text-[color:var(--text-secondary)]"
                    }`}>
                      /{plan.period}
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className={`my-6 h-px ${
                  plan.featured
                    ? "bg-[color:color-mix(in_oklch,var(--primary-foreground)_25%,transparent)]"
                    : "bg-[var(--border)]"
                }`} />

                {/* Features list */}
                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      {plan.featured ? (
                        <svg
                          className="w-5 h-5 shrink-0 mt-0.5 text-[color:var(--primary-foreground)] opacity-90"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <CheckIcon />
                      )}
                      <span className={`text-sm leading-snug ${
                        plan.featured
                          ? "text-[color:var(--primary-foreground)] opacity-90"
                          : "text-[color:var(--text-secondary)]"
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={plan.cta.href}
                  className={`block text-center py-3 px-6 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 ${
                    plan.featured
                      ? "bg-[var(--primary-foreground)] text-[color:var(--primary)]"
                      : "bg-[var(--primary)] text-[color:var(--primary-foreground)]"
                  }`}
                >
                  {plan.cta.label}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
