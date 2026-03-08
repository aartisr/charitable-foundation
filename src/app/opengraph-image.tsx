import { ImageResponse } from "next/og";

export const alt = "Harmony Hope Foundation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col justify-between bg-orange-500 p-16 text-white">
        <div tw="text-3xl font-bold opacity-95">
          Harmony Hope Foundation
        </div>

        <div tw="flex flex-col">
          <div tw="max-w-[90%] text-7xl font-extrabold leading-[1.05]">
            Donate. Volunteer. Create measurable community impact.
          </div>
          <div tw="mt-4 text-4xl opacity-90">
            Transparent charitable programs with dignity-first delivery.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
