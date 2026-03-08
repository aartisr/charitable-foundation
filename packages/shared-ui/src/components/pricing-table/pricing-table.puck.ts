
import type { PricingTableProps } from "./pricing-table";

export const pricingTableConfig = {
  fields: {
    heading: {
      type: "text",
      label: "Section Heading",
    },
    description: {
      type: "textarea",
      label: "Section Description",
    },
    plans: {
      type: "array",
      label: "Pricing Plans",
      arrayFields: {
        name: { type: "text", label: "Plan Name" },
        price: { type: "text", label: "Price (e.g. $49, Free, Custom)" },
        period: { type: "text", label: "Period (e.g. mo, yr)" },
        features: {
          type: "array",
          label: "Features",
          arrayFields: {
            value: { type: "text", label: "Feature" },
          },
          getItemSummary: (item: any) => (item as unknown as string) || "Feature",
        },
        cta: {
          type: "object",
          label: "CTA Button",
          objectFields: {
            label: { type: "text", label: "Button Label" },
            href: { type: "text", label: "Button URL" },
          },
        },
        featured: {
          type: "radio",
          label: "Featured Plan",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
      },
      getItemSummary: (item: any) => item.name || "Plan",
    },
  },
  defaultProps: {
    heading: "Simple, Transparent Pricing",
    description:
      "Choose the plan that fits your needs. Upgrade or downgrade at any time.",
    plans: [
      {
        name: "Starter",
        price: "Free",
        period: "",
        features: [
          "Up to 3 projects",
          "5GB storage",
          "Basic analytics",
          "Email support",
        ],
        cta: { label: "Get Started", href: "/signup" },
        featured: false,
      },
      {
        name: "Pro",
        price: "$49",
        period: "mo",
        features: [
          "Unlimited projects",
          "50GB storage",
          "Advanced analytics",
          "Priority support",
          "Custom domain",
          "Team collaboration",
        ],
        cta: { label: "Start Free Trial", href: "/signup?plan=pro" },
        featured: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        features: [
          "Everything in Pro",
          "Unlimited storage",
          "Dedicated account manager",
          "SLA guarantee",
          "SSO & audit logs",
          "Custom integrations",
        ],
        cta: { label: "Contact Sales", href: "/contact" },
        featured: false,
      },
    ],
  },
};
