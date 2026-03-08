import type { ThemeConfig, ColorPalette } from "./types.js";

/** Map TypeScript camelCase keys to CSS custom property names */
const cssVarMap: Record<keyof ColorPalette, string> = {
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  background: "--background",
  foreground: "--foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  border: "--border",
  input: "--input",
  ring: "--ring",
  card: "--card",
  cardForeground: "--card-foreground",
  popover: "--popover",
  popoverForeground: "--popover-foreground",
  destructive: "--destructive",
  destructiveForeground: "--destructive-foreground",
  accentGradientStart: "--accent-gradient-start",
  accentGradientEnd: "--accent-gradient-end",
  royalGold: "--royal-gold",
  royalGoldMuted: "--royal-gold-muted",
};

function paletteToCSS(palette: ColorPalette, indent: string): string {
  return Object.entries(cssVarMap)
    .filter(([key]) => palette[key as keyof ColorPalette] != null)
    .map(([key, prop]) => `${indent}${prop}: ${palette[key as keyof ColorPalette]};`)
    .join("\n");
}

/** Semantic aliases so shared-ui components work with any theme */
const semanticAliases = `
  /* Semantic aliases for shared-ui components */
  --surface: var(--card);
  --text-primary: var(--foreground);
  --text-secondary: var(--muted-foreground);
  --royal-gold: var(--royal-gold, oklch(0.75 0.15 75));
  --royal-gold-muted: var(--royal-gold-muted, oklch(0.65 0.08 75));`;

export function generateThemeCSS(theme: ThemeConfig): string {
  return `/* Auto-generated theme — do not edit manually */
:root {
  --radius: ${theme.radius};
  --radius-full: ${theme.radiusFull};
  --font-heading: ${theme.fonts.heading};
  --font-body: ${theme.fonts.body};
${paletteToCSS(theme.light, "  ")}
${semanticAliases}
}

.dark {
${paletteToCSS(theme.dark, "  ")}
${semanticAliases}
}

.bg-gradient-accent {
  background: linear-gradient(to right, var(--accent-gradient-start), var(--accent-gradient-end));
}
`;
}
