"use client";

import React, { useEffect, useState } from "react";

export type ContactFormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required: boolean;
};

export type ContactFormProps = {
  heading: string;
  description: string;
  fields: ContactFormField[];
  submitEndpoint?: string;
  submitLabel: string;
  successMessage: string;
};

export function ContactForm({
  heading,
  description,
  fields,
  submitEndpoint = "/api/support",
  submitLabel,
  successMessage,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const intent = params.get("intent");
    const supportType = params.get("support_type");

    const normalizedIntent = (intent || "").trim().toLowerCase();
    const normalizedSupportType = (supportType || "").trim().toLowerCase();

    const intentMap: Record<string, string> = {
      need_help: "Need Help",
      offer_help: "Offer Help",
      partner_request: "Partner Request",
    };

    const supportTypeMap: Record<string, string> = {
      funds: "Funds",
      skills: "Skills",
      time: "Time",
      essentials: "Essentials",
      other: "Other",
    };

    const prefilledIntent = intent ? intentMap[normalizedIntent] || intent : "";
    const prefilledSupportType = supportType
      ? supportTypeMap[normalizedSupportType] || supportType
      : "";

    if (!prefilledIntent && !prefilledSupportType) return;

    setValues((prev) => {
      const nextValues = { ...prev };

      if (prefilledIntent && (!prev.intent || prev.intent.trim().length === 0)) {
        nextValues.intent = prefilledIntent;
      }

      if (
        prefilledSupportType &&
        (!prev.support_type || prev.support_type.trim().length === 0)
      ) {
        nextValues.support_type = prefilledSupportType;
      }

      return nextValues;
    });
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const missingField = fields.find((field) => {
      if (!field.required) return false;
      const value = values[field.name];
      return !value || value.trim().length === 0;
    });

    if (missingField) {
      setErrorMessage(`${missingField.label} is required.`);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(submitEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values,
          fields,
          honeypot: "",
          pagePath: typeof window !== "undefined" ? window.location.pathname : "",
          pageSearch: typeof window !== "undefined" ? window.location.search : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setErrorMessage(errorBody?.error || "Unable to submit your request right now.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setErrorMessage("Unable to submit your request right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-[var(--foreground)]">
            {heading}
          </h2>
          {description && (
            <p className="text-base leading-relaxed text-[var(--muted-foreground)]">
              {description}
            </p>
          )}
        </div>

        {/* Success state */}
        {submitted ? (
          <div className="rounded-2xl border border-[color:color-mix(in_oklch,var(--primary)_30%,transparent)] bg-[var(--primary-subtle,color-mix(in_oklch,var(--primary)_10%,transparent))] p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-[var(--foreground)]">
              {successMessage}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            noValidate
          >
            {errorMessage ? (
              <div
                className="rounded-xl border border-[color:color-mix(in_oklch,var(--destructive)_35%,transparent)] bg-[color:color-mix(in_oklch,var(--destructive)_10%,transparent)] px-4 py-3 text-sm text-[var(--foreground)]"
                role="alert"
                aria-live="polite"
              >
                {errorMessage}
              </div>
            ) : null}

            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1.5">
                <label htmlFor={field.name} className="text-sm font-medium text-[var(--foreground)]">
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-[var(--primary)]" aria-hidden="true">
                      *
                    </span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    rows={4}
                    value={values[field.name] ?? ""}
                    disabled={submitting}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-all focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_15%,transparent)]"
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    value={values[field.name] ?? ""}
                    disabled={submitting}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-all focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_15%,transparent)]"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={submitting}
              className={`mt-2 w-full rounded-full bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-[var(--primary-foreground,#fff)] transition-all hover:opacity-90 active:scale-[0.98] ${
                submitting ? "cursor-not-allowed opacity-75" : "cursor-pointer opacity-100"
              }`}
            >
              {submitting ? "Submitting..." : submitLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
