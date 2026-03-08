
import type { StatsCounterProps } from "./stats-counter";

export const statsCounterConfig = {
  fields: {
    animation: {
      type: "radio",
      label: "Scroll Animation",
      options: [
        { label: "Scale In", value: "scale-in" },
        { label: "Slide Up", value: "slide-up" },
        { label: "Fade In", value: "fade-in" },
        { label: "None", value: "none" },
      ],
    },
    stats: {
      type: "array",
      label: "Stats",
      arrayFields: {
        value: {
          type: "text",
          label: "Value (number)",
        },
        label: {
          type: "text",
          label: "Label",
        },
        prefix: {
          type: "text",
          label: "Prefix (e.g. $, €)",
        },
        suffix: {
          type: "text",
          label: "Suffix (e.g. +, %, K)",
        },
      },
      getItemSummary: (item: any) =>
        item.label
          ? `${item.prefix ?? ""}${item.value ?? ""}${item.suffix ?? ""} — ${item.label}`
          : "Stat",
    },
  },
  defaultProps: {
    animation: "scale-in",
    stats: [
      { value: "10", label: "Years of Experience", prefix: "", suffix: "+" },
      { value: "500", label: "Clients Served", prefix: "", suffix: "+" },
      { value: "98", label: "Satisfaction Rate", prefix: "", suffix: "%" },
      { value: "24", label: "Support", prefix: "", suffix: "/7" },
    ],
  },
};
