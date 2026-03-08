import type { RoyalStyle } from "./types";

/** Ornate scroll/floral corner motif rendered as inline SVG */
function CornerOrnament({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      opacity={opacity}
    >
      {/* Main corner scroll */}
      <path
        d="M4 4C4 4 8 20 20 28C32 36 48 32 48 32"
        stroke="var(--royal-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 4C4 4 20 8 28 20C36 32 32 48 32 48"
        stroke="var(--royal-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Inner flourish */}
      <path
        d="M8 8C8 8 14 18 22 22C30 26 40 24 40 24"
        stroke="var(--royal-gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M8 8C8 8 18 14 22 22C26 30 24 40 24 40"
        stroke="var(--royal-gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      {/* Dot accent */}
      <circle cx="6" cy="6" r="3" fill="var(--royal-gold)" opacity="0.9" />
      {/* Leaf/petal detail */}
      <path
        d="M16 10C18 12 18 16 16 18C14 16 14 12 16 10Z"
        fill="var(--royal-gold)"
        opacity="0.7"
      />
      <path
        d="M10 16C12 18 12 22 10 24C8 22 8 18 10 16Z"
        fill="var(--royal-gold)"
        opacity="0.7"
      />
    </svg>
  );
}

export function RoyalCorners({ royalStyle }: { royalStyle: RoyalStyle }) {
  if (royalStyle === "none") return null;

  const size = royalStyle === "subtle" ? 48 : 80;
  const opacity = royalStyle === "subtle" ? 0.5 : 0.85;

  return (
    <>
      {/* Top-left */}
      <div className="pointer-events-none absolute left-2 top-2 z-[2]">
        <CornerOrnament size={size} opacity={opacity} />
      </div>
      {/* Top-right */}
      <div className="pointer-events-none absolute right-2 top-2 z-[2] scale-x-[-1]">
        <CornerOrnament size={size} opacity={opacity} />
      </div>
      {/* Bottom-left */}
      <div className="pointer-events-none absolute bottom-2 left-2 z-[2] scale-y-[-1]">
        <CornerOrnament size={size} opacity={opacity} />
      </div>
      {/* Bottom-right */}
      <div className="pointer-events-none absolute bottom-2 right-2 z-[2] scale-[-1]">
        <CornerOrnament size={size} opacity={opacity} />
      </div>
    </>
  );
}
