"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const nav = [
    { href: `/${locale}`, label: dict.nav.home, exact: true },
    { href: `/${locale}/programs`, label: dict.nav.programs },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/team`, label: dict.nav.team },
    { href: `/${locale}/gallery`, label: dict.nav.gallery },
    { href: `/${locale}/careers`, label: dict.nav.careers },
  ];

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled
          ? "border-b border-ink/5 bg-white/90 backdrop-blur-md"
          : "bg-white"
      }`}
    >
      <div className="container-px flex h-[72px] items-center justify-between gap-4">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                isActive(item.href, item.exact)
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink hover:bg-mist-light"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher current={locale} />
          <Link
            href={`/${locale}/zero-risk`}
            className="btn-primary hidden md:inline-flex"
          >
            {dict.nav.apply}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-mist-light lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? dict.common.close : dict.common.menu}
            aria-expanded={open}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink/5 bg-white lg:hidden">
          <nav className="container-px flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-base font-semibold transition ${
                  isActive(item.href, item.exact)
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink hover:bg-mist-light"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/zero-risk`}
              className="btn-primary mt-3 w-full"
            >
              {dict.nav.apply}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
