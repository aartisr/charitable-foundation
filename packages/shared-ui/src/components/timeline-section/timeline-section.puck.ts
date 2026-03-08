import type { TimelineSectionProps } from "./timeline-section";
import { royalStyleField } from "../royal/royal-field";

export const timelineSectionConfig = {
  fields: {
    heading: {
      type: "text",
      label: "Section Heading",
    },
    description: {
      type: "textarea",
      label: "Section Description",
    },
    variant: {
      type: "radio",
      label: "Layout Variant",
      options: [
        { label: "Alternating", value: "alternating" },
        { label: "Left-aligned", value: "left" },
        { label: "Centered", value: "centered" },
      ],
    },
    animation: {
      type: "radio",
      label: "Scroll Animation",
      options: [
        { label: "Slide Up", value: "slide-up" },
        { label: "Fade In", value: "fade-in" },
        { label: "None", value: "none" },
      ],
    },
    royalStyle: royalStyleField,
    items: {
      type: "array",
      label: "Timeline Items",
      arrayFields: {
        year: { type: "text", label: "Year / Period" },
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" },
        image: { type: "text", label: "Image URL (optional)" },
      },
      getItemSummary: (item: any) =>
        item.title ? `${item.year} — ${item.title}` : "Timeline Item",
    },
  },
  defaultProps: {
    heading: "Our Journey",
    description: "Key milestones that shaped who we are today.",
    variant: "alternating",
    animation: "slide-up",
    royalStyle: "none",
    items: [
      {
        year: "2020",
        title: "Founded",
        description: "Our story began with a simple idea to make a difference.",
        image: "",
      },
      {
        year: "2022",
        title: "Major Milestone",
        description:
          "We reached our first 1,000 customers and expanded our team.",
        image: "",
      },
      {
        year: "2024",
        title: "Global Expansion",
        description: "Opened offices in 5 new countries to serve more people.",
        image: "",
      },
    ],
  },
};
