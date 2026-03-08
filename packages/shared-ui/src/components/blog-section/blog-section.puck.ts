
import type { BlogSectionProps } from "./blog-section";

export const blogSectionConfig = {
  fields: {
    anchorId: {
      type: "text",
      label: "Section Anchor ID",
    },
    heading: {
      type: "text",
      label: "Section Heading",
    },
    description: {
      type: "textarea",
      label: "Section Description",
    },
    posts: {
      type: "array",
      label: "Blog Posts",
      arrayFields: {
        title: {
          type: "text",
          label: "Title",
        },
        excerpt: {
          type: "textarea",
          label: "Excerpt",
        },
        image: {
          type: "text",
          label: "Image URL",
        },
        imageAlt: {
          type: "text",
          label: "Image Alt Text",
        },
        date: {
          type: "text",
          label: "Date (YYYY-MM-DD)",
        },
        href: {
          type: "text",
          label: "Post URL",
        },
      },
      getItemSummary: (item: any) => item.title || "Post",
    },
  },
  defaultProps: {
    anchorId: "blog",
    heading: "Latest from Our Blog",
    description:
      "Insights, updates, and stories from our team to keep you informed.",
    posts: [
      {
        title: "How We Built Our Platform from the Ground Up",
        excerpt:
          "A behind-the-scenes look at the decisions, challenges, and lessons learned during our founding years.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
        imageAlt: "Team working at laptops",
        date: "2026-01-15",
        href: "/blog/how-we-built-our-platform",
      },
      {
        title: "5 Trends Shaping the Industry in 2026",
        excerpt:
          "From AI integration to sustainable practices, here are the trends every leader needs to know about.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        imageAlt: "Data charts on screen",
        date: "2026-02-03",
        href: "/blog/trends-2026",
      },
      {
        title: "Customer Success Story: Scaling to 10x",
        excerpt:
          "Learn how one of our longest-standing clients grew revenue tenfold using our platform.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
        imageAlt: "Happy team celebrating",
        date: "2026-02-20",
        href: "/blog/customer-success-10x",
      },
    ],
  },
};
