"use client";

import { Puck, usePuck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Data } from "@puckeditor/core";
import { puckConfig } from "@/lib/puck-config";

function resolveSlugFromPath(puckPath?: string[]): string {
  if (!puckPath || puckPath.length === 0) return "homepage";
  return puckPath.join("-");
}

function slugToTitle(slug: string): string {
  if (slug === "homepage") return "Homepage";
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function viewPath(slug: string): string {
  return slug === "homepage" ? "/" : `/${slug}`;
}

let idCounter = 0;
function generateId(type: string): string {
  return `${type}-${Date.now()}-${++idCounter}`;
}

function ensureContentIds(data: Data): Data {
  const content = data.content.map((item) => {
    if (item.props?.id) return item;
    return {
      ...item,
      props: {
        ...item.props,
        id: generateId(item.type),
      },
    };
  });
  return { ...data, content };
}

/* ── Header action buttons injected into the Puck toolbar ── */
function PreviewButton() {
  const { dispatch } = usePuck();
  const [previewing, setPreviewing] = useState(false);

  return (
    <button
      onClick={() => {
        const next = !previewing;
        setPreviewing(next);
        dispatch({
          type: "setUi",
          ui: next
            ? {
                previewMode: "interactive",
                leftSideBarVisible: false,
                rightSideBarVisible: false,
              }
            : {
                previewMode: "edit",
                leftSideBarVisible: true,
                rightSideBarVisible: true,
              },
        });
      }}
      className={`px-3 py-1.5 text-[13px] font-semibold border rounded-md cursor-pointer inline-flex items-center gap-1 ${
        previewing
          ? "border-blue-600 bg-blue-50 text-blue-600"
          : "border-gray-300 bg-white text-gray-700"
      }`}
    >
      {previewing ? "✕ Exit Preview" : "▶ Preview"}
    </button>
  );
}

export default function EditorPage() {
  const params = useParams<{ puckPath?: string[] }>();
  const router = useRouter();
  const slug = resolveSlugFromPath(params.puckPath);
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData(null);
    fetch(`/api/page/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => {
        const pageData = d || {
          root: { props: {} },
          content: [],
        };
        setData(ensureContentIds(pageData));
        setLoading(false);
      });
  }, [slug]);

  const handlePublish = useCallback(
    async (publishData: Data) => {
      await fetch(`/api/page/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(publishData),
      });
      setData(publishData);
    },
    [slug]
  );

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading editor...
      </div>
    );
  }

  return (
    <Puck
      key={slug}
      config={puckConfig}
      data={data}
      onPublish={handlePublish}
      viewports={[
        { width: 375, label: "Mobile", icon: <span>📱</span> },
        { width: 768, label: "Tablet", icon: <span>📋</span> },
        { width: 1280, label: "Desktop", icon: <span>🖥</span> },
      ]}
      overrides={{
        headerActions: ({ children }) => (
          <>
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                router.push("/admin");
              }}
              className="px-3 py-1.5 text-[13px] font-semibold border border-gray-300 rounded-md bg-white text-gray-700 cursor-pointer no-underline inline-flex items-center gap-1"
            >
              ← All Pages
            </a>

            <a
              href={viewPath(slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-[13px] font-semibold border border-gray-300 rounded-md bg-white text-gray-700 cursor-pointer no-underline inline-flex items-center gap-1"
            >
              View Live ↗
            </a>

            <PreviewButton />

            {children}
          </>
        ),

        header: ({ actions }) => (
          <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
            <span className="font-semibold text-sm text-gray-700">
              Editing: {slugToTitle(slug)}
            </span>
            <div className="flex items-center gap-2">
              {actions}
            </div>
          </header>
        ),
      }}
    />
  );
}
