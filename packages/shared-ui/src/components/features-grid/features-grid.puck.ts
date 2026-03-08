
import type { FeaturesGridProps } from "./features-grid";
import { royalStyleField } from "../royal/royal-field";

export const featuresGridConfig = {
  fields: {
    heading: {
      type: "text",
      label: "Section Heading",
    },
    description: {
      type: "textarea",
      label: "Section Description",
    },
    columns: {
      type: "radio",
      label: "Columns",
      options: [
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
      ],
    },
    animation: {
      type: "radio",
      label: "Scroll Animation",
      options: [
        { label: "Slide Up", value: "slide-up" },
        { label: "Fade In", value: "fade-in" },
        { label: "Scale In", value: "scale-in" },
        { label: "None", value: "none" },
      ],
    },
    royalStyle: royalStyleField,
    features: {
      type: "array",
      label: "Features",
      arrayFields: {
        icon: { type: "text", label: "Icon (emoji or character)" },
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" },
      },
      getItemSummary: (item: any) => item.title || "Feature",
    },
  },
  defaultProps: {
    heading: "Everything You Need",
    description:
      "A complete set of features built to help you succeed from day one.",
    columns: 3,
    animation: "slide-up",
    royalStyle: "none",
    features: [
      {
        icon: "⚡",
        title: "Lightning Fast",
        description:
          "Optimized for performance so your users never wait. Sub-second load times across the board.",
      },
      {
        icon: "🛡️",
        title: "Secure by Default",
        description:
          "Enterprise-grade security baked in from the ground up, so your data stays safe.",
      },
      {
        icon: "📊",
        title: "Powerful Analytics",
        description:
          "Real-time insights that help you understand your users and grow your business.",
      },
      {
        icon: "🔧",
        title: "Easy to Customize",
        description:
          "Flexible configuration options that adapt to your workflow without the complexity.",
      },
      {
        icon: "🌐",
        title: "Global Scale",
        description:
          "Infrastructure that grows with you, from your first user to your millionth.",
      },
      {
        icon: "💬",
        title: "24/7 Support",
        description:
          "Our team is always here to help you succeed, no matter the hour.",
      },
    ],
  },
};
