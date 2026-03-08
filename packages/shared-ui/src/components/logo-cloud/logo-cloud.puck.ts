
import type { LogoCloudProps } from "./logo-cloud";

export const logoCloudConfig = {
  fields: {
    heading: {
      type: "text",
      label: "Section Label (e.g. 'Trusted by teams at')",
    },
    logos: {
      type: "array",
      label: "Logos",
      arrayFields: {
        src: {
          type: "text",
          label: "Logo Image URL",
        },
        alt: {
          type: "text",
          label: "Alt Text / Company Name",
        },
        href: {
          type: "text",
          label: "Link URL (optional, leave blank to disable)",
        },
      },
      getItemSummary: (item: any) => item.alt || "Logo",
    },
  },
  defaultProps: {
    heading: "Trusted by industry leaders",
    logos: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
        alt: "Google",
        href: "",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
        alt: "Amazon",
        href: "",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
        alt: "Microsoft",
        href: "",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
        alt: "Apple",
        href: "",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
        alt: "Netflix",
        href: "",
      },
    ],
  },
};
