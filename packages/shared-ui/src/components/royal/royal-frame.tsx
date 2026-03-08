import type { RoyalStyle } from "./types";

/**
 * Wraps an image element with a golden double-border frame + optional small corner ornaments.
 * Children should be the <img> or image container.
 */
export function RoyalFrame({
  royalStyle,
  children,
}: {
  royalStyle: RoyalStyle;
  children: React.ReactNode;
}) {
  if (royalStyle === "none") {
    return <>{children}</>;
  }

  const cornerSize = royalStyle === "subtle" ? 16 : 24;
  const frameClass =
    royalStyle === "subtle" ? "p-[6px] rounded-2xl" : "p-[9px] rounded-2xl";
  const outerBorderClass =
    royalStyle === "subtle"
      ? "border-2 opacity-50"
      : "border-[3px] opacity-85";
  const innerBorderClass =
    royalStyle === "subtle"
      ? "inset-[4px] border opacity-35"
      : "inset-[6px] border-2 opacity-60";

  return (
    <div className={`relative ${frameClass}`}>
      {/* Outer border */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl border-[var(--royal-gold)] ${outerBorderClass}`}
      />
      {/* Inner border */}
      <div
        className={`pointer-events-none absolute rounded-xl border border-[var(--royal-gold)] ${innerBorderClass}`}
      />
      {/* Content — no opacity applied */}
      <div className="relative overflow-hidden rounded-xl">
        {children}
      </div>

      {/* Small corner ornaments */}
      {royalStyle === "ornate" && (
        <>
          <FrameCorner position="top-left" size={cornerSize} />
          <FrameCorner position="top-right" size={cornerSize} />
          <FrameCorner position="bottom-left" size={cornerSize} />
          <FrameCorner position="bottom-right" size={cornerSize} />
        </>
      )}
    </div>
  );
}

function FrameCorner({
  position,
  size,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size: number;
}) {
  const positionClass: Record<typeof position, string> = {
    "top-left": "-left-0.5 -top-0.5",
    "top-right": "-right-0.5 -top-0.5 scale-x-[-1]",
    "bottom-left": "-bottom-0.5 -left-0.5 scale-y-[-1]",
    "bottom-right": "-bottom-0.5 -right-0.5 scale-[-1]",
  };

  return (
    <svg
      className={`pointer-events-none absolute z-[2] ${positionClass[position]}`}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2L2 8C2 8 4 6 6 6C8 6 8 8 8 8L8 2Z"
        fill="var(--royal-gold)"
        opacity="0.9"
      />
      <path d="M2 2L10 2" stroke="var(--royal-gold)" strokeWidth="1.5" />
      <path d="M2 2L2 10" stroke="var(--royal-gold)" strokeWidth="1.5" />
    </svg>
  );
}
