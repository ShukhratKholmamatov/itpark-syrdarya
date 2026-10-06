import Link from "next/link";
import Image from "next/image";
import { Logo } from "./Logo";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  const quick = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/programs`, label: dict.nav.programs },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/team`, label: dict.nav.team },
    { href: `/${locale}/gallery`, label: dict.nav.gallery },
    { href: `/${locale}/careers`, label: dict.nav.careers },
    { href: `/${locale}/zero-risk`, label: dict.nav.apply },
  ];

  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="container-px grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo locale={locale} variant="dark" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            {dict.footer.about}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-brand">
            {dict.footer.quickLinks}
          </h4>
          <ul className="space-y-2.5 text-sm text-white/75">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-brand">
            {dict.footer.contactTitle}
          </h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-brand">
                <path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              {dict.footer.address}
            </li>
            <li className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-brand">
                <path d="M4 6l8 6 8-6M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              <a href="mailto:info@itpark-sirdaryo.uz" className="hover:text-brand">
                info@itpark-sirdaryo.uz
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-brand">
            {dict.footer.followUs}
          </h4>
          <div className="flex gap-3">
            {[
              { label: "Telegram", href: "https://t.me/itpark_uz" },
              { label: "Instagram", href: "https://instagram.com/itpark_uzbekistan" },
              { label: "YouTube", href: "https://youtube.com/@itparkuzbekistan" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-full border border-white/15 px-4 text-xs font-bold text-white/80 transition hover:border-brand hover:text-brand"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <Image
              src="/brand/logo-itpark-uz.png"
              alt="IT Park Uzbekistan"
              width={2477}
              height={817}
              className="h-7 w-auto brightness-0 invert"
            />
          </div>
          <p className="mt-3 text-xs text-white/50">{dict.footer.madeWith}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} IT Park Sirdaryo. {dict.footer.rights}
          </p>
          <Link href="/admin" className="transition hover:text-brand">
            {dict.nav.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
