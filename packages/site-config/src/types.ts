/** OKLCH color value string, e.g. "oklch(0.712 0.195 47.51)" */
export type OklchColor = string;

export interface ColorPalette {
  primary: OklchColor;
  primaryForeground: OklchColor;
  secondary: OklchColor;
  secondaryForeground: OklchColor;
  background: OklchColor;
  foreground: OklchColor;
  muted: OklchColor;
  mutedForeground: OklchColor;
  accent: OklchColor;
  accentForeground: OklchColor;
  border: OklchColor;
  input: OklchColor;
  ring: OklchColor;
  card: OklchColor;
  cardForeground: OklchColor;
  popover: OklchColor;
  popoverForeground: OklchColor;
  destructive: OklchColor;
  destructiveForeground: OklchColor;
  accentGradientStart: OklchColor;
  accentGradientEnd: OklchColor;
  royalGold?: OklchColor;
  royalGoldMuted?: OklchColor;
}

export interface FontConfig {
  heading: string;
  body: string;
}

export interface ThemeConfig {
  light: ColorPalette;
  dark: ColorPalette;
  fonts: FontConfig;
  radius: string;
  radiusFull: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface NavigationConfig {
  mainNav: NavigationItem[];
  footerNav: { title: string; links: NavigationItem[] }[];
  socialLinks: { platform: string; url: string; icon?: string }[];
}

export interface SeoConfig {
  defaultTitle: string;
  titleTemplate: string;
  description: string;
  ogImage?: string;
  canonicalBase: string;
}

export interface DeploymentConfig {
  domain: string;
  port: number;
  basePath?: string;
}

export interface SiteConfig {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  preset: PresetName;
  theme: ThemeConfig;
  navigation: NavigationConfig;
  seo: SeoConfig;
  deployment: DeploymentConfig;
}

export type PresetName = "oneness" | "ask-paramashiva" | "golden-ai" | "sarvam-ai" | "custom";
