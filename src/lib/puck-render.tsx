"use client";

import { Render } from "@puckeditor/core";
import type { Data } from "@puckeditor/core";
import { puckConfig } from "./puck-config";

export function PuckRenderer({ data }: { data: Data }) {
  return (
    <main id="main-content" className="site-shell">
      <Render config={puckConfig} data={data} />
    </main>
  );
}
