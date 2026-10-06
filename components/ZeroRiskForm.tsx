"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

type Status = "idle" | "sending" | "success" | "error";

export function ZeroRiskForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.zeroRisk;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") || "").trim(),
      contact: String(data.get("contact") || "").trim(),
      companyName: String(data.get("companyName") || "").trim(),
      message: String(data.get("message") || "").trim(),
      locale,
    };

    if (!payload.fullName || !payload.contact || !payload.companyName) {
      setStatus("error");
      setErrorMsg(t.validation);
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/zero-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(t.error);
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center p-10 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" />
          </svg>
        </span>
        <p className="mt-5 text-lg font-bold text-ink">{t.success}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline mt-6"
        >
          OK
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8" noValidate>
      <div className="grid gap-5">
        <div>
          <label htmlFor="fullName" className="field-label">
            {t.fullName} <span className="text-brand">*</span>
          </label>
          <input id="fullName" name="fullName" className="field-input" placeholder={t.fullNamePh} required />
        </div>
        <div>
          <label htmlFor="contact" className="field-label">
            {t.contact} <span className="text-brand">*</span>
          </label>
          <input id="contact" name="contact" className="field-input" placeholder={t.contactPh} required />
        </div>
        <div>
          <label htmlFor="companyName" className="field-label">
            {t.company} <span className="text-brand">*</span>
          </label>
          <input id="companyName" name="companyName" className="field-input" placeholder={t.companyPh} required />
        </div>
        <div>
          <label htmlFor="message" className="field-label">
            {t.message}{" "}
            <span className="text-xs font-normal text-ink-muted">
              ({dict.common.optional})
            </span>
          </label>
          <textarea id="message" name="message" rows={4} className="field-input resize-y" placeholder={t.messagePh} />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {errorMsg}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 w-full">
        {status === "sending" ? dict.common.sending : t.submit}
      </button>
    </form>
  );
}
