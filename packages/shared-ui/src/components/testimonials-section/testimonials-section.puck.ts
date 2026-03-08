
import type { TestimonialsSectionProps } from "./testimonials-section";
import { royalStyleField } from "../royal/royal-field";

export const testimonialsSectionConfig =
  {
    fields: {
      heading: {
        type: "text",
        label: "Section Heading",
      },
      royalStyle: royalStyleField,
      testimonials: {
        type: "array",
        label: "Testimonials",
        arrayFields: {
          quote: { type: "textarea", label: "Quote" },
          name: { type: "text", label: "Name" },
          role: { type: "text", label: "Role / Company" },
          avatar: { type: "text", label: "Avatar URL (optional)" },
        },
        getItemSummary: (item: any) => item.name || "Testimonial",
      },
    },
    defaultProps: {
      heading: "What Our Customers Say",
      royalStyle: "none",
      testimonials: [
        {
          quote:
            "This platform completely transformed how we manage our digital presence. The results speak for themselves.",
          name: "Sarah Johnson",
          role: "CEO, Acme Corp",
          avatar: "",
        },
        {
          quote:
            "I've tried a dozen tools over the years. Nothing comes close to the simplicity and power here.",
          name: "Marcus Chen",
          role: "Product Lead, Startech",
          avatar: "",
        },
        {
          quote:
            "Our team was up and running in a single afternoon. The onboarding experience is second to none.",
          name: "Priya Patel",
          role: "CTO, Nexus Labs",
          avatar: "",
        },
      ],
    },
  };
