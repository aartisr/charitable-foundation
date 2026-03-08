
import type { SpacerProps } from "./spacer";

export const spacerConfig = {
  fields: {
    height: {
      type: "radio",
      label: "Height",
      options: [
        { label: "Small (32px)", value: "sm" },
        { label: "Medium (64px)", value: "md" },
        { label: "Large (96px)", value: "lg" },
        { label: "Extra Large (128px)", value: "xl" },
      ],
    },
  },
  defaultProps: {
    height: "md",
  },
};
