
import type { FooterProps } from "./footer";

export const footerConfig = {
  fields: {
    logo: {
      type: "text",
      label: "Logo URL",
    },
    logoAlt: {
      type: "text",
      label: "Logo Alt Text",
    },
    columns: {
      type: "array",
      label: "Link Columns",
      arrayFields: {
        title: {
          type: "text",
          label: "Column Title",
        },
        links: {
          type: "array",
          label: "Links",
          arrayFields: {
            label: { type: "text", label: "Link Label" },
            href: { type: "text", label: "URL" },
          },
          getItemSummary: (item: any) => item.label || "Link",
        },
      },
      getItemSummary: (item: any) => item.title || "Column",
    },
    socialLinks: {
      type: "array",
      label: "Social Links",
      arrayFields: {
        platform: {
          type: "select",
          label: "Platform",
          options: [
            { label: "Twitter / X", value: "twitter" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Facebook", value: "facebook" },
            { label: "Instagram", value: "instagram" },
            { label: "YouTube", value: "youtube" },
          ],
        },
        url: {
          type: "text",
          label: "Profile URL",
        },
      },
      getItemSummary: (item: any) => item.platform || "Social link",
    },
    copyright: {
      type: "text",
      label: "Copyright Text",
    },
  },
  defaultProps: {
    logo: "/logo.svg",
    logoAlt: "Company Logo",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "/features" },
          { label: "Pricing", href: "/pricing" },
          { label: "Changelog", href: "/changelog" },
          { label: "Roadmap", href: "/roadmap" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Careers", href: "/careers" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Cookie Policy", href: "/cookies" },
        ],
      },
    ],
    socialLinks: [
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/company/" },
    ],
    copyright: `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  },
};
