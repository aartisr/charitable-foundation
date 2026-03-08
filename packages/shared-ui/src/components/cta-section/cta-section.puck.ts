
import type { CtaSectionProps } from "./cta-section";
import { royalStyleField } from "../royal/royal-field";

export const ctaSectionConfig = {
  fields: {
    variant: {
      type: "radio",
      label: "Layout Variant",
      options: [
        { label: "Banner (centered, gradient)", value: "banner" },
        { label: "Split (text left, CTAs right)", value: "split" },
      ],
    },
    heading: {
      type: "text",
      label: "Heading",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    primaryCta: {
      type: "object",
      label: "Primary CTA",
      objectFields: {
        label: { type: "text", label: "Button Label" },
        href: { type: "text", label: "URL" },
      },
    },
    secondaryCta: {
      type: "object",
      label: "Secondary CTA",
      objectFields: {
        label: { type: "text", label: "Button Label" },
        href: { type: "text", label: "URL" },
      },
    },
    royalStyle: royalStyleField,
  },
  defaultProps: {
    variant: "banner",
    heading: "Ready to Get Started?",
    description:
      "Join thousands of organizations already using our platform to transform their operations.",
    primaryCta: { label: "Start Free Trial", href: "/signup" },
    secondaryCta: { label: "Talk to Sales", href: "/contact" },
    royalStyle: "none",
  },
};
