import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { getProgram } from "@/lib/content/programs";
import { PageHero } from "@/components/PageHero";
import { ZeroRiskForm } from "@/components/ZeroRiskForm";
import { Reveal } from "@/components/Reveal";

export default async function ZeroRiskPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const program = getProgram("zero-risk");

  return (
    <>
      <PageHero
        kicker={dict.zeroRisk.kicker}
        title={dict.zeroRisk.title}
        intro={dict.zeroRisk.intro}
      />
      <section className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <h2 className="text-2xl font-extrabold text-ink">
                {dict.programs.benefitsTitle}
              </h2>
              <ul className="mt-5 space-y-3">
                {program?.benefits[locale].map((b) => (
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

              <h3 className="mt-8 text-lg font-extrabold text-ink">
                {dict.programs.eligibilityTitle}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {program?.eligibility[locale].map((e) => (
                  <li key={e} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span className="text-ink-soft">{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ZeroRiskForm locale={locale} dict={dict} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
