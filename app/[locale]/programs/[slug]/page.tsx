import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { programs, getProgram } from "@/lib/content/programs";
import { ProgramIcon } from "@/components/ProgramIcon";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    programs.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const program = getProgram(slug);
  if (!program) return {};
  return {
    title: program.name[locale as Locale],
    description: program.summary[locale as Locale],
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const program = getProgram(slug);
  if (!program) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink/5 bg-ink text-white">
        <div className="absolute inset-0 bg-matrix opacity-[0.12]" aria-hidden />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/20 blur-3xl" aria-hidden />
        <div className="container-px relative py-14 sm:py-20">
          <Link
            href={`/${locale}/programs`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 transition hover:text-brand"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" />
            </svg>
            {dict.programs.title}
          </Link>
          <div className="mt-6 flex items-start gap-5">
            <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand text-white">
              <ProgramIcon name={program.icon} className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl">
                {program.name[locale]}
              </h1>
              <p className="mt-2 text-lg font-semibold text-brand">
                {program.tagline[locale]}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Description */}
          <div>
            <Reveal>
              <h2 className="text-2xl font-extrabold text-ink">
                {dict.programs.detailsTitle}
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-ink-muted">
                {program.description[locale].map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h3 className="mt-10 text-xl font-extrabold text-ink">
                {dict.programs.benefitsTitle}
              </h3>
              <ul className="mt-4 space-y-3">
                {program.benefits[locale].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" />
                      </svg>
                    </span>
                    <span className="text-ink-soft">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Reveal delay={60}>
              <div className="card p-6">
                <h3 className="text-lg font-extrabold text-ink">
                  {dict.programs.eligibilityTitle}
                </h3>
                <ul className="mt-4 space-y-3">
                  {program.eligibility[locale].map((e) => (
                    <li key={e} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span className="text-ink-soft">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="card bg-brand-50/60 p-6">
                <h3 className="text-lg font-extrabold text-ink">
                  {dict.programs.applyTitle}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">
                  {dict.programs.applyText}
                </p>
                <Link
                  href={`/${locale}/zero-risk`}
                  className="btn-primary mt-5 w-full"
                >
                  {dict.nav.apply}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
