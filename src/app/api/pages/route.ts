import { NextResponse } from "next/server";
import { listPages } from "@/lib/get-page-data";

export async function GET() {
  const pages = listPages();
  return NextResponse.json(pages);
}
