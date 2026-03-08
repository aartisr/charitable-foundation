import type { RoyalStyle } from "./types";

/** Ornamental horizontal divider with a central lotus/fleur-de-lis motif */
export function RoyalDivider({ royalStyle }: { royalStyle: RoyalStyle }) {
  if (royalStyle === "none") return null;

  const motifSize = royalStyle === "subtle" ? 28 : 42;
  const opacityClass = royalStyle === "subtle" ? "opacity-60" : "opacity-90";

  return (
    <div className={`my-6 flex w-full items-center gap-3 ${opacityClass}`}>
      {/* Left line */}
      <div className="h-px flex-1 bg-[linear-gradient(to_right,transparent,var(--royal-gold))]" />
      {/* Center motif — lotus/fleur-de-lis */}
      <svg
        width={motifSize}
        height={motifSize}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Center petal */}
        <path
          d="M18 4C20 10 20 14 18 18C16 14 16 10 18 4Z"
          fill="var(--royal-gold)"
        />
        {/* Left petal */}
        <path
          d="M8 12C12 14 16 16 18 18C14 18 10 16 8 12Z"
          fill="var(--royal-gold)"
        />
        {/* Right petal */}
        <path
          d="M28 12C24 14 20 16 18 18C22 18 26 16 28 12Z"
          fill="var(--royal-gold)"
        />
        {/* Lower left */}
        <path
          d="M10 26C14 22 16 20 18 18C16 22 14 24 10 26Z"
          fill="var(--royal-gold)"
          opacity="0.7"
        />
        {/* Lower right */}
        <path
          d="M26 26C22 22 20 20 18 18C20 22 22 24 26 26Z"
          fill="var(--royal-gold)"
          opacity="0.7"
        />
        {/* Stem */}
        <path
          d="M18 18L18 32"
          stroke="var(--royal-gold)"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Center dot */}
        <circle cx="18" cy="18" r="1.5" fill="var(--royal-gold)" />
      </svg>
      {/* Right line */}
      <div className="h-px flex-1 bg-[linear-gradient(to_left,transparent,var(--royal-gold))]" />
    </div>
  );
}
