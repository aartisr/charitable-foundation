
import type { FAQSectionProps } from "./faq-section";

export const faqSectionConfig = {
  fields: {
    heading: {
      type: "text",
      label: "Section Heading",
    },
    description: {
      type: "textarea",
      label: "Section Description",
    },
    faqs: {
      type: "array",
      label: "FAQ Items",
      arrayFields: {
        question: { type: "text", label: "Question" },
        answer: { type: "textarea", label: "Answer" },
      },
      getItemSummary: (item: any) => item.question || "FAQ",
    },
  },
  defaultProps: {
    heading: "Frequently Asked Questions",
    description:
      "Everything you need to know. Can't find the answer you're looking for? Reach out to our team.",
    faqs: [
      {
        question: "How do I get started?",
        answer:
          "Getting started is simple. Sign up for a free account, follow the onboarding guide, and you'll have your first project live within minutes. No credit card required.",
      },
      {
        question: "Can I change my plan at any time?",
        answer:
          "Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately and billing is prorated automatically.",
      },
      {
        question: "Is there a free trial available?",
        answer:
          "Yes, all paid plans come with a 14-day free trial. You get full access to every feature during the trial period with no restrictions.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as PayPal and bank transfer for annual plans.",
      },
      {
        question: "How is my data kept secure?",
        answer:
          "We use industry-standard AES-256 encryption at rest and TLS 1.3 in transit. Our infrastructure is SOC 2 Type II certified and we perform regular third-party penetration tests.",
      },
      {
        question: "Do you offer customer support?",
        answer:
          "All plans include email support with a 24-hour response time. Pro and Enterprise customers get priority support and access to live chat.",
      },
    ],
  },
};
