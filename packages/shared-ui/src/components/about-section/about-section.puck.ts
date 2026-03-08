
import type { AboutSectionProps } from "./about-section";
import { royalStyleField } from "../royal/royal-field";

export const aboutSectionConfig = {
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    body: {
      type: "textarea",
      label: "Body Text",
    },
    image: {
      type: "text",
      label: "Image URL",
    },
    imageAlt: {
      type: "text",
      label: "Image Alt Text",
    },
    reverse: {
      type: "radio",
      label: "Image Position",
      options: [
        { label: "Image on Right", value: false },
        { label: "Image on Left", value: true },
      ],
    },
    animation: {
      type: "radio",
      label: "Scroll Animation",
      options: [
        { label: "Auto (based on image position)", value: "" },
        { label: "Slide Left", value: "slide-left" },
        { label: "Slide Right", value: "slide-right" },
        { label: "Fade In", value: "fade-in" },
        { label: "None", value: "none" },
      ],
    },
    royalStyle: royalStyleField,
    stats: {
      type: "array",
      label: "Stats",
      arrayFields: {
        value: { type: "text", label: "Stat Value (e.g. 10K+)" },
        label: { type: "text", label: "Stat Label" },
      },
      getItemSummary: (item: any) => item.label || "Stat",
    },
  },
  defaultProps: {
    heading: "Our Story",
    body: "We started with a simple belief: that powerful tools should be accessible to everyone. Over the years, we've helped thousands of businesses build their digital presence and reach their goals.\n\nOur team is driven by a passion for craftsmanship and a commitment to your success.",
    image: "",
    imageAlt: "Team at work",
    reverse: false,
    royalStyle: "none",
    stats: [
      { value: "10K+", label: "Customers Served" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "50+", label: "Countries" },
    ],
  },
};
