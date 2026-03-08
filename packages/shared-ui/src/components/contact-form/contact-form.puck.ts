
import type { ContactFormProps } from "./contact-form";

export const contactFormConfig = {
  fields: {
    heading: {
      type: "text",
      label: "Heading",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    fields: {
      type: "array",
      label: "Form Fields",
      arrayFields: {
        name: {
          type: "text",
          label: "Field Name (HTML id/name)",
        },
        label: {
          type: "text",
          label: "Field Label",
        },
        type: {
          type: "select",
          label: "Field Type",
          options: [
            { label: "Text", value: "text" },
            { label: "Email", value: "email" },
            { label: "Phone", value: "tel" },
            { label: "Textarea", value: "textarea" },
          ],
        },
        required: {
          type: "radio",
          label: "Required",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
      },
      getItemSummary: (item: any) => item.label || item.name || "Field",
    },
    submitEndpoint: {
      type: "text",
      label: "Submit Endpoint",
    },
    submitLabel: {
      type: "text",
      label: "Submit Button Label",
    },
    successMessage: {
      type: "textarea",
      label: "Success Message",
    },
  },
  defaultProps: {
    heading: "Get in Touch",
    description:
      "Fill out the form below and we'll get back to you as soon as possible.",
    fields: [
      { name: "full_name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: false },
      { name: "message", label: "Message", type: "textarea", required: true },
    ],
    submitEndpoint: "/api/support",
    submitLabel: "Send Message",
    successMessage:
      "Thank you! Your message has been received. We'll be in touch soon.",
  },
};
