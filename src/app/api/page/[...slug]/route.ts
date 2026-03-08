import { NextRequest, NextResponse } from "next/server";
import { getPageData, savePageData, deletePage } from "@/lib/get-page-data";

type RouteContext = {
  params: Promise<{ slug: string[] }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const pageSlug = slug.join("-");
  const data = getPageData(pageSlug);

  if (!data) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const pageSlug = slug.join("-");
  const data = await request.json();

  savePageData(pageSlug, data);

  return NextResponse.json({ success: true });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const pageSlug = slug.join("-");
  const deleted = deletePage(pageSlug);

  if (!deleted) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
