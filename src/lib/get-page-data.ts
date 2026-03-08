import { readFileSync, readdirSync, existsSync, unlinkSync } from "fs";
import { join } from "path";
import type { Data } from "@puckeditor/core";

const CONTENT_DIR = join(process.cwd(), "content");

export function listPages(): { slug: string; title: string }[] {
  if (!existsSync(CONTENT_DIR)) return [];
  return readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const slug = f.replace(/\.json$/, "");
      const data = getPageData(slug);
      const title =
        (data?.root as { props?: { title?: string } })?.props?.title ||
        slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return { slug, title };
    });
}

export function deletePage(slug: string): boolean {
  const filePath = join(CONTENT_DIR, `${slug}.json`);
  if (!existsSync(filePath)) return false;
  unlinkSync(filePath);
  return true;
}

export function getPageData(slug: string): Data | null {
  const filePath = join(CONTENT_DIR, `${slug}.json`);
  if (!existsSync(filePath)) return null;
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Data;
}

export function savePageData(slug: string, data: Data): void {
  const filePath = join(CONTENT_DIR, `${slug}.json`);
  const { writeFileSync, mkdirSync } = require("fs");
  mkdirSync(CONTENT_DIR, { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
