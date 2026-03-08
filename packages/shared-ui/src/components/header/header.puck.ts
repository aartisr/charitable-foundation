import type { HeaderProps } from "./header";

export const headerConfig = {
  fields: {
    logo: {
      type: "text",
      label: "Logo URL",
    },
    logoAlt: {
      type: "text",
      label: "Logo Alt / Brand Name",
    },
    navStyle: {
      type: "radio",
      label: "Navigation Style",
      options: [
        { label: "Flat", value: "flat" },
        { label: "Dropdown", value: "dropdown" },
        { label: "Mega Menu", value: "mega" },
      ],
    },
    navItems: {
      type: "array",
      label: "Navigation Items",
      arrayFields: {
        label: { type: "text", label: "Label" },
        href: { type: "text", label: "Link URL" },
        children: {
          type: "array",
          label: "Dropdown Items",
          arrayFields: {
            label: { type: "text", label: "Label" },
            href: { type: "text", label: "Link URL" },
          },
          getItemSummary: (item: any) => item.label || "Sub Item",
        },
      },
      getItemSummary: (item: any) => item.label || "Nav Item",
    },
    ctaButton: {
      type: "object",
      label: "CTA Button",
      objectFields: {
        label: { type: "text", label: "Button Label" },
        href: { type: "text", label: "Button URL" },
      },
    },
    sticky: {
      type: "radio",
      label: "Sticky Header",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },
  defaultProps: {
    logo: "",
    logoAlt: "Brand Name",
    navStyle: "flat",
    navItems: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
    ctaButton: {
      label: "Get Started",
      href: "/contact",
    },
    sticky: true,
  },
};
