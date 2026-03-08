import type { Config } from "@puckeditor/core";

import { Header } from "./components/header/header";
import { headerConfig } from "./components/header/header.puck";
import { HeroSection } from "./components/hero-section/hero-section";
import { heroSectionConfig } from "./components/hero-section/hero-section.puck";
import { FeaturesGrid } from "./components/features-grid/features-grid";
import { featuresGridConfig } from "./components/features-grid/features-grid.puck";
import { AboutSection } from "./components/about-section/about-section";
import { aboutSectionConfig } from "./components/about-section/about-section.puck";
import { ServicesGrid } from "./components/services-grid/services-grid";
import { servicesGridConfig } from "./components/services-grid/services-grid.puck";
import { TestimonialsSection } from "./components/testimonials-section/testimonials-section";
import { testimonialsSectionConfig } from "./components/testimonials-section/testimonials-section.puck";
import { PricingTable } from "./components/pricing-table/pricing-table";
import { pricingTableConfig } from "./components/pricing-table/pricing-table.puck";
import { FAQSection } from "./components/faq-section/faq-section";
import { faqSectionConfig } from "./components/faq-section/faq-section.puck";
import { ContactForm } from "./components/contact-form/contact-form";
import { contactFormConfig } from "./components/contact-form/contact-form.puck";
import { CtaSection } from "./components/cta-section/cta-section";
import { ctaSectionConfig } from "./components/cta-section/cta-section.puck";
import { StatsCounter } from "./components/stats-counter/stats-counter";
import { statsCounterConfig } from "./components/stats-counter/stats-counter.puck";
import { BlogSection } from "./components/blog-section/blog-section";
import { blogSectionConfig } from "./components/blog-section/blog-section.puck";
import { GallerySection } from "./components/gallery-section/gallery-section";
import { gallerySectionConfig } from "./components/gallery-section/gallery-section.puck";
import { Footer } from "./components/footer/footer";
import { footerConfig } from "./components/footer/footer.puck";
import { LogoCloud } from "./components/logo-cloud/logo-cloud";
import { logoCloudConfig } from "./components/logo-cloud/logo-cloud.puck";
import { Spacer } from "./components/spacer/spacer";
import { spacerConfig } from "./components/spacer/spacer.puck";
import { TimelineSection } from "./components/timeline-section/timeline-section";
import { timelineSectionConfig } from "./components/timeline-section/timeline-section.puck";

// Puck wraps component props with {id, puck} — cast to satisfy strict typing
// while keeping runtime behavior correct (Puck passes all declared fields)
const r = (fn: Function) => fn as any; // eslint-disable-line @typescript-eslint/no-explicit-any

export function createPuckConfig(): Config {
  return {
    categories: {
      layout: {
        title: "Layout",
        components: ["Header", "Footer", "Spacer"],
      },
      hero: {
        title: "Hero",
        components: ["HeroSection"],
      },
      content: {
        title: "Content",
        components: [
          "FeaturesGrid",
          "AboutSection",
          "ServicesGrid",
          "FAQSection",
          "BlogSection",
          "TimelineSection",
        ],
      },
      social: {
        title: "Social Proof",
        components: ["TestimonialsSection", "StatsCounter", "LogoCloud"],
      },
      conversion: {
        title: "Conversion",
        components: ["CTASection", "PricingTable", "ContactForm"],
      },
      media: {
        title: "Media",
        components: ["GallerySection"],
      },
    },
    components: {
      Header: {
        ...headerConfig,
        render: r(Header),
      },
      HeroSection: {
        ...heroSectionConfig,
        render: r(HeroSection),
      },
      FeaturesGrid: {
        ...featuresGridConfig,
        render: r(FeaturesGrid),
      },
      AboutSection: {
        ...aboutSectionConfig,
        render: r(AboutSection),
      },
      ServicesGrid: {
        ...servicesGridConfig,
        render: r(ServicesGrid),
      },
      TestimonialsSection: {
        ...testimonialsSectionConfig,
        render: r(TestimonialsSection),
      },
      PricingTable: {
        ...pricingTableConfig,
        render: r(PricingTable),
      },
      FAQSection: {
        ...faqSectionConfig,
        render: r(FAQSection),
      },
      ContactForm: {
        ...contactFormConfig,
        render: r(ContactForm),
      },
      CTASection: {
        ...ctaSectionConfig,
        render: r(CtaSection),
      },
      StatsCounter: {
        ...statsCounterConfig,
        render: r(StatsCounter),
      },
      BlogSection: {
        ...blogSectionConfig,
        render: r(BlogSection),
      },
      GallerySection: {
        ...gallerySectionConfig,
        render: r(GallerySection),
      },
      Footer: {
        ...footerConfig,
        render: r(Footer),
      },
      LogoCloud: {
        ...logoCloudConfig,
        render: r(LogoCloud),
      },
      Spacer: {
        ...spacerConfig,
        render: r(Spacer),
      },
      TimelineSection: {
        ...timelineSectionConfig,
        render: r(TimelineSection),
      },
    },
  };
}
