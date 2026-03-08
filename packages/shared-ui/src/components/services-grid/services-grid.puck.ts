
import type { ServicesGridProps } from "./services-grid";

export const servicesGridConfig = {
  fields: {
    heading: {
      type: "text",
      label: "Section Heading",
    },
    description: {
      type: "textarea",
      label: "Section Description",
    },
    services: {
      type: "array",
      label: "Services",
      arrayFields: {
        icon: { type: "text", label: "Icon (emoji or character)" },
        title: { type: "text", label: "Service Title" },
        description: { type: "textarea", label: "Service Description" },
        href: { type: "text", label: "Link URL (optional)" },
      },
      getItemSummary: (item: any) => item.title || "Service",
    },
  },
  defaultProps: {
    heading: "Our Services",
    description:
      "We offer a comprehensive range of services designed to help your business thrive in the digital age.",
    services: [
      {
        icon: "🎨",
        title: "Brand Design",
        description:
          "Craft a visual identity that resonates with your audience and sets you apart from the competition.",
        href: "/services/brand-design",
      },
      {
        icon: "💻",
        title: "Web Development",
        description:
          "High-performance websites and web apps built with modern technologies and best practices.",
        href: "/services/web-development",
      },
      {
        icon: "📈",
        title: "Growth Marketing",
        description:
          "Data-driven strategies that attract, convert, and retain customers at every stage of the funnel.",
        href: "/services/marketing",
      },
      {
        icon: "☁️",
        title: "Cloud Infrastructure",
        description:
          "Scalable, reliable cloud solutions that keep your business running smoothly around the clock.",
        href: "/services/cloud",
      },
      {
        icon: "🤖",
        title: "AI Integration",
        description:
          "Leverage the power of AI to automate workflows and unlock new possibilities for your team.",
        href: "/services/ai",
      },
      {
        icon: "🔒",
        title: "Security Audits",
        description:
          "Comprehensive security assessments to protect your business and your customers' data.",
        href: "/services/security",
      },
    ],
  },
};
