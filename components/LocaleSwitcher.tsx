"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { locales, localeShort, localeNames, type Locale } from "@/lib/i18n";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(loc: Locale) {
    const segments = pathname.split("/");
    segments[1] = loc; // replace locale segment
    router.push(segments.join("/") || `/${loc}`);
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-2 text-sm font-bold text-ink transition hover:border-brand hover:text-brand"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
        {localeShort[current]}
        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>
      {open && (
        <ul
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-ink/10 bg-white py-1 shadow-card"
          role="listbox"
        >
          {locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                onClick={() => switchTo(loc)}
                className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition hover:bg-mist-light ${
                  loc === current ? "font-bold text-brand-600" : "text-ink"
                }`}
                role="option"
                aria-selected={loc === current}
              >
                {localeNames[loc]}
                <span className="text-xs text-ink-muted">{localeShort[loc]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
