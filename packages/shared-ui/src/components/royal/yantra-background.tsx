import type { RoyalStyle } from "./types";

/**
 * Full-section overlay with a repeating yantra/paisley SVG pattern.
 * Absolutely positioned, pointer-events-none so it never blocks interaction.
 */
export function YantraBackground({ royalStyle }: { royalStyle: RoyalStyle }) {
  if (royalStyle === "none") return null;

  const opacityClass = royalStyle === "subtle" ? "opacity-[0.08]" : "opacity-[0.15]";

  return (
    <svg
      className={`pointer-events-none absolute inset-0 z-[1] h-full w-full text-[var(--royal-gold)] ${opacityClass}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="yantra-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
          <g opacity="1" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M40 8L72 40L40 72L8 40Z" />
            <path d="M40 20L60 40L40 60L20 40Z" />
            <circle cx="40" cy="40" r="8" />
            <circle cx="40" cy="40" r="2" fill="currentColor" />
            <circle cx="40" cy="8" r="1.5" fill="currentColor" />
            <circle cx="72" cy="40" r="1.5" fill="currentColor" />
            <circle cx="40" cy="72" r="1.5" fill="currentColor" />
            <circle cx="8" cy="40" r="1.5" fill="currentColor" />
            <path d="M24 24L32 32" />
            <path d="M56 24L48 32" />
            <path d="M24 56L32 48" />
            <path d="M56 56L48 48" />
            <path
              d="M40 28C42 32 42 36 40 40C38 36 38 32 40 28Z"
              fill="currentColor"
              opacity="0.3"
            />
            <path
              d="M52 40C48 42 44 42 40 40C44 38 48 38 52 40Z"
              fill="currentColor"
              opacity="0.3"
            />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#yantra-pattern)" />
    </svg>
  );
}
