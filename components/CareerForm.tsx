"use client";

import { useState, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

type Status = "idle" | "sending" | "success" | "error";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPT = [".pdf", ".doc", ".docx"];

export function CareerForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.careers;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setFileName(f ? f.name : "");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("fullName") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    if (!fullName || !contact) {
      setStatus("error");
      setErrorMsg(t.validation);
      return;
    }

    const file = fileRef.current?.files?.[0];
    if (file) {
      const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
      if (!ACCEPT.includes(ext) || file.size > MAX_SIZE) {
        setStatus("error");
        setErrorMsg(t.cvError);
        return;
      }
    }

    data.set("locale", locale);
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/careers", { method: "POST", body: data });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
      setFileName("");
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
        <button type="button" onClick={() => setStatus("idle")} className="btn-outline mt-6">
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
          <label htmlFor="field" className="field-label">
            {t.field}
          </label>
          <input id="field" name="field" className="field-input" placeholder={t.fieldPh} />
        </div>
        <div>
          <label htmlFor="message" className="field-label">
            {t.message}{" "}
            <span className="text-xs font-normal text-ink-muted">({dict.common.optional})</span>
          </label>
          <textarea id="message" name="message" rows={3} className="field-input resize-y" placeholder={t.messagePh} />
        </div>
        <div>
          <label htmlFor="cv" className="field-label">
            {t.cv}
          </label>
          <label
            htmlFor="cv"
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-ink/25 bg-mist-light/50 px-4 py-4 transition hover:border-brand"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 16V4M7 9l5-5 5 5M5 20h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-ink">
                {fileName || t.cv}
              </span>
              <span className="block text-xs text-ink-muted">{t.cvHint}</span>
            </span>
          </label>
          <input
            ref={fileRef}
            id="cv"
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={onFileChange}
          />
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
