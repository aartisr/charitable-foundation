import { NextRequest, NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type ContactFormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required: boolean;
};

type SupportPayload = {
  values?: Record<string, string>;
  fields?: ContactFormField[];
  honeypot?: string;
  pagePath?: string;
  pageSearch?: string;
  userAgent?: string;
};

type MatchIntent = "need_help" | "offer_help" | "partner_request" | "general";

type MatchSubmission = {
  id: string;
  receivedAt: string;
  ip: string;
  pagePath: string;
  pageSearch: string;
  userAgent: string;
  values?: Record<string, string>;
  fields?: ContactFormField[];
  matchIntent: MatchIntent;
  source: {
    intentParam: string;
    supportTypeParam: string;
    hasDeepLink: boolean;
  };
  routingTags: string[];
  triageSummary: {
    intent: string;
    supportType: string;
    location: string;
    capacityOrUrgency: string;
    timeline: string;
  };
};

type TelemetrySummary = {
  totalSubmissions: number;
  deepLinkedSubmissions: number;
  deepLinkRate: number;
  intentParamBreakdown: Array<{ key: string; count: number }>;
  supportTypeParamBreakdown: Array<{ key: string; count: number }>;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const MAX_STORED_SUBMISSIONS = 200;
const SUPPORT_STORE_PATH = path.join(process.cwd(), ".data", "support-submissions.json");

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const supportSubmissionStore: MatchSubmission[] = [];
let hasLoadedStore = false;

async function loadSubmissionStore(): Promise<void> {
  if (hasLoadedStore) return;
  hasLoadedStore = true;

  try {
    const raw = await readFile(SUPPORT_STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as { items?: MatchSubmission[] };
    const items = Array.isArray(parsed.items) ? parsed.items : [];

    supportSubmissionStore.push(...items.slice(0, MAX_STORED_SUBMISSIONS));
  } catch {
    // No persisted store yet or invalid JSON; continue with empty in-memory store.
  }
}

async function persistSubmissionStore(): Promise<void> {
  try {
    await mkdir(path.dirname(SUPPORT_STORE_PATH), { recursive: true });
    await writeFile(
      SUPPORT_STORE_PATH,
      JSON.stringify({
        items: supportSubmissionStore.slice(0, MAX_STORED_SUBMISSIONS),
      }),
      "utf8"
    );
  } catch {
    // Persistence failures should not block critical support intake.
  }
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return false;
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return true;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalize(value: string | undefined): string {
  return (value || "").trim().toLowerCase();
}

function parseSourceParams(pageSearch: string | undefined) {
  const query = (pageSearch || "").startsWith("?")
    ? pageSearch || ""
    : `?${pageSearch || ""}`;

  const params = new URLSearchParams(query);
  const intentParam = normalize(params.get("intent") || undefined);
  const supportTypeParam = normalize(params.get("support_type") || undefined);

  return {
    intentParam,
    supportTypeParam,
    hasDeepLink: Boolean(intentParam || supportTypeParam),
  };
}

function buildTelemetrySummary(items: MatchSubmission[]): TelemetrySummary {
  const intentCounts = new Map<string, number>();
  const supportTypeCounts = new Map<string, number>();
  let deepLinkedSubmissions = 0;

  for (const item of items) {
    if (item.source?.hasDeepLink) {
      deepLinkedSubmissions += 1;
    }

    const intentKey = item.source?.intentParam || "none";
    const supportTypeKey = item.source?.supportTypeParam || "none";

    intentCounts.set(intentKey, (intentCounts.get(intentKey) || 0) + 1);
    supportTypeCounts.set(supportTypeKey, (supportTypeCounts.get(supportTypeKey) || 0) + 1);
  }

  const totalSubmissions = items.length;
  const deepLinkRate =
    totalSubmissions > 0
      ? Number(((deepLinkedSubmissions / totalSubmissions) * 100).toFixed(2))
      : 0;

  return {
    totalSubmissions,
    deepLinkedSubmissions,
    deepLinkRate,
    intentParamBreakdown: Array.from(intentCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([key, count]) => ({ key, count })),
    supportTypeParamBreakdown: Array.from(supportTypeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([key, count]) => ({ key, count })),
  };
}

function deriveMatchIntent(values: Record<string, string> | undefined):
  | MatchIntent {
  const rawIntent = normalize(values?.intent || values?.topic || values?.message);

  if (
    rawIntent.includes("need help") ||
    rawIntent.includes("need") ||
    rawIntent.includes("urgent") ||
    rawIntent.includes("request")
  ) {
    return "need_help";
  }

  if (
    rawIntent.includes("offer help") ||
    rawIntent.includes("donor") ||
    rawIntent.includes("donate") ||
    rawIntent.includes("volunteer") ||
    rawIntent.includes("support")
  ) {
    return "offer_help";
  }

  if (
    rawIntent.includes("partner") ||
    rawIntent.includes("ngo") ||
    rawIntent.includes("corporate") ||
    rawIntent.includes("organization")
  ) {
    return "partner_request";
  }

  return "general";
}

function isAuthorizedForRead(request: NextRequest): boolean {
  const expectedToken = process.env.SUPPORT_ADMIN_TOKEN;

  if (!expectedToken) {
    return true;
  }

  const providedToken =
    request.headers.get("x-support-admin-token") ||
    request.nextUrl.searchParams.get("token") ||
    "";

  return providedToken === expectedToken;
}

function buildRoutingTags(values: Record<string, string> | undefined): string[] {
  const supportType = normalize(values?.support_type);
  const capacityOrUrgency = normalize(values?.capacity_or_urgency);
  const location = normalize(values?.location);
  const tags = new Set<string>();

  if (supportType) {
    tags.add(`support:${supportType.replace(/\s+/g, "_")}`);
  }

  if (
    capacityOrUrgency.includes("urgent") ||
    capacityOrUrgency.includes("immediate") ||
    capacityOrUrgency.includes("asap")
  ) {
    tags.add("priority:urgent");
  }

  if (location) {
    tags.add(`location:${location.replace(/\s+/g, "_")}`);
  }

  return Array.from(tags);
}

function validatePayload(payload: SupportPayload): string | null {
  if (!payload || typeof payload !== "object") {
    return "Invalid payload";
  }

  const values = payload.values;
  const fields = payload.fields;

  if (!values || typeof values !== "object") {
    return "Missing form values";
  }

  if (!fields || !Array.isArray(fields) || fields.length === 0) {
    return "Missing form schema";
  }

  for (const field of fields) {
    const rawValue = values[field.name];
    const value = typeof rawValue === "string" ? rawValue.trim() : "";

    if (field.required && !value) {
      return `Missing required field: ${field.label || field.name}`;
    }

    if (field.type === "email" && value && !isValidEmail(value)) {
      return `Invalid email in field: ${field.label || field.name}`;
    }

    if (value.length > 5000) {
      return `Field too long: ${field.label || field.name}`;
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  await loadSubmissionStore();

  const clientIp = getClientIp(request);

  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let payload: SupportPayload;

  try {
    payload = (await request.json()) as SupportPayload;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  if (payload.honeypot && payload.honeypot.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json(
      { success: false, error: validationError },
      { status: 400 }
    );
  }

  const source = parseSourceParams(payload.pageSearch);

  const submission: MatchSubmission = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    ip: clientIp,
    pagePath: payload.pagePath || "",
    pageSearch: payload.pageSearch || "",
    userAgent: payload.userAgent || "",
    values: payload.values,
    fields: payload.fields,
    matchIntent: deriveMatchIntent(payload.values),
    source,
    routingTags: buildRoutingTags(payload.values),
    triageSummary: {
      intent: payload.values?.intent || payload.values?.topic || "",
      supportType: payload.values?.support_type || "",
      location: payload.values?.location || "",
      capacityOrUrgency: payload.values?.capacity_or_urgency || "",
      timeline: payload.values?.timeline || "",
    },
  };

  supportSubmissionStore.unshift(submission);
  if (supportSubmissionStore.length > MAX_STORED_SUBMISSIONS) {
    supportSubmissionStore.length = MAX_STORED_SUBMISSIONS;
  }

  await persistSubmissionStore();

  const webhookUrl = process.env.SUPPORT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      if (!webhookResponse.ok) {
        return NextResponse.json(
          { success: false, error: "Failed to forward support request" },
          { status: 502 }
        );
      }
    } catch {
      return NextResponse.json(
        { success: false, error: "Failed to process support request" },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    success: true,
    message: "Support request submitted successfully.",
    id: submission.id,
  });
}

export async function GET(request: NextRequest) {
  await loadSubmissionStore();

  if (!isAuthorizedForRead(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const intent = request.nextUrl.searchParams.get("intent");
  const limitParam = Number(request.nextUrl.searchParams.get("limit") || "50");
  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(limitParam, 1), 200)
    : 50;

  const filtered = intent
    ? supportSubmissionStore.filter((item) => item.matchIntent === intent)
    : supportSubmissionStore;

  const telemetry = buildTelemetrySummary(filtered);

  return NextResponse.json({
    success: true,
    count: filtered.length,
    items: filtered.slice(0, limit),
    telemetry,
  });
}
