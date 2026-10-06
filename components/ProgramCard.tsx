import Link from "next/link";
import { ProgramIcon } from "./ProgramIcon";
import type { Program } from "@/lib/content/programs";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export function ProgramCard({
  program,
  locale,
  dict,
}: {
  program: Program;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Link
      href={`/${locale}/programs/${program.slug}`}
      className="group card relative flex flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-card"
    >
      <span
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-400 transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden
      />
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-white">
        <ProgramIcon name={program.icon} />
      </div>
      <h3 className="text-xl font-extrabold text-ink">{program.name[locale]}</h3>
      <p className="mt-1 text-sm font-semibold text-brand-600">
        {program.tagline[locale]}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
        {program.summary[locale]}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-ink transition group-hover:gap-2.5 group-hover:text-brand-600">
        {dict.common.learnMore}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
    </Link>
  );
}
