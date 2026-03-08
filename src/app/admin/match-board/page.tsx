"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type MatchIntent = "need_help" | "offer_help" | "partner_request" | "general";

type MatchSubmission = {
  id: string;
  receivedAt: string;
  matchIntent: MatchIntent;
  routingTags: string[];
  triageSummary: {
    intent: string;
    supportType: string;
    location: string;
    capacityOrUrgency: string;
    timeline: string;
  };
  values?: Record<string, string>;
};

type ApiResponse = {
  success: boolean;
  count?: number;
  items?: MatchSubmission[];
  telemetry?: {
    totalSubmissions: number;
    deepLinkedSubmissions: number;
    deepLinkRate: number;
    intentParamBreakdown: Array<{ key: string; count: number }>;
    supportTypeParamBreakdown: Array<{ key: string; count: number }>;
  };
  error?: string;
};

const laneOptions: Array<{ label: string; value: "all" | MatchIntent }> = [
  { label: "All", value: "all" },
  { label: "Need Help", value: "need_help" },
  { label: "Offer Help", value: "offer_help" },
  { label: "Partner Request", value: "partner_request" },
  { label: "General", value: "general" },
];

function badgeColor(intent: MatchIntent) {
  switch (intent) {
    case "need_help":
      return "bg-red-100 text-red-700 border-red-300";
    case "offer_help":
      return "bg-green-100 text-green-700 border-green-300";
    case "partner_request":
      return "bg-blue-100 text-blue-700 border-blue-300";
    default:
      return "bg-gray-100 text-gray-600 border-gray-300";
  }
}

export default function MatchBoardPage() {
  const [items, setItems] = useState<MatchSubmission[]>([]);
  const [telemetry, setTelemetry] = useState<ApiResponse["telemetry"]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lane, setLane] = useState<"all" | MatchIntent>("all");
  const [token, setToken] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setError("");

    const query = new URLSearchParams();
    query.set("limit", "100");
    if (lane !== "all") query.set("intent", lane);
    if (token.trim()) query.set("token", token.trim());

    try {
      const response = await fetch(`/api/support?${query.toString()}`);
      const data = (await response.json()) as ApiResponse;

      if (!response.ok || !data.success) {
        setItems([]);
        setTelemetry(undefined);
        setError(data.error || "Could not load match board data.");
        setLoading(false);
        return;
      }

      setItems(data.items || []);
      setTelemetry(data.telemetry);
    } catch {
      setError("Could not load match board data.");
      setItems([]);
      setTelemetry(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lane]);

  const urgentCount = useMemo(
    () => items.filter((item) => item.routingTags.includes("priority:urgent")).length,
    [items]
  );

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-9 font-sans">
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="m-0 text-[28px] font-bold">Match Board</h1>
        <Link href="/admin" className="font-semibold text-[#2563eb] no-underline">
          ← Back to Admin
        </Link>
      </div>

      <p className="mb-5 text-[#4b5563]">
        Lightweight coordinator view for connecting people/charities needing help with donors and volunteers offering help.
      </p>

      <div className="mb-[18px] grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        <div className="rounded-[10px] border border-[#e5e7eb] bg-white p-3">
          <div className="text-xs text-[#6b7280]">Visible Requests</div>
          <div className="text-2xl font-bold">{items.length}</div>
        </div>
        <div className="rounded-[10px] border border-[#e5e7eb] bg-white p-3">
          <div className="text-xs text-[#6b7280]">Urgent Tagged</div>
          <div className="text-2xl font-bold">{urgentCount}</div>
        </div>
        <div className="rounded-[10px] border border-[#e5e7eb] bg-white p-3">
          <div className="text-xs text-[#6b7280]">Deep-Linked Submissions</div>
          <div className="text-2xl font-bold">{telemetry?.deepLinkedSubmissions ?? 0}</div>
        </div>
        <div className="rounded-[10px] border border-[#e5e7eb] bg-white p-3">
          <div className="text-xs text-[#6b7280]">Deep-Link Rate</div>
          <div className="text-2xl font-bold">{telemetry?.deepLinkRate ?? 0}%</div>
        </div>
      </div>

      {telemetry ? (
        <div className="mb-[18px] grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          <div className="rounded-[10px] border border-[#e5e7eb] bg-white p-3">
            <div className="mb-2 text-[13px] font-bold text-[#111827]">Intent Param Breakdown</div>
            <div className="grid gap-1.5">
              {telemetry.intentParamBreakdown.slice(0, 5).map((entry) => (
                <div key={`intent-${entry.key}`} className="flex justify-between text-xs text-[#374151]">
                  <span>{entry.key}</span>
                  <strong>{entry.count}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[10px] border border-[#e5e7eb] bg-white p-3">
            <div className="mb-2 text-[13px] font-bold text-[#111827]">Support Type Param Breakdown</div>
            <div className="grid gap-1.5">
              {telemetry.supportTypeParamBreakdown.slice(0, 5).map((entry) => (
                <div key={`support-type-${entry.key}`} className="flex justify-between text-xs text-[#374151]">
                  <span>{entry.key}</span>
                  <strong>{entry.count}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mb-4 flex flex-wrap items-center gap-2.5 rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
        <label htmlFor="lane-filter" className="text-[13px] font-semibold text-[#374151]">
          Lane
        </label>
        <select
          id="lane-filter"
          value={lane}
          onChange={(event) => setLane(event.target.value as "all" | MatchIntent)}
          className="rounded-lg border border-[#d1d5db] px-2.5 py-1.5 text-[13px]"
        >
          {laneOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <input
          type="password"
          placeholder="Admin token (if configured)"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          className="min-w-[260px] rounded-lg border border-[#d1d5db] px-2.5 py-1.5 text-[13px]"
        />

        <button
          type="button"
          onClick={fetchItems}
          className="cursor-pointer rounded-lg bg-[#2563eb] px-3.5 py-[7px] text-[13px] font-semibold text-white"
        >
          Refresh
        </button>
      </div>

      {error ? (
        <div
          role="alert"
          className="mb-3.5 rounded-[10px] border border-[#fecaca] bg-[#fef2f2] p-3 text-[#991b1b]"
        >
          {error}
        </div>
      ) : null}

      {loading ? (
        <p className="text-[#6b7280]">Loading match requests...</p>
      ) : items.length === 0 ? (
        <p className="text-[#6b7280]">No requests found for this lane yet.</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-[#e5e7eb] bg-white p-3.5"
            >
              <div className="flex flex-wrap justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase ${badgeColor(item.matchIntent)}`}
                  >
                    {item.matchIntent}
                  </span>
                  {item.routingTags.map((tag) => (
                    <span
                      key={`${item.id}-${tag}`}
                      className="rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-2 py-0.5 text-[11px] text-[#374151]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-[#6b7280]">
                  {new Date(item.receivedAt).toLocaleString()}
                </div>
              </div>

              <div className="mt-2.5 grid gap-1.5">
                <div className="text-[13px]">
                  <strong>Name:</strong> {item.values?.full_name || "—"}
                </div>
                <div className="text-[13px]">
                  <strong>Email:</strong> {item.values?.email || "—"}
                </div>
                <div className="text-[13px]">
                  <strong>Intent:</strong> {item.triageSummary.intent || "—"}
                </div>
                <div className="text-[13px]">
                  <strong>Support Type:</strong> {item.triageSummary.supportType || "—"}
                </div>
                <div className="text-[13px]">
                  <strong>Location:</strong> {item.triageSummary.location || "—"}
                </div>
                <div className="text-[13px]">
                  <strong>Capacity/Urgency:</strong> {item.triageSummary.capacityOrUrgency || "—"}
                </div>
                <div className="text-[13px]">
                  <strong>Timeline:</strong> {item.triageSummary.timeline || "—"}
                </div>
                <div className="mt-1 whitespace-pre-wrap text-[13px]">
                  <strong>Details:</strong> {item.values?.message || "—"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
