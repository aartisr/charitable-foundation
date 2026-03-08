import { ImageResponse } from "next/og";

export const alt = "Harmony Hope Foundation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col justify-between bg-gray-900 p-16 text-white">
        <div tw="text-3xl font-bold text-orange-500">
          Harmony Hope Foundation
        </div>

        <div tw="flex flex-col">
          <div tw="max-w-[92%] text-6xl font-extrabold leading-[1.08]">
            Become a monthly donor and fund real community outcomes.
          </div>
          <div tw="mt-4 text-3xl opacity-90">
            Measurable impact • Volunteer-powered delivery • Transparent reporting
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
