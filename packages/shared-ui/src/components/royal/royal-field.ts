/** Shared Puck field configuration for the royalStyle prop */
export const royalStyleField = {
  type: "radio" as const,
  label: "Royal Style",
  options: [
    { label: "None", value: "none" },
    { label: "Subtle", value: "subtle" },
    { label: "Ornate", value: "ornate" },
  ],
};
