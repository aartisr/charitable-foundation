
import type { GallerySectionProps } from "./gallery-section";
import { royalStyleField } from "../royal/royal-field";

export const gallerySectionConfig = {
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
      label: "Number of Columns",
      options: [
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
      ],
    },
    royalStyle: royalStyleField,
    images: {
      type: "array",
      label: "Images",
      arrayFields: {
        src: {
          type: "text",
          label: "Image URL",
        },
        alt: {
          type: "text",
          label: "Alt Text",
        },
        caption: {
          type: "text",
          label: "Caption (shown on hover)",
        },
      },
      getItemSummary: (item: any) => item.alt || item.caption || "Image",
    },
  },
  defaultProps: {
    heading: "Our Gallery",
    description: "A visual look at what we do and the impact we create.",
    columns: 3,
    royalStyle: "none",
    images: [
      {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        alt: "Modern office space",
        caption: "Our headquarters",
      },
      {
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        alt: "Team collaboration session",
        caption: "Weekly strategy sessions",
      },
      {
        src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
        alt: "Product launch event",
        caption: "2025 product launch",
      },
      {
        src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
        alt: "Team building activity",
        caption: "Annual team retreat",
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        alt: "Customer workshop",
        caption: "Customer success workshop",
      },
      {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
        alt: "Engineering team at work",
        caption: "Engineering excellence",
      },
    ],
  },
};
