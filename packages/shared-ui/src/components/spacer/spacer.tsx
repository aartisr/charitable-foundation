import React from "react";

export type SpacerHeight = "sm" | "md" | "lg" | "xl";

export type SpacerProps = {
  height: SpacerHeight;
};

const heightMap: Record<SpacerHeight, number> = {
  sm: 32,
  md: 64,
  lg: 96,
  xl: 128,
};

export function Spacer({ height }: SpacerProps) {
  const px = heightMap[height] ?? heightMap.md;
  const heightClassMap: Record<number, string> = {
    32: "h-8",
    64: "h-16",
    96: "h-24",
    128: "h-32",
  };
  const heightClass = heightClassMap[px] ?? "h-16";
  return (
    <div
      aria-hidden="true"
      role="separator"
      className={`block w-full ${heightClass}`}
    />
  );
}
